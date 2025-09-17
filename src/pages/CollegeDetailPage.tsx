import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, MessageCircle, Linkedin, Instagram, CheckCircle, XCircle } from 'lucide-react';
import { getCollegeByName } from '../data/colleges';

const CollegeDetailPage = () => {
  const { collegeName } = useParams();
  const college = collegeName ? getCollegeByName(collegeName) : null;

  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">College Not Found</h1>
          <Link to="/colleges" className="text-orange-600 hover:underline">
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={college.image}
          alt={college.fullName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.fullName}</h1>
            <div className="flex items-center justify-center space-x-6 text-lg">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{college.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Est. {college.established}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {college.name}</h2>
              <p className="text-gray-600 mb-6">{college.description}</p>
              
              {/* Highlights */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {college.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {college.pros.map((pro, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {college.cons.map((con, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mentors Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Our Mentors</h2>
              
              {college.mentors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {college.mentors.map((mentor) => (
                    <div key={mentor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <img
                          src={mentor.photo}
                          alt={mentor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                          <p className="text-orange-600">{mentor.branch}</p>
                          <p className="text-gray-600 text-sm">{mentor.year}</p>
                        </div>
                      </div>
                      
                      {(mentor.linkedin || mentor.instagram) && (
                        <div className="flex space-x-3 mt-4">
                          {mentor.linkedin && (
                            <a
                              href={mentor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Linkedin className="h-5 w-5" />
                            </a>
                          )}
                          {mentor.instagram && (
                            <a
                              href={mentor.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 hover:text-pink-700"
                            >
                              <Instagram className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Mentors details for this college will be updated soon.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">Talk With Seniors</h3>
              <p className="mb-6 text-orange-100">
                Connect with current students and get authentic insights about college life, placements, and more.
              </p>
              <a
                href={college.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 flex items-center justify-center w-full"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Join WhatsApp Group
              </a>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Established</span>
                  <span className="font-medium">{college.established}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{college.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Mentors</span>
                  <span className="font-medium">{college.mentors.length}</span>
                </div>
              </div>
            </div>

            {/* Related Colleges */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Colleges</h3>
              <div className="space-y-3">
                <Link to="/colleges/pict" className="block text-orange-600 hover:underline">
                  PICT Pune
                </Link>
                <Link to="/colleges/coep" className="block text-orange-600 hover:underline">
                  COEP Pune
                </Link>
                <Link to="/colleges/vjti" className="block text-orange-600 hover:underline">
                  VJTI Mumbai
                </Link>
                <Link to="/colleges" className="block text-gray-600 hover:text-orange-600">
                  View All Colleges →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailPage;