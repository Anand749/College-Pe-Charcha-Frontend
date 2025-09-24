import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail, ChevronDown, ChevronUp, GraduationCap, ChevronLeft, ChevronRight, Play, Pause, X } from 'lucide-react';
import { useAuthModal } from '../hooks/useAuthModal';
import AuthModal from '../components/AuthModal';
import { motion, AnimatePresence } from 'framer-motion';

import arnav from '../assets/core/arnav.jpg';
import vedanti from '../assets/core/vedanti.jpg';
import samarth from '../assets/core/Samarth Dhagate.jpg';
import anand from '../assets/core/anand.jpg';
import hardik from '../assets/core/hardik.jpg';
import devesh from '../assets/core/devesh.jpg';
import jiya from '../assets/core/jiya.jpg';

import harsh from '../assets/heads/College Heads/harsh.jpg';
// import saurab from '../assets/heads/College Heads/saurab.jpg';
import venugopal from '../assets/heads/College Heads/venugopal.jpg';
import yash from '../assets/heads/College Heads/yash.jpg';
import vedant from '../assets/heads/College Heads/vedant.jpg';
import udayraj from '../assets/heads/College Heads/udayraj.jpg';
import siddant from '../assets/heads/College Heads/siddant.jpg';
import pranav from '../assets/heads/College Heads/pranav.jpg';
import samiksha from '../assets/heads/College Heads/samiksha.jpg';
import darshan from '../assets/heads/College Heads/darshan.png';
import akshat from '../assets/heads/College Heads/akshat.jpg';
import aditya from '../assets/heads/College Heads/aditya.jpg';
import aadhya from '../assets/heads/College Heads/aadhya.jpg';
import shreeharsh from '../assets/heads/College Heads/shreeharsh.jpg';


import jay from '../assets/heads/College Heads/jay.jpg';
import anuraj from '../assets/mentors/anuraj.jpg';
import adinath from '../assets/mentors/adinath.jpg';
import atharv from '../assets/mentors/atharv.jpg';
import arya from '../assets/mentors/arya.jpg';
import pragati from '../assets/mentors/pragati.jpg';
import pratham from '../assets/mentors/pratham.jpg';
import ruchi from '../assets/mentors/ruchi.jpg';
import tejas from '../assets/mentors/tejas.jpg';
import siddhesh from '../assets/mentors/siddhesh.jpg';
import sakshi from '../assets/mentors/sakshi.jpg';
import purva from '../assets/mentors/purva.jpg';
import janhavi from '../assets/mentors/janhavi.jpg';
import gargi from '../assets/mentors/gargi.jpg';
import prathamesh from '../assets/mentors/prathamesh.jpg';
import aryan from '../assets/mentors/aryan.jpg';
import pratik from '../assets/mentors/pratik.jpg';
import mahesh from '../assets/mentors/mahesh.jpg';
import ishwar from '../assets/mentors/ishwar.jpg';
import avdhoot from '../assets/mentors/avdhoot.jpg';




