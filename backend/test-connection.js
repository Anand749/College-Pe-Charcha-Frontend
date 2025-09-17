// Simple test to check MongoDB connection
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ name: 'Connection Test' });
    await testDoc.save();
    console.log('✅ Test document saved successfully!');
    
    // Clean up
    await TestModel.deleteOne({ name: 'Connection Test' });
    console.log('✅ Test document cleaned up!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
