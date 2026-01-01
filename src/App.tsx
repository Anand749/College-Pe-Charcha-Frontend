import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CollegePredictorPage from './pages/CollegePredictorPage';
import CollegeComparison from './pages/CollegeComparison';
import NotificationBar from './components/NotificationBar';
import CollegesPage from './pages/CollegesPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CoreApplicationPage from './pages/CoreApplicationPage';
 
 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <Navbar />
          {/* NotificationBar now floats just below navbar */}
          <div className="relative z-40">
            <NotificationBar />
          </div>
          <main>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/predictor" element={<CollegePredictorPage />} />
            <Route path="/compare" element={<CollegeComparison />} />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route path="/colleges/:collegeName" element={<CollegeDetailPage />} />  //dynamic routing for college details
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route 
              path="/apply-core" 
              element={
                <ProtectedRoute>
                  <CoreApplicationPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
          <Footer />
        </div>
        <Analytics />
      </Router>
    </AuthProvider>
  );
}

export default App;