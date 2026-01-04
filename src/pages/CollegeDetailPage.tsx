import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, MessageCircle, CheckCircle, XCircle, GraduationCap, X, BookOpen } from 'lucide-react';
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

  if (loading) return <LoadingSpinner message="Loading college details..." />;

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
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {college.name}</h2>
              <p className="text-gray-600 mb-6">{college.description}</p>
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

            {/* Mentors Preview Section */}
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
                            className={`rounded-xl p-5 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isCollegeHead ? 'bg-orange-50 border-orange-400' : 'bg-white border-gray-200'
                              }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="relative mb-3">
                                <img src={mentor.photo} alt={mentor.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-200" />
                                <div className={`absolute -bottom-1 -right-1 rounded-full p-1.5 ${isCollegeHead ? 'bg-orange-600' : 'bg-blue-600'} text-white`}>
                                  {isCollegeHead ? <GraduationCap className="h-4 w-4" /> : <Users className="h-3 w-3" />}
                                </div>
                              </div>
                              <div className={`px-2.5 py-1 rounded-full text-xs font-semibold mb-2 ${isCollegeHead ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                {isCollegeHead ? 'College Head' : 'Mentor'}
                              </div>
                              <p className="text-gray-700 text-sm font-medium flex items-center justify-center">
                                <BookOpen className="h-3 w-3 mr-1 flex-shrink-0" /> <span className="truncate">{mentor.branch}</span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {college.mentors.length > 4 && (
                    <div className="text-center pt-2">
                      <button onClick={() => setShowAllMentors(true)} className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition-all">
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
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">Talk With Seniors</h3>
              <p className="mb-6 text-orange-100">Connect with current students for authentic insights.</p>
              <a href={college.whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center w-full">
                <MessageCircle className="h-5 w-5 mr-2" /> Join WhatsApp Group
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowAllMentors(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Mentors - {college.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{college.mentors.length} mentors available</p>
              </div>
              <button onClick={() => setShowAllMentors(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...college.mentors]
                  .sort((a, b) => {
                    const aIsHead = a.btranch === 'collegeHead';
                    const bIsHead = b.btranch === 'collegeHead';
                    return aIsHead === bIsHead ? 0 : aIsHead ? -1 : 1;
                  })
                  .map((m) => {
                    const isHead = m.btranch === 'collegeHead';
                    return (
                      <div key={m.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center space-x-4">
                        <img src={m.photo} alt={m.name} className={`w-14 h-14 rounded-xl object-cover ${isHead ? 'ring-2 ring-orange-400' : ''}`} />
                        <div className="min-w-0">
                          <p className={`text-xs font-bold ${isHead ? 'text-orange-600' : 'text-blue-600'}`}>
                            {isHead ? 'College Head' : 'Mentor'}
                          </p>
                          <h3 className="font-semibold text-gray-900 truncate text-sm">{m.branch}</h3>
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