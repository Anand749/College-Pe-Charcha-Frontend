import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, MessageCircle, CheckCircle, XCircle, GraduationCap, X, BookOpen } from 'lucide-react';
import { getCollegeByName } from '../services/college.service';
import { College } from '../data/colleges';
import { CollegeDetailSkeleton } from '../components/SkeletonLoaders';
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">About {college.name}</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{college.description}</p>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Key Highlights</h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {college.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start text-gray-700">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {college.pros.map((pro, index) => (
                    <li key={index} className="text-sm sm:text-base text-gray-700 flex items-start">
                      <span className="text-green-600 mr-2 flex-shrink-0">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {college.cons.map((con, index) => (
                    <li key={index} className="text-sm sm:text-base text-gray-700 flex items-start">
                      <span className="text-red-600 mr-2 flex-shrink-0">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mentors Preview Section - Mobile Optimized */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-orange-600" />
                    Connect With Our Team
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">Get guidance from college heads and mentors</p>
                </div>
                <div className="bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md whitespace-nowrap">
                  {college.mentors.length} Available
                </div>
              </div>

              {college.mentors.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                            className={`rounded-xl p-3 sm:p-4 md:p-5 border-2 transition-all duration-300 hover:shadow-lg active:scale-95 ${isCollegeHead ? 'bg-orange-50 border-orange-400' : 'bg-white border-gray-200'
                              }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="relative mb-2 sm:mb-3">
                                <img src={mentor.photo} alt={mentor.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-gray-200" />
                                <div className={`absolute -bottom-1 -right-1 rounded-full p-1 sm:p-1.5 ${isCollegeHead ? 'bg-orange-600' : 'bg-blue-600'} text-white`}>
                                  {isCollegeHead ? <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" /> : <Users className="h-2 w-2 sm:h-3 sm:w-3" />}
                                </div>
                              </div>
                              <div className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-1 sm:mb-2 ${isCollegeHead ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                {isCollegeHead ? 'College Head' : 'Mentor'}
                              </div>
                              <p className="text-gray-700 text-xs sm:text-sm font-medium flex items-center justify-center w-full">
                                <BookOpen className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" /> <span className="truncate">{mentor.branch}</span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {college.mentors.length > 4 && (
                    <div className="text-center pt-2 sm:pt-3">
                      <button onClick={() => setShowAllMentors(true)} className="touch-target bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-orange-700 active:scale-95 transition-all">
                        View All {college.mentors.length} Mentors
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-700 font-semibold">No mentors available yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Talk With Seniors</h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-orange-100">Connect with current students for authentic insights.</p>
              <a href={college.whatsappLink} target="_blank" rel="noopener noreferrer" className="touch-target bg-white text-orange-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center w-full hover:bg-orange-50 active:scale-95 transition-all">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Join WhatsApp Group
              </a>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Location</span><span className="font-medium">{college.location}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Established</span><span className="font-medium">{college.established}</span></div>
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