import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthModal } from '../hooks/useAuthModal';
import AuthModal from '../components/AuthModal';
import { ArrowRight, Users, BookOpen, Calendar, Star, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Award, X } from 'lucide-react';
import teamPhoto1 from '../assets/team-photo-3.jpg';

import NotificationBar from '../components/layout/NotificationBar';


const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [showCorePopup, setShowCorePopup] = useState(false);
  const { isAuthModalOpen, setIsAuthModalOpen, handleApplyNowClick } = useAuthModal();


  const testimonials = [
    { id: 1, name: "Riya Paunikar", college: "Cummins Pune", rating: 5, text: "Team CPC not only helped me choose the right college and branch, they ran skill-building sessions with seniors who had already got placed — that guidance made a huge difference." },
    { id: 2, name: "Vineet Dayma", college: "VIT Pune", rating: 5, text: "Joining CPC was the best decision — it gave me a place to ask honest questions and get real answers from seniors." },
    { id: 3, name: "Anvay Ghare", college: "VIT Pune", rating: 5, text: "From choosing which colleges to realistically aim for to getting into the one I wanted, CPC's support made the whole process a lot easier." },
    { id: 4, name: "Meera Kulkarni", college: "COEP", rating: 5, text: "Seniors gave me insights about COEP’s academics and exposure that I couldn't find anywhere else. CPC's help during admissions made choosing COEP feel perfect." },
    { id: 5, name: "Rohit Deshpande", college: "PICT", rating: 5, text: "Seniors shared the real coding culture and placement outlook at PICT — that clarity plus CPC's guidance helped me confidently choose PICT." },
    { id: 6, name: "Anita Joshi", college: "Walchand", rating: 4, text: "Practical insights from seniors and CPC's continued support helped me decide on Walchand without any doubts." },
    { id: 7, name: "Sahil Iyer", college: "SPIT", rating: 5, text: "Seniors painted a clear picture of SPIT's startup culture and industry exposure — CPC guided me every step of the way." },
    { id: 8, name: "Priya Rao", college: "VJTI", rating: 5, text: "Real student experiences showed me the opportunities at VJTI. CPC kept me focused and helped make the admission possible." },
    { id: 9, name: "Karan Patel", college: "ICT Mumbai", rating: 5, text: "Detailed round-wise cutoff discussions and honest senior feedback helped me tailor my choices and get a seat I was proud of." },
    { id: 10, name: "Nisha Kulkarni", college: "DYP", rating: 5, text: "CPC's mentor sessions helped me prepare for college life and understand placement trends — extremely practical and motivating." },
    { id: 11, name: "Rajat Sharma", college: "COEP", rating: 4, text: "The group's alumni network and clear insights into branch-wise strengths helped me pick a branch aligned with my goals." }
  ]



  const heroImages = [teamPhoto1];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    const heroImageInterval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    // Show core popup after 3 seconds
    const popupTimer = setTimeout(() => {
      setShowCorePopup(true);
    }, 3000);

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(heroImageInterval);
      clearTimeout(popupTimer);
    };
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Notification Bar */}
      <NotificationBar />

      {/* Hero Section - Mobile Optimized */}
      <section
        className="relative transition-all duration-1000 ease-in-out overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.5) 80%, rgba(255, 255, 255, 0.2) 100%), url(${heroImages[currentHeroImage]})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll',
          minHeight: '100vh',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-start pt-24 sm:pt-32 md:pt-40" style={{ minHeight: '100vh' }}>
          <div className="text-left max-w-2xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
            >
              Your Path to <span className="text-orange-600">Dream College</span> Starts Here!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed"
            >
              Maharashtra's only student-led initiative connecting aspiring students with seniors from top colleges.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="https://www.techzdada.in/college-predictor"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 w-full sm:w-auto touch-manipulation"
              >
                College Predictor <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://www.techzdada.in/cutoff-predictor"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-orange-600 text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 flex items-center justify-center w-full sm:w-auto touch-manipulation"
              >
                Analyze Cutoff(5years) <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">What We Offer</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">Comprehensive tools and guidance to help you make the right college choices</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

            {/* Card 1 - Tools for Cap-Rounds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-orange-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-6">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Tools for <span className="text-orange-600">Cap-Rounds</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-md">
                    Comprehensive AI-powered tools designed to simplify your admission process. From prediction to comparison, we have everything covered.
                  </p>
                  <a
                    href="https://www.techzdada.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 font-semibold text-sm sm:text-base hover:text-orange-700 inline-flex items-center gap-1 transition-colors"
                  >
                    Explore Tools <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm md:min-w-[280px]">
                  <div className="grid grid-cols-2 gap-3">
                    {['College Predictor', 'Cutoff Predictor', 'Comparison Tool', 'College List Generator'].map((tool) => (
                      <div key={tool} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-gray-700">{tool}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700">Historical Data Analyzer</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Talk to Seniors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-50/50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-orange-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Talk to <span className="text-orange-600">Seniors</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Get the <strong>authentic reality</strong> of your dream college. Don't rely on brochures; talk to students who are actually living it.
                  </p>
                  <Link
                    to="/colleges"
                    className="text-orange-600 font-semibold text-sm sm:text-base hover:text-orange-700 inline-flex items-center gap-1 transition-colors"
                  >
                    Connect Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex flex-col gap-3">
                    {[
                      { initials: 'SP', label: 'Student Reviews', sub: 'Authentic feedback', color: 'bg-orange-100 text-orange-600' },
                      { initials: 'PL', label: 'Placement Reality', sub: 'Real packages & stats', color: 'bg-orange-100 text-orange-600' },
                      { initials: 'CL', label: 'Campus Life', sub: 'Events & Culture', color: 'bg-orange-100 text-orange-600' },
                    ].map((item) => (
                      <div key={item.initials} className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                          {item.initials}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Vision to Visionaries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-teal-50 to-teal-100/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-teal-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-6">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Vision to <span className="text-teal-600">Visionaries</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-md">
                    Campus to Corporate roadmap. Connect with alumni placed in top companies and get a <strong>career roadmap</strong> from Day 1.
                  </p>
                  <Link
                    to="/events"
                    className="text-teal-600 font-semibold text-sm sm:text-base hover:text-teal-700 inline-flex items-center gap-1 transition-colors"
                  >
                    View Events <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm md:min-w-[220px]">
                  <div className="flex flex-col gap-3">
                    {['Expert Sessions', 'Resume Building', 'Mock Interviews', 'Industry Trends'].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Testimonials Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Success Stories from Students Like You</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">Join thousands of students who found their dream colleges with our guidance</p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-8 md:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-orange-50 to-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-12 text-center border-2 border-orange-100"
              >
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (<Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current" />))}
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-6 sm:mb-8 italic leading-relaxed font-medium">"{testimonials[currentTestimonial].text}"</p>
                <div className="font-bold text-gray-900 text-lg sm:text-xl mb-1">{testimonials[currentTestimonial].name}</div>
                <div className="text-orange-600 font-semibold text-base sm:text-lg">{testimonials[currentTestimonial].college}</div>
              </motion.div>
            </AnimatePresence>
            {/* Mobile-Friendly Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-6 bg-white rounded-full p-2 sm:p-3 md:p-4 shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-300 border-2 border-orange-200 touch-manipulation"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-6 bg-white rounded-full p-2 sm:p-3 md:p-4 shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-300 border-2 border-orange-200 touch-manipulation"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            Join thousands of students who've found their dream colleges with our guidance
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/colleges"
              className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold hover:bg-orange-50 transition-all duration-300 inline-flex items-center shadow-lg transform hover:scale-105 active:scale-95 touch-manipulation"
            >
              Get Started Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Member Application Popup - Mobile Optimized */}
      <AnimatePresence>
        {showCorePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCorePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCorePopup(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
                aria-label="Close popup"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">College Predictor and Cutoff Analyzer</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
                  Find your best-fit college using real cutoff data.
                </p>

                <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span>Predict based on your marks & category</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span>Compare colleges across all rounds</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span>Check round-wise cutoff trends</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span>Get smart suggestions instantly</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowCorePopup(false);
                      window.open('https://www.techzdada.in/college-predictor', '_blank');
                    }}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation"
                  >
                    College Predictor
                  </button>
                  <button
                    onClick={() => {
                      setShowCorePopup(false);
                      window.open('https://www.techzdada.in/cutoff-predictor', '_blank');
                    }}
                    className="flex-1 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 touch-manipulation"
                  >
                    Analyze Cutoffs
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;



