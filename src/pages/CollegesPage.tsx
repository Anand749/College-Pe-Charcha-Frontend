import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Search, Filter, Building, GraduationCap, Sparkles, TrendingUp, Grid, List, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useColleges } from '../hooks/useColleges';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const CollegesPage: React.FC = () => {
  // Fetch colleges from API
  const { colleges, loading, error, refresh } = useColleges();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'established' | 'popularity'>('popularity');
  const [showAllColleges, setShowAllColleges] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // --- NEW: Define the custom sort order based on your list ---
  // Note: "Comments" was interpreted as "KJSCE". You can adjust this list as needed.
  const customSortOrder = [
    'COEP', 'VJTI', 'PICT', 'SPIT', 'KJSCE', 'DJ Sanghvi',
    'PCCOE', 'VIT', 'Walchand', 'DY Patil', 'JSPM', 'AISSMS'
  ];

  // Calculate filtered and sorted colleges
  const filteredColleges = colleges
    .filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === '' || college.location.toLowerCase() === selectedLocation.toLowerCase())
    )
    .sort((a, b) => {
      // --- NEW: Custom sorting logic ---
      const indexA = customSortOrder.indexOf(a.name);
      const indexB = customSortOrder.indexOf(b.name);

      // If both colleges are in the custom list, sort by their defined order
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only college 'a' is in the custom list, it should come first
      if (indexA !== -1) {
        return -1;
      }
      // If only college 'b' is in the custom list, it should come first
      if (indexB !== -1) {
        return 1;
      }

      // --- FALLBACK: If neither college is in the custom list, use the dropdown sort ---
      // This will sort the "other" colleges amongst themselves.
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'established') {
        return a.established - b.established; // Oldest to newest
      }
      // Default 'popularity' sort for the rest (newest to oldest)
      return b.established - a.established;
    });

  // (The rest of the component remains the same)

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || filteredColleges.length === 0) return;
    const timer = setInterval(() => {
      const slideCount = Math.min(filteredColleges.length, 5);
      if (slideCount > 0) {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredColleges.length]);

  // Get unique locations for filter dropdown
  const uniqueLocations = Array.from(new Set(colleges.map(college => college.location))).sort();

  // Determine how many colleges to display
  const displayedColleges = showAllColleges ? filteredColleges : filteredColleges.slice(0, 9);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    const slideCount = Math.min(filteredColleges.length, 5);
    if (slideCount > 0) {
      setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    }
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    const slideCount = Math.min(filteredColleges.length, 5);
    if (slideCount > 0) {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Loading State */}
      {loading && <LoadingSpinner message="Loading colleges..." />}

      {/* Error State */}
      {error && !loading && <ErrorDisplay message={error} onRetry={refresh} />}

      {/* Main Content - Only show when not loading and no error */}
      {!loading && !error && (
        <React.Fragment>
          {/* Featured Slideshow */}
          {filteredColleges.length > 0 && (
            <div className="relative h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={filteredColleges[currentSlide]?.image}
                    alt={filteredColleges[currentSlide]?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="absolute bottom-10 left-10 right-10 text-white">
                      <h2 className="text-4xl md:text-5xl font-bold mb-3">{filteredColleges[currentSlide]?.name}</h2>
                      <p className="text-lg md:text-xl text-orange-200 mb-6">{filteredColleges[currentSlide]?.fullName}</p>

                      <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <MapPin className="w-5 h-5 mr-2 text-orange-400" />
                          <span className="text-md">{filteredColleges[currentSlide]?.location}</span>
                        </div>
                        <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <Calendar className="w-5 h-5 mr-2 text-orange-400" />
                          <span className="text-md">Est. {filteredColleges[currentSlide]?.established}</span>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-orange-400 mb-3">Highlights</h3>
                        <div className="flex flex-wrap gap-3">
                          {filteredColleges[currentSlide]?.highlights.slice(0, 4).map((highlight, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Link
                          to={`/colleges/${filteredColleges[currentSlide]?.id}`}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Get Details <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <a
                          href={filteredColleges[currentSlide]?.whatsappLink}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Talk to Senior <MessageCircle className="ml-2 w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-10 right-10 flex gap-2">
                <button onClick={handlePrevSlide} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={handleNextSlide} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {/* Page Title & Filters */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Browse All Colleges</h1>
            <p className="text-gray-600 text-lg">
              Discover top engineering colleges and find your perfect educational path.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-xl shadow-md sticky top-4 z-10">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="relative w-full md:w-64">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="relative w-full md:w-64">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'established' | 'popularity')}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="name">Sort by Name</option>
                <option value="established">Sort by Established Year</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                title="Grid View"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                title="List View"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {displayedColleges.map((college) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full'}`}>
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-48 object-cover"
                  />
                  {filteredColleges.indexOf(college) < 5 && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                      <Sparkles size={16} className="mr-1" />
                      Featured
                    </div>
                  )}
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                  <h3 className="text-xl font-bold mb-2">{college.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      {college.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      Established {college.established}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Building size={16} className="mr-2" />
                      {college.fullName}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap size={16} className="mr-2" />
                      Mentors: {college.mentors.length}
                      _          </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/colleges/${college.id}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg text-sm"
                    >
                      Get Details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                    <a
                      href={college.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg text-sm"
                    >
                      Talk to Senior
                      <MessageCircle size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredColleges.length > 9 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllColleges(!showAllColleges)}
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
              >
                {showAllColleges ? 'Show Less' : 'Show More'}
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default CollegesPage;