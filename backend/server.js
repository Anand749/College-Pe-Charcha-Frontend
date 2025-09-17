const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collegepecharcha', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Auth and payments removed

// Resource Schema
const resourceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  fileUrl: { type: String },
  downloads: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  previewImage: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

const Resource = mongoose.model('Resource', resourceSchema);

// Auth middleware removed

// Routes

// Auth routes removed

// Get all resources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Payment routes removed

// Get user's download statistics
app.get('/api/user/stats', authenticateToken, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.userId });
    
    const stats = {
      totalDownloads: payments.filter(p => p.status === 'completed').length,
      premiumDownloads: payments.filter(p => p.status === 'completed' && p.amount > 0).length,
      totalSpent: payments.reduce((sum, p) => sum + (p.status === 'completed' ? p.amount : 0), 0),
      recentDownloads: payments
        .filter(p => p.status === 'completed')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Access/download gates removed; fallback to public file URLs on frontend

// Initialize resources in database
app.post('/api/resources/initialize', async (req, res) => {
  try {
    const resources = [
      {
        id: '1',
        title: 'College Preference List for CAP Rounds',
        description: 'Expertly curated preference list for CAP rounds including top colleges from Mumbai, Pune, and Sangli. Built from seniors\' real experiences, placement insights, and college reviews to help students make the best choice.',
        category: 'Admission Guidance',
        isPremium: true,
        price: 199,
        downloads: 0,
        rating: 4.9,
        previewImage: '/assets/general/list.png',
        lastUpdated: new Date('2025-08-10'),
        fileUrl: '/files/clist.pdf',
      },
      {
        id: '2',
        title: 'Top 20 Engineering Colleges in Maharashtra',
        description: 'Comprehensive list and analysis of the top 20 engineering colleges in Maharashtra, covering rankings, placements, infrastructure, and student reviews.',
        category: 'College Rankings',
        isPremium: false,
        price: 0,
        downloads: 0,
        rating: 4.8,
        previewImage: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
        lastUpdated: new Date('2025-07-15'),
        fileUrl: '/files/top20.pdf',
      },
    ];

    for (const resourceData of resources) {
      await Resource.findOneAndUpdate(
        { id: resourceData.id },
        resourceData,
        { upsert: true }
      );
    }

    res.json({ message: 'Resources initialized successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
