import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, MessageCircle, CheckCircle, XCircle, GraduationCap, X, BookOpen } from 'lucide-react';
import { MapPin, Calendar, Users, MessageCircle, Linkedin, Instagram, CheckCircle, XCircle, GraduationCap, X } from 'lucide-react';
import { getCollegeByName } from '../services/college.service';
import { College } from '../data/colleges';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
const CollegeDetailPage = () => {
  const { collegeName } = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllMentors, setShowAllMentors] = useState(false);
  useEffect(() => {
    const fetchCollege = async () => {
      if (!collegeName) {
        setError('College name not provided');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getCollegeByName(collegeName);
        setCollege(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch college details');
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [collegeName]);
  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading college details..." />;
  }
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <ErrorDisplay message={error} />
      </div>
    );
  }
  // Not found state
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
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Users className="h-6 w-6 mr-3 text-orange-600" />
                    Connect With Our Team
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">Get guidance from college heads and mentors</p>
                </div>
                <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  {college.mentors.length} Available
                </div>
              </div>
              {college.mentors.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {college.mentors
                      .sort((a, b) => {
                        // Sort college heads first
                        const aIsHead = a.branch === 'College Head' || a.branch.includes('College Head');
                        const bIsHead = b.branch === 'College Head' || b.branch.includes('College Head');
                        if (aIsHead && !bIsHead) return -1;
                        if (!aIsHead && bIsHead) return 1;
                        return 0;
                      })
                      .slice(0, 4)
                      .map((mentor) => {
                        const isCollegeHead = mentor.branch === 'College Head' || mentor.branch.includes('College Head');
                        const showBranch = mentor.branch && mentor.branch !== 'Mentor' && mentor.branch !== 'College Head';
                        return (
                          <div
                            key={mentor.id}
                            className={`rounded-xl p-5 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isCollegeHead
                              ? 'bg-gradient-to-br from-orange-50 to-white border-orange-400 hover:border-orange-500 shadow-md'
                              : 'bg-white border-gray-200 hover:border-orange-300'
                              }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              {/* Profile Photo with Role Badge */}
                              <div className="relative mb-3">
                                <img
                                  src={mentor.photo}
                                  alt={mentor.name}
                                  className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-200"
                                />
                                <div className={`absolute -bottom-1 -right-1 rounded-full p-1.5 ${isCollegeHead ? 'bg-orange-600' : 'bg-blue-600'
                                  } text-white shadow-md`}>
                                  {isCollegeHead ? (
                                    <GraduationCap className="h-4 w-4" />
                                  ) : (
                                    <Users className="h-3 w-3" />
                                  )}
                                </div>
                              </div>
                              {/* Name */}
                              <h3 className="font-bold text-gray-900 text-base mb-1">{mentor.name}</h3>
                              {/* Role Badge */}
                              <div className={`px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${isCollegeHead
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                                }`}>
                                {isCollegeHead ? 'College Head' : 'Mentor'}
                              </div>
                              {/* Department/Branch */}
                              {mentor.btranch && (
                                <p className="text-gray-600 text-xs flex items-center justify-center whitespace-nowrap">
                                  <BookOpen className="h-3 w-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{mentor.btranch}</span>
                                </p>
                              )}
                              {/* Branch/Department */}
                              {showBranch && (
                                <p className="text-gray-600 text-xs mb-2 flex items-center justify-center">
                                  <GraduationCap className="h-3 w-3 mr-1" />
                                  {mentor.branch}
                                </p>
                              )}
                              {/* Academic Year */}
                              <p className="text-gray-500 text-xs mb-3 flex items-center justify-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {mentor.year}
                              </p>
                              {/* Connect Button */}
                              {mentor.linkedin && (
                                <a
                                  href={mentor.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg transition-all w-full font-medium text-xs text-white bg-orange-600 hover:bg-orange-700 shadow-sm"
                                >
                                  <Linkedin className="h-3.5 w-3.5" />
                                  <span>Connect on LinkedIn</span>
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {/* Show All Mentors Button */}
                  {college.mentors.length > 4 && (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setShowAllMentors(true)}
                        className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <span>View All {college.mentors.length} Mentors</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-700 font-semibold text-base mb-1">No mentors available yet</p>
                  <p className="text-gray-500 text-sm">College heads and mentors will be added soon. Check back later!</p>
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
      {/* All Mentors Modal */}
      {showAllMentors && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowAllMentors(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Mentors - {college.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{college.mentors.length} mentors available</p>
              </div>
              <button
                onClick={() => setShowAllMentors(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {college.mentors
                  .sort((a, b) => {
                    // Sort college heads first
                    const aIsHead = a.branch === 'College Head' || a.branch.includes('College Head');
                    const bIsHead = b.branch === 'College Head' || b.branch.includes('College Head');
                    if (aIsHead && !bIsHead) return -1;
                    if (!aIsHead && bIsHead) return 1;
                    return 0;
                  })
                  .map((mentor) => {
                    const isCollegeHead = mentor.branch === 'College Head' || mentor.branch.includes('College Head');
                    const showBranch = mentor.branch && mentor.branch !== 'Mentor' && mentor.branch !== 'College Head';
                    return (
                      <div
                        key={mentor.id}
                        className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer border border-gray-200"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={mentor.photo}
                            alt={mentor.name}
                            className={`w-14 h-14 rounded-xl object-cover flex-shrink-0 ${isCollegeHead ? 'ring-2 ring-orange-400' : ''}`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium ${isCollegeHead ? 'text-orange-600' : 'text-blue-600'}`}>
                              {isCollegeHead ? 'College Head' : 'Mentor'}
                            </p>
                            {mentor.btranch && (
                              <p className="text-xs text-gray-500">{mentor.btranch}</p>
                            )}
                          </div>
                            <h3 className="font-semibold text-gray-900 text-sm truncate">{mentor.name}</h3>
                            <p className={`text-xs font-medium ${isCollegeHead ? 'text-orange-600' : 'text-blue-600'}`}>
                              {isCollegeHead ? 'College Head' : 'Mentor'}
                            </p>
                            {showBranch && (
                              <p className="text-xs text-gray-500 truncate">{mentor.branch}</p>
                            )}
                            <p className="text-xs text-gray-400">{mentor.year}</p>
                          </div>
                          {mentor.linkedin && (
                            <a
                              href={mentor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 p-2 rounded-lg bg-white hover:bg-blue-50 transition-colors border border-gray-200"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Linkedin className="h-4 w-4 text-blue-600" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CollegeDetailPage;
