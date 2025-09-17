import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import CollegePredictorPage from './pages/CollegePredictorPage';
import CollegesPage from './pages/CollegesPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
 
 

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/predictor" element={<CollegePredictorPage />} />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route path="/colleges/:collegeName" element={<CollegeDetailPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;