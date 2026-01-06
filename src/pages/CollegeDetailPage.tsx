import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, MessageCircle, CheckCircle, XCircle, GraduationCap, X, BookOpen, Award } from 'lucide-react';
import { getCollegeByName } from '../services/college.service';
import { College } from '../data/colleges';
import { CollegeDetailSkeleton } from '../components/SkeletonLoaders.tsx';
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

  if (loading) return <CollegeDetailSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <ErrorDisplay message={error} />
      </div>
    );
  }

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
      {/* Hero Section - Mobile Optimized */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src={college.image}
          alt={college.fullName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">{college.fullName}</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm sm:text-base md:text-lg">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span>{college.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span>Est. {college.established}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* About Section - Professional Clean Design */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 sm:p-8 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">About {college.name}</h2>
              <p className="text-base text-gray-700 leading-relaxed mb-6">{college.description}</p>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                <div className="grid grid-cols-2 gap-3">
                  {college.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pros and Cons - Side by Side Professional Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pros Card */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  Pros
                </h3>
                <ul className="space-y-3">
                  {college.pros.map((pro, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-green-600 mr-2 flex-shrink-0 font-bold">✓</span>
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons Card */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  Cons
                </h3>
                <ul className="space-y-3">
                  {college.cons.map((con, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-red-600 mr-2 flex-shrink-0 font-bold">✕</span>
                      <span className="text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mentors Section - Professional */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 sm:p-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Users className="h-6 w-6 text-orange-600 mr-2" />
                    Connect With Our Team
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">Get guidance from college heads and mentors</p>
                </div>
                <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  {college.mentors.length} Available
                </div>
              </div>

              {college.mentors.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...college.mentors]
                      .sort((a, b) => {
                        const aIsHead = a.btranch === 'collegeHead';
                        const bIsHead = b.btranch === 'collegeHead';
                        return aIsHead === bIsHead ? 0 : aIsHead ? -1 : 1;
                      })
                      .slice(0, 4)
                      .map((mentor) => {
                        const isCollegeHead = mentor.btranch === 'collegeHead';
                        return (
                          <div
                            key={mentor.id}
                            className={`rounded-xl p-4 border-2 transition-all hover:shadow-md ${isCollegeHead
                              ? 'bg-orange-50 border-orange-300'
                              : 'bg-blue-50 border-blue-300'
                              }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="relative mb-3">
                                <img
                                  src={mentor.photo}
                                  alt={mentor.name}
                                  className="w-20 h-20 rounded-full object-cover ring-2 ring-white shadow-md"
                                />
                                <div className={`absolute -bottom-1 -right-1 rounded-full p-1.5 shadow-md ${isCollegeHead ? 'bg-orange-600' : 'bg-blue-600'
                                  } text-white`}>
                                  {isCollegeHead ? <GraduationCap className="h-3 w-3" /> : <Users className="h-2.5 w-2.5" />}
                                </div>
                              </div>
                              <div className={`px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${isCollegeHead ? 'bg-orange-600 text-white' : 'bg-blue-600 text-white'
                                }`}>
                                {isCollegeHead ? 'College Head' : 'Mentor'}
                              </div>
                              <p className="text-gray-800 text-xs font-medium flex items-center justify-center w-full">
                                <BookOpen className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{mentor.branch}</span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {college.mentors.length > 4 && (
                    <div className="text-center">
                      <button
                        onClick={() => setShowAllMentors(true)}
                        className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-sm"
                      >
                        View All {college.mentors.length} Mentors
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">No mentors available yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Professional */}
          <div className="space-y-6">
            {/* WhatsApp Card */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Talk With Seniors
              </h3>
              <p className="mb-5 text-orange-100 text-sm">
                Connect with current students for authentic insights.
              </p>
              <a
                href={college.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-600 px-5 py-2.5 rounded-lg font-semibold flex items-center justify-center hover:bg-orange-50 transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Join WhatsApp Group
              </a>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900">
                <Award className="h-5 w-5 text-orange-600 mr-2" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                    Location
                  </span>
                  <span className="font-semibold text-gray-900">{college.location}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                    Established
                  </span>
                  <span className="font-semibold text-gray-900">{college.established}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      {showAllMentors && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 sm:p-4" onClick={() => setShowAllMentors(false)}>
          <div className="bg-white mobile-full-screen rounded-none sm:rounded-2xl shadow-2xl max-w-5xl w-full h-full sm:h-auto sm:max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between safe-area-top">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">All Mentors - {college.name}</h2>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">{college.mentors.length} mentors available</p>
              </div>
              <button onClick={() => setShowAllMentors(false)} className="touch-target text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 active:scale-95 ml-2 flex-shrink-0">
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto safe-area-bottom">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[...college.mentors]
                  .sort((a, b) => {
                    const aIsHead = a.btranch === 'collegeHead';
                    const bIsHead = b.btranch === 'collegeHead';
                    return aIsHead === bIsHead ? 0 : aIsHead ? -1 : 1;
                  })
                  .map((m) => {
                    const isHead = m.btranch === 'collegeHead';
                    return (
                      <div key={m.id} className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 flex items-center space-x-3 sm:space-x-4 active:bg-gray-100 transition-colors">
                        <img src={m.photo} alt={m.name} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 ${isHead ? 'ring-2 ring-orange-400' : ''}`} />
                        <div className="min-w-0 flex-1">
                          <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wide ${isHead ? 'text-orange-600' : 'text-blue-600'}`}>
                            {isHead ? 'College Head' : 'Mentor'}
                          </p>
                          <h3 className="font-semibold text-gray-900 truncate text-xs sm:text-sm mt-0.5">{m.branch}</h3>
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