// The TeamMember interface remains the same
interface TeamMember {
  id: string;
  name: string;
  role: string;
  college: string;
  year: string;
  bio: string;
  photo: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
}

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
                  className={`w-full flex items-center space-x-4 p-4 rounded-2xl text-left transition-all duration-300 ${
                    selectedMember.id === member.id ? accentBgClass : 'hover:bg-gray-100'
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-orange-500 w-6' : 'bg-gray-300'
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
                  <p className="text-sm font-semibold text-gray-500 mb-4">Connect:</p>
                  <div className="flex space-x-6">
                    {selectedMember.linkedin && <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 transition-colors"><Linkedin size={24} /><span>LinkedIn</span></a>}
                    {selectedMember.instagram && <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"><Instagram size={24} /><span>Instagram</span></a>}
                    {selectedMember.email && <a href={`mailto:${selectedMember.email}`} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"><Mail size={24} /><span>Email</span></a>}
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
  const teamMembers: TeamMember[] = [
    // Core Team Members
    { id: '1', name: 'Anand Chapke', role: 'Founder & Lead', college: 'VIT Pune', year: 'Third Year', bio: 'Passionate about bridging the gap between aspirants and achievers.', photo: anand, linkedin: 'https://www.linkedin.com/in/anand-chapke-623930281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram: 'https://www.instagram.com/myself_techzdada11?igsh=dnBkbnpnODJzNW0=', email:'anand.chapke23@vit.edu'},
    { id: '2', name: 'Samarth Dhagate', role: 'Operation Lead', college: 'VIT Pune', year: 'Second Year', bio: 'Leading our mentorship program and student engagement initiatives.', photo: samarth, linkedin: 'https://www.linkedin.com/in/samarth-dhagate-187b46320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram:'https://www.instagram.com/samarthdhagate?igsh=N3RvMDQwMWJ2Yml1', email:'samarth.dhagate24@vit.edu' },
    { id: '3', name: 'Vedanti Raut', role: 'Marketing Lead', college: 'VIT Pune', year: 'Second Year', bio: 'Building the tech infrastructure that powers our platform.', photo: vedanti, linkedin: 'https://www.linkedin.com/in/vedanti-raut-b067a6329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', instagram:'https://www.instagram.com/vedantiirautt?igsh=MTE3YmlwZ3EwZzZucg%3D%3D&utm_source=qr', email:'vedanti.raut24@vit.edu' },
    { id: '4', name: 'Arnav Mahajan', role: 'Marketing Lead', college: 'VIT Pune', year: 'Second Year', bio: 'Crafting user-centric designs that enhance the learning experience.', photo: arnav, linkedin: 'https://www.linkedin.com/in/arnav-mahajan-445099334', instagram:'https://www.instagram.com/arnav.mahajan06', email:'arnav.mahajan24@vit.edu' },
    { id: '5', name: 'Hardik Rokhde', role: 'Operation Lead', college: 'VIT Pune', year: 'Third Year', bio: 'Building the tech infrastructure that powers our platform.', photo: hardik, linkedin: 'https://www.linkedin.com/in/hardik-rokde-844a6528a/', instagram:'https://www.instagram.com/what_a_harddik_17', email:'hardik.rokde23@vit.edu' },
    { id: '7', name: 'Jiya Bardiya', role: 'Operation Lead', college: 'VIT Pune', year: 'Third Year', bio: 'Building the tech infrastructure that powers our platform.', photo: jiya, linkedin: '', instagram:'', email:'jiya.bardiya23@vit.edu' },
    { id: '6', name: 'Devesh Nhalde', role: 'Research Lead', college: 'VIT Pune', year: 'Second Year', bio: 'Building the tech infrastructure that powers our platform.', photo: devesh, linkedin: 'https://www.linkedin.com/in/devesh-nhalade-566417336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', instagram:'', email:'devesh.nhalde24@vit.edu' },
    
    // College Heads (More than 4 to demonstrate "View More")
    { id: '7', name: 'Harsh Patil', role: 'College Head - SPIT', college: 'SPIT Mumbai', year: 'Second Year', bio: 'Encouraging collaboration and guiding peers toward new opportunities.', photo: harsh, linkedin: '#' },
    // { id: '8', name: 'Saurab', role: 'College Head - Sinhgad', college: 'Sinhgad College', year: 'Third Year', bio: 'Organizing impactful initiatives that foster growth and leadership.', photo: saurab, linkedin: '#' },
    { id: '9', name: 'Venugopal Baheti', role: 'College Head - VIT', college: 'VIT Pune', year: 'Third Year', bio: 'Dedicated to bridging the gap between achievers and aspiring students.', photo: venugopal, linkedin: '#' },
    { id: '10', name: 'Yash Bhate', role: 'College Head - VJTI', college: 'VJTI Mumbai', year: 'Second Year', bio: 'Focused on fostering peer connections and student mentorship.', photo: yash, linkedin: '#' },
    { id: '11', name: 'Vedant Ingle', role: 'College Head - DYP', college: 'DYP', year: 'Third Year', bio: 'Committed to creating opportunities that empower student growth.', photo: vedant, linkedin: '#' },
    { id: '12', name: 'Udayraj', role: 'College Head - Walchand', college: 'Walchand Sangli', year: 'Second Year', bio: 'Building strong networks to support collaborative learning.', photo: udayraj, linkedin: '#' },
    { id: '13', name: 'Siddant Rajput', role: 'College Head - PICT', college: 'PICT Pune', year: 'Second Year', bio: 'Encouraging innovation and guiding peers to achieve excellence.', photo: siddant, linkedin: '#' },
    { id: '14', name: 'Pranav Gawand', role: 'College Head - PICT', college: 'PICT Pune', year: 'Second Year', bio: 'Dedicated to organizing initiatives that inspire student engagement.', photo: pranav, linkedin: '#' },
    { id: '15', name: 'Samiksha Magdum', role: 'College Head - Cummins', college: 'Cummins College', year: 'Second Year', bio: 'Passionate about leadership and building supportive learning spaces.', photo: samiksha, linkedin: '#' },
    { id: '16', name: 'Darshan Patil', role: 'College Head - Walchand', college: 'Walchand Sangli', year: 'Second Year', bio: 'Striving to create impactful experiences for fellow students.', photo: darshan, linkedin: '#' },
    { id: '17', name: 'Akshat Patil', role: 'College Head - SPIT', college: 'SPIT Mumbai', year: 'Second Year', bio: 'Promoting collaboration and driving meaningful student initiatives.', photo: akshat, linkedin: '#' },
    { id: '18', name: 'Aditya Patel', role: 'College Head - JSPM', college: 'JSPM', year: 'Second Year', bio: 'Focused on developing peer-driven learning and mentorship programs.', photo: aditya, linkedin: '#' },
    { id: '19', name: 'Aadhya Bhagat', role: 'College Head - PCCOE', college: 'PCCOE', year: 'Third Year', bio: 'Committed to empowering students through guidance and opportunities.', photo: aadhya, linkedin: '#' },
    { id: '20', name: 'Shreeharsh Omase', role: 'College Head - VIT', college: 'VIT Pune', year: 'Second Year', bio: 'Passionate about mentorship and building future-ready student leaders.', photo: shreeharsh, linkedin: '#' },
    //MEntors
  
    { id: '21', name: 'Jay Matere', role: 'College Mentor - PICT', college: 'PICT Pune', year: 'Second Year', bio: 'Leading initiatives that connect experience with ambition.', photo: jay, linkedin: '#' },
    { id: '22', name: 'Anuraj Jagtap', role: 'College Mentor - PICT', college: 'PICT Pune', year: 'Second Year', bio: 'Dedicated to guiding peers with mentorship and meaningful support.', photo: anuraj, linkedin: '#' },
    { id: '23', name: 'Adinath Dound', role: 'College Mentor - VIT', college: 'VIT Pune', year: 'Second Year', bio: 'Committed to supporting juniors through guidance and collaboration.', photo: adinath, linkedin: '#' },
    { id: '24', name: 'Atharv', role: 'College Mentor - VIT', college: 'VIT Pune', year: 'Second Year', bio: 'Focused on creating a supportive space for learning and growth.', photo: atharv, linkedin: '#' },
    { id: '25', name: 'Arya Kale', role: 'College Mentor - VIT', college: 'VIT Pune', year: 'Second Year', bio: 'Passionate about mentoring and helping peers achieve their goals.', photo: arya, linkedin: '#' },
    { id: '26', name: 'Pragati Rakhunde', role: 'College Mentor - VIT', college: 'VIT Pune', year: 'Second Year', bio: 'Encouraging collaboration and fostering growth through mentorship.', photo: pragati, linkedin: '#' },
    { id: '27', name: 'Pratham Dedgaonkar', role: 'College Mentor - VIT', college: 'VIT Pune', year: 'Second Year', bio: 'Dedicated to guiding juniors with practical insights and support.', photo: pratham, linkedin: '#' },
    { id: '28', name: 'Ruchi Hande', role: 'College Mentor - VIT', college: 'VIT Pune', year: 'Second Year', bio: 'Inspiring peers to learn, grow, and achieve through mentorship.', photo: ruchi, linkedin: '#' },
    { id: '29', name: 'Tejas Parkar', role: 'College Mentor - PCCOE', college: 'PCCOE', year: 'Third Year', bio: 'Sharing knowledge and experiences to empower juniors in their journey.', photo: tejas, linkedin: '#' },
    { id: '30', name: 'Siddhesh Sarphale', role: 'College Mentor - PCCOE', college: 'PCCOE', year: 'Third Year', bio: 'Passionate about guiding peers and encouraging continuous learning.', photo: siddhesh, linkedin: '#' },
    { id: '31', name: 'Sakshi Patil', role: 'College Mentor - PCCOE', college: 'PCCOE', year: 'Third Year', bio: 'Committed to building meaningful mentor-mentee connections.', photo: sakshi, linkedin: '#' },
    { id: '32', name: 'Purva Kavathekar', role: 'College Mentor - Cummins', college: 'Cummins College', year: 'Second Year', bio: 'Dedicated to mentoring peers and helping them reach their full potential.', photo: purva, linkedin: '#' },
    { id: '33', name: 'Janhavi Deshpande', role: 'College Mentor - Cummins', college: 'Cummins College', year: 'Second Year', bio: 'Encouraging collaboration and growth through knowledge sharing.', photo: janhavi, linkedin: '#' },
    { id: '34', name: 'Gargi Mukkawar', role: 'College Mentor - Cummins', college: 'Cummins College', year: 'Second Year', bio: 'Focused on guiding juniors with valuable insights and support.', photo: gargi, linkedin: '#' },
    { id: '35', name: 'Prathamesh Naik', role: 'College Mentor - VJTI', college: 'VJTI Mumbai', year: 'Second Year', bio: 'Helping peers navigate challenges with mentorship and guidance.', photo: prathamesh, linkedin: '#' },
    { id: '36', name: 'Aryan Jadhav', role: 'College Mentor - VJTI', college: 'VJTI Mumbai', year: 'Second Year', bio: 'Encouraging teamwork and continuous learning among students.', photo: aryan, linkedin: '#' },
    { id: '37', name: 'Pratik Yelmewad', role: 'College Mentor - Walchand', college: 'Walchand Sangli', year: 'Second Year', bio: 'Committed to creating a collaborative and supportive environment.', photo: pratik, linkedin: '#' },
    { id: '38', name: 'Mahesh Khose', role: 'College Mentor - PICT', college: 'PICT Pune', year: 'Second Year', bio: 'Striving to guide juniors through shared experiences and insights.', photo: mahesh, linkedin: '#' },
    { id: '39', name: 'Ishwar Sonawane', role: 'College Mentor - PCCOE', college: 'PCCOE', year: 'Third Year', bio: 'Passionate about helping peers grow academically and personally.', photo: ishwar, linkedin: '#' },
    { id: '40', name: 'Avdhoot Patankar', role: 'College Mentor - JSPM', college: 'JSPM', year: 'Second Year', bio: 'Dedicated to supporting students with mentorship and motivation.', photo: avdhoot, linkedin: '#' },

  ];

  // Separate members into their respective sections
 const coreTeam = teamMembers.filter(member => 
  !member.role.includes('College Head') && !member.role.includes('College Mentor')
);

const collegeHeads = teamMembers.filter(member => 
  member.role.includes('College Head')
);

const collegeMentors = teamMembers.filter(member => 
  member.role.includes('College Mentor')
);


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
        
        {/* Showcase 1: Core Team */}
        <TeamShowcase 
          title="Core Team" 
          members={coreTeam} 
          accentColor="orange"
          initialVisibleCount={4}
          autoSlide={true}
        />

        {/* Showcase 2: College Heads */}
        <TeamShowcase 
          title="College Heads" 
          members={collegeHeads} 
          accentColor="orange"
          initialVisibleCount={4}
          autoSlide={true}
        />
        {/*mentors*/}
        <TeamShowcase 
         title="College Mentors" 
          members={collegeMentors} 
          accentColor="orange"
          initialVisibleCount={4}
          autoSlide={true}
        />
        
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
      </div>
    </div>
  );
};

export default TeamPage;

