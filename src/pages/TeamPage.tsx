import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail, ChevronDown, ChevronUp, GraduationCap, ChevronLeft, ChevronRight, Play, Pause, X } from 'lucide-react';
import { useAuthModal } from '../hooks/useAuthModal';
import AuthModal from '../components/AuthModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { TeamMember } from '../services/team.service';
// A reusable, now stateful, component for the "List & Detail" showcase
const TeamShowcase = ({ title, members, accentColor, initialVisibleCount, autoSlide = false }: { title: string, members: TeamMember[], accentColor: string, initialVisibleCount?: number, autoSlide?: boolean }) => {
  if (members.length === 0) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedMember, setSelectedMember] = useState<TeamMember>(members[0]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isExpanded, setIsExpanded] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isPlaying, setIsPlaying] = useState(autoSlide);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showAllModal, setShowAllModal] = useState(false);
  const accentTextClass = `text-${accentColor}-600`;
  const accentBgClass = `bg-${accentColor}-100`;
  // Auto-slide functionality
  useEffect(() => {
    if (isPlaying && members.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % members.length);
        setSelectedMember(members[(currentIndex + 1) % members.length]);
      }, 3000); // Change every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isPlaying, members, currentIndex]);
  const nextMember = () => {
    const nextIndex = (currentIndex + 1) % members.length;
    setCurrentIndex(nextIndex);
    setSelectedMember(members[nextIndex]);
  };
  const prevMember = () => {
    const prevIndex = (currentIndex - 1 + members.length) % members.length;
    setCurrentIndex(prevIndex);
    setSelectedMember(members[prevIndex]);
  };
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  // Determine if the "View More" button is needed and which members to show
  const canBeTruncated = initialVisibleCount && members.length > initialVisibleCount;
  const visibleMembers = canBeTruncated && !isExpanded ? members.slice(0, initialVisibleCount) : members;
  // Fixed height for better consistency
  const getDynamicHeight = () => {
    return 600; // Fixed height for better UX
  };
  return (
    <section className="mb-16">
      <div
        className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-orange-100"
        style={{ minHeight: `${getDynamicHeight()}px` }}
      >
        {/* Left Panel: Scrollable List of Members */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col">
          {/* This inner div will now scroll because its parent has a fixed height */}
          <div className="p-6 flex-grow overflow-y-auto">
            <h2 className={`text-xl font-bold ${accentTextClass} mb-6`}>{title}</h2>
            <div className="space-y-3">
              {visibleMembers.map(member => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-2xl text-left transition-all duration-300 ${selectedMember.id === member.id ? accentBgClass : 'hover:bg-gray-100'
                    }`}
                >
                  <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-md hover:shadow-lg transition-shadow duration-300" />
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{member.name}</p>
                    <p className={`text-sm font-semibold ${accentTextClass}`}>{member.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* "View More" Button */}
          {canBeTruncated && (
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAllModal(true)}
                className="w-full flex items-center justify-center space-x-2 text-sm font-semibold text-orange-600 hover:text-orange-700 py-3 rounded-2xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
              >
                <span>View All {members.length} Members</span>
                <ChevronDown size={16} />
              </button>
            </div>
          )}
        </div>
        {/* Right Panel: Detailed View of Selected Member */}
        <div className="w-full md:w-2/3 lg:w-3/4 p-8 md:p-12 lg:p-16 overflow-y-auto relative">
          {/* Navigation Controls */}
          {members.length > 1 && (
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
              <button
                onClick={prevMember}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={togglePlayPause}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
              >
                {isPlaying ? <Pause className="h-4 w-4 text-gray-600" /> : <Play className="h-4 w-4 text-gray-600" />}
              </button>
              <button
                onClick={nextMember}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}
          {/* Progress Indicators */}
          {members.length > 1 && (
            <div className="absolute top-4 left-4 flex space-x-1 z-10">
              {members.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSelectedMember(members[index]);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-orange-500 w-6' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMember.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12"
            >
              <div className="w-full lg:w-1/3">
                <img src={selectedMember.photo} alt={selectedMember.name} className="rounded-3xl shadow-2xl w-full max-w-sm mx-auto lg:mx-0 aspect-square object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="w-full lg:w-2/3">
                <p className={`text-sm font-semibold ${accentTextClass} uppercase tracking-wider`}>{selectedMember.role}</p>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-2 mb-4">{selectedMember.name}</h1>
                <p className="text-xl font-medium text-gray-500 mb-6">{selectedMember.college} - {selectedMember.year}</p>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedMember.bio}</p>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 mb-4">Connect On:</p>
                  <div className="flex flex-wrap gap-4">
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <Linkedin size={20} />
                        <span className="font-medium">LinkedIn</span>
                      </a>
                    )}
                    {selectedMember.instagram && (
                      <a
                        href={selectedMember.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <Instagram size={20} />
                        <span className="font-medium">Instagram</span>
                      </a>
                    )}
                    {selectedMember.email && (
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <Mail size={20} />
                        <span className="font-medium">Email</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* All Members Modal */}
      {showAllModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">All {title} Members</h2>
              <button
                onClick={() => setShowAllModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedMember(member);
                      setShowAllModal(false);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={member.photo} alt={member.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className={`text-sm ${accentTextClass}`}>{member.role}</p>
                        <p className="text-xs text-gray-500">{member.college}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
const TeamPage = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, handleApplyNowClick } = useAuthModal();
  // Fetch team members from API
  const { teamMembers, loading, error, refresh } = useTeamMembers();
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }
  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load team members</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  // Only show Core Team members (Founders + Core), sorted by priority
  const coreTeam = teamMembers
    .filter(member =>
      member.role.includes('Core Team Member') || member.role.includes('Founder')
    )
    .sort((a, b) => {
      // Define priority order: Founder (1), Core (2)
      const getPriority = (role: string) => {
        if (role.includes('Founder')) return 1;
        if (role.includes('Core Team Member')) return 2;
        return 3;
      };
      return getPriority(a.role) - getPriority(b.role);
    });

  const executiveTeam = teamMembers.filter(member => member.role.includes('Executive'));
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Meet The Team</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          The passionate students dedicated to guiding the next generation.
        </motion.p>
      </div>
      <div className="max-w-7xl w-full mx-auto p-4 md:p-8">
        {/* Core Team */}
        {
          coreTeam.length > 0 && (
            <TeamShowcase
              title="Core Team"
              members={coreTeam}
              accentColor="orange"
              initialVisibleCount={4}
              autoSlide={true}
            />
          )
        }
        {/* Executive Team */}
        {
          executiveTeam.length > 0 && (
            <TeamShowcase
              title="Executive Team"
              members={executiveTeam}
              accentColor="orange"
              initialVisibleCount={4}
              autoSlide={true}
            />
          )
        }

        {/* Join Our Team Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Want to Join Our Team?</h2>
          <p className="text-lg text-gray-600 mb-6">Be part of something extraordinary! We're looking for passionate individuals to join our community.</p>
          <button
            onClick={() => handleApplyNowClick()}
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Apply Now
          </button>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        </div>
      </div >
    </div >
  );
};
export default TeamPage;
