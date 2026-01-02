import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthModal } from '../hooks/useAuthModal';
import AuthModal from '../components/AuthModal';
import { ArrowRight, Users, BookOpen, Calendar, Star, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Award, X } from 'lucide-react';
import teamPhoto1 from '../assets/team-photo-3.jpg';
import { useNavigate } from 'react-router-dom';
import NotificationBar from '../components/layout/NotificationBar';


const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [showCorePopup, setShowCorePopup] = useState(false);
  const { isAuthModalOpen, setIsAuthModalOpen, handleApplyNowClick } = useAuthModal();
  const navigate = useNavigate();

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


  const features = [
    { icon: <BookOpen className="h-12 w-12 text-orange-600" />, title: "AI College Predictor", description: "Get accurate college predictions based on your percentile and category with our AI-powered tool." },
    { icon: <Users className="h-12 w-12 text-orange-600" />, title: "Direct Senior Connect", description: "Connect directly with seniors from your dream colleges. Get authentic insights and guidance." },
    { icon: <Calendar className="h-12 w-12 text-orange-600" />, title: "Expert Sessions", description: "Attend exclusive sessions with industry experts and professionals to boost your career prospects." },
  ];

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

      {/* Hero Section */}
      <section
        className="relative transition-all duration-1000 ease-in-out overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 40%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 100%), url(${heroImages[currentHeroImage]})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll',
          minHeight: '100vh',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-start pt-32" style={{ minHeight: '100vh' }}>
          <div className="text-left max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Your Path to <span className="text-orange-600">Dream College</span> Starts Here!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-600 mb-8"
            >
              Maharashtra's only student-led initiative connecting aspiring students with seniors from top colleges.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/predictor" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center w-fit shadow-lg transform hover:scale-105">
                College Predictor <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/compare" className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 w-fit">
                Compare Colleges <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive tools and guidance to help you make the right college choices</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 hover:shadow-2xl transition-all duration-300 border border-orange-200"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600">Real experiences from students who found their path</p>
          </motion.div>
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-orange-100"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (<Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />))}
              </div>
              <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">"{testimonials[currentTestimonial].text}"</p>
              <div className="font-semibold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
              <div className="text-orange-600 font-medium">{testimonials[currentTestimonial].college}</div>
            </motion.div>
            <button onClick={prevTestimonial} className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-300"><ChevronLeft className="h-6 w-6 text-gray-600" /></button>
            <button onClick={nextTestimonial} className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-300"><ChevronRight className="h-6 w-6 text-gray-600" /></button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of students who've found their dream colleges with our guidance
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/colleges" className="bg-white text-orange-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-orange-50 transition-all duration-300 inline-flex items-center shadow-lg transform hover:scale-105">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Member Application Popup */}
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
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCorePopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">College Predictor and Comparison</h3>
                <p className="text-gray-600 mb-6">
                  Find your best-fit college using real cutoff data.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Sparkles className="h-4 w-4 text-orange-500 mr-2" />
                    <span>Predict based on your marks & category</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 text-orange-500 mr-2" />
                    <span>Compare colleges across all rounds</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 text-orange-500 mr-2" />
                    <span>Check round-wise cutoff trends</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 text-orange-500 mr-2" />
                    <span>Get smart suggestions instantly</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowCorePopup(false);
                      navigate('/predictor');

                    }}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Predictor
                  </button>
                  <button
                    onClick={() => {
                      setShowCorePopup(false);
                      navigate('/compare');
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Compare Colleges
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



