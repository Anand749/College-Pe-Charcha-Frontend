import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationBar from './components/NotificationBar';

// Lazy load all page components for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const CollegePredictorPage = lazy(() => import('./pages/CollegePredictorPage'));
const CollegeComparison = lazy(() => import('./pages/CollegeComparison'));
const CollegesPage = lazy(() => import('./pages/CollegesPage'));
const CollegeDetailPage = lazy(() => import('./pages/CollegeDetailPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CoreApplicationPage = lazy(() => import('./pages/CoreApplicationPage'));


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
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/predictor" element={<CollegePredictorPage />} />
                <Route path="/compare" element={<CollegeComparison />} />
                <Route path="/colleges" element={<CollegesPage />} />
                <Route path="/colleges/:collegeName" element={<CollegeDetailPage />} />  {/* dynamic routing for college details */}
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
            </Suspense>
          </main>
          <Footer />
        </div>
        <Analytics />
      </Router>
    </AuthProvider>
  );
}

export default App;