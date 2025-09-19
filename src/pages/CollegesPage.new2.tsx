import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Search, Filter, Building, GraduationCap, Sparkles, TrendingUp, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { colleges } from '../data/colleges';

const CollegesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'established' | 'popularity'>('popularity');
  const [showAllColleges, setShowAllColleges] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Calculate filtered and sorted colleges
  const filteredColleges = colleges
    .filter(college => 
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === '' || college.location.toLowerCase() === selectedLocation.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'established') {
        return a.established - b.established;
      } else {
        // Sort by established date for now
        return b.established - a.established;
      }
    });

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || filteredColleges.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(filteredColleges.length, 5));
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredColleges.length]);

  // Get unique locations for filter dropdown
  const uniqueLocations = Array.from(new Set(colleges.map(college => college.location))).sort();

  // Determine how many colleges to display
  const displayedColleges = showAllColleges ? filteredColleges : filteredColleges.slice(0, 9);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Slideshow */}
      {filteredColleges.length > 0 && (
        <div className="relative h-[500px] mb-12 rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={filteredColleges[currentSlide]?.image}
                alt={filteredColleges[currentSlide]?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <h2 className="text-4xl font-bold mb-4">{filteredColleges[currentSlide]?.name}</h2>
                  <p className="text-xl mb-6">{filteredColleges[currentSlide]?.fullName}</p>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {filteredColleges[currentSlide]?.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Est. {filteredColleges[currentSlide]?.established}
                    </div>
                  </div>
                  <Link
                    to={`/colleges/${filteredColleges[currentSlide]?.id}`}
                    className="inline-flex items-center mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slideshow Controls */}
          <div className="absolute bottom-10 right-10 flex gap-2">
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide((prev) => (prev - 1 + Math.min(filteredColleges.length, 5)) % Math.min(filteredColleges.length, 5));
              }}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide((prev) => (prev + 1) % Math.min(filteredColleges.length, 5));
              }}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Browse All Colleges</h1>
        <p className="text-gray-600 text-lg">
          Discover top engineering colleges and find your perfect educational path
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search colleges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location Filter */}
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="relative w-full md:w-64">
          <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'established' | 'popularity')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="name">Sort by Name</option>
            <option value="established">Sort by Established Year</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            title="Grid View"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            title="List View"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Colleges Grid/List */}
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
                </div>
              </div>

              <Link 
                to={`/colleges/${college.id}`}
                className="inline-flex items-center text-blue-500 hover:text-blue-600"
              >
                View Details
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {filteredColleges.length > 9 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllColleges(!showAllColleges)}
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {showAllColleges ? 'Show Less' : 'Show More'}
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CollegesPage;