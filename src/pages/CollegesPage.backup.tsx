import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Search, Filter, Building, GraduationCap, Sparkles, TrendingUp, Grid, List } from 'lucide-react';
import { colleges } from '../data/colleges';

const CollegesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'established' | 'popularity'>('popularity');
  const [showAllColleges, setShowAllColleges] = useState(false);

const CollegesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'established' | 'popularity'>('popularity');
  const [showAllColleges, setShowAllColleges] = useState(false); } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Search, Filter, Building, GraduationCap, Sparkles, TrendingUp, Grid, List } from 'lucide-react';
import { colleges } from '../data/colleges';t { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, Search, Filter, Building, GraduationCap, Sparkles, TrendingUp, Award, ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';
import { colleges } from '../data/colleges';

const CollegesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'established' | 'popularity'>('popularity');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showAllColleges, setShowAllColleges] = useState(false);

  // Filter and sort colleges
  const filteredColleges = colleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation === '' || college.location === selectedLocation;
      return matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'established':
          return a.established - b.established;
        case 'popularity':
          return b.established - a.established; // Older colleges first
        default:
          return 0;
      }
    });

  const locations = [...new Set(colleges.map(college => college.location))];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || filteredColleges.length === 0 || showAllColleges) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredColleges.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredColleges.length, showAllColleges]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredColleges.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredColleges.length) % filteredColleges.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-orange-500/30 to-orange-600/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent"
            >
              Premier Colleges
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Discover Maharashtra's finest engineering institutions with authentic insights and expert guidance
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Find Your Perfect Match</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Colleges</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, location, or specializations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-base bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-base bg-white transition-all duration-300 appearance-none"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'established' | 'popularity')}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-base bg-white transition-all duration-300 appearance-none"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="name">Alphabetical</option>
                  <option value="established">Established Year</option>
                </select>
              </div>
            </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedLocation) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span>Active Filters:</span>
                <div className="flex gap-2">
                  {searchTerm && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg">
                      Search: {searchTerm}
                    </span>
                  )}
                  {selectedLocation && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg">
                      Location: {selectedLocation}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
          {/* Search and Filter Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Find Your Perfect Match</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Colleges</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by name, location, or specializations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-base bg-white transition-all duration-300"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-base bg-white transition-all duration-300 appearance-none"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-5 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 text-lg bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="popularity">🔥 Most Popular</option>
                <option value="name">📝 Alphabetical</option>
                <option value="established">📅 Established</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Colleges Display */}
        {filteredColleges.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {showAllColleges ? 'All Colleges' : 'Featured Colleges'}
              </h2>
              <div className="flex items-center gap-4">
                {!showAllColleges && (
                  <button
                    onClick={() => setShowAllColleges(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-semibold"
                  >
                    <Grid className="w-4 h-4" />
                    View All Colleges
                  </button>
                )}
                {showAllColleges && (
                  <button
                    onClick={() => setShowAllColleges(false)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 font-semibold"
                  >
                    <List className="w-4 h-4" />
                    Show Featured
                  </button>
                )}
              </div>
            </div>

            {/* Slideshow View */}
            {!showAllColleges && (
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                <div className="relative h-96 md:h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className="relative h-full">
                        {/* Background Image */}
                        <img
                          src={filteredColleges[currentSlide].image}
                          alt={filteredColleges[currentSlide].fullName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex items-center">
                          <div className="max-w-7xl mx-auto px-8 w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                              {/* Text Content */}
                              <div className="text-white">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                                    <GraduationCap className="w-8 h-8 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-4xl md:text-5xl font-bold mb-2">{filteredColleges[currentSlide].name}</h3>
                                    <p className="text-xl text-orange-200">{filteredColleges[currentSlide].fullName}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-6 mb-6">
                                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <MapPin className="w-5 h-5" />
                                    <span className="font-medium">{filteredColleges[currentSlide].location}</span>
                                  </div>
                                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <Calendar className="w-5 h-5" />
                                    <span className="font-medium">Est. {filteredColleges[currentSlide].established}</span>
                                  </div>
                                </div>
                                
                                <div className="text-gray-200 mb-8 leading-relaxed max-w-lg">
                                  <p className="text-lg leading-relaxed">{filteredColleges[currentSlide].description}</p>
                                </div>
                                
                                <Link
                                  to={`/colleges/${filteredColleges[currentSlide].id}`}
                                  className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-8 rounded-2xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-semibold text-lg"
                                >
                                  Explore College
                                  <ArrowRight className="w-5 h-5" />
                                </Link>
                              </div>
                              
                              {/* Highlights */}
                              <div className="hidden lg:block">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                  <h4 className="text-xl font-semibold text-white mb-6">Key Highlights</h4>
                                  <div className="space-y-4">
                                    {filteredColleges[currentSlide].highlights.map((highlight, idx) => (
                                      <div key={idx} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                        <span className="text-gray-200">{highlight}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                  {filteredColleges.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Grid View for All Colleges */}
            {showAllColleges && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredColleges.map((college, index) => (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20"
                  >
                    {/* College Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={college.image}
                        alt={college.fullName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white text-2xl font-bold">{college.name}</h3>
                            <p className="text-orange-200 text-sm font-medium">{college.fullName}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* College Info */}
                    <div className="p-8">
                      {/* Location and Established */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-gray-600 bg-orange-50 px-4 py-2 rounded-xl">
                          <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                          <span className="text-sm font-semibold text-orange-700">{college.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                          <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                          <span className="text-sm font-semibold text-gray-700">Est. {college.established}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <p className="text-gray-600 text-sm leading-relaxed">{college.description}</p>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {college.highlights.slice(0, 2).map((highlight, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 text-xs rounded-xl font-semibold border border-orange-200"
                            >
                              {highlight}
                            </span>
                          ))}
                          {college.highlights.length > 2 && (
                            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 text-xs rounded-xl font-semibold">
                              +{college.highlights.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        to={`/colleges/${college.id}`}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-6 rounded-2xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-semibold text-lg group-hover:shadow-lg transform group-hover:scale-105"
                      >
                        Explore College
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Search className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No colleges found</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">Try adjusting your search criteria or filters to find what you're looking for.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('');
                setSortBy('popularity');
              }}
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-2xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-semibold"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Why Choose Us Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-16 border border-white/20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our comprehensive approach to college guidance and mentorship
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Expert Guidance</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Connect with experienced mentors who provide authentic insights and personalized guidance for your college journey</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Premium Experience</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Enjoy a modern, intuitive platform designed to make your college search seamless and enjoyable</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Proven Results</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Join thousands of successful students who found their perfect college match through our platform</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CollegesPage;