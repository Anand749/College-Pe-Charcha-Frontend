import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api.config';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// --- Data Constants ---
const domains = ['Marketing', 'Operations', 'Research', 'Design', 'Editing', 'Other'];
const colleges = ['COEP', 'VJTI', 'SPIT', 'PICT', 'WALCHAND', 'DJ-SANGHAVI', 'CUMMINS', 'VIT', 'PCCOE', 'DYP', 'AISSMS', 'SINHGAD', 'JSPM', 'OTHER'];
const branches = ['CS', 'IT', 'ENTC', 'CS Spcialization', 'Mech', 'Civil', 'Chemical', 'Instrumentation', 'Other'];

const CoreApplicationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- State Management ---
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    college: '',
    year: '',
    branch: '',
    preferredDomain: [] as string[], // Modified: Now an array for multiple domains
    experience: '',
    futurePlans: '',
    whyCore: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ general?: string; }>({});
  
  // --- Voice-to-Text State ---
  const [activeVoiceInput, setActiveVoiceInput] = useState<string | null>(null);
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // --- Effect to update form data from voice transcript ---
  useEffect(() => {
    if (activeVoiceInput && transcript) {
      setFormData(prev => ({
        ...prev,
        [activeVoiceInput]: transcript
      }));
    }
  }, [transcript, activeVoiceInput]);

  // --- Validation ---
  const validateForm = () => {
    // You can add more complex validation logic here if needed
    return true; 
  };

  // --- Event Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handler for multi-select domain checkboxes
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentDomains = prev.preferredDomain;
      if (checked) {
        return { ...prev, preferredDomain: [...currentDomains, value] };
      } else {
        return { ...prev, preferredDomain: currentDomains.filter(domain => domain !== value) };
      }
    });
  };

  // Handler for voice input activation
  const handleVoiceClick = (fieldName: string) => {
    if (listening) {
      SpeechRecognition.stopListening();
      setActiveVoiceInput(null);
    } else {
      setActiveVoiceInput(fieldName);
      // Start listening and set the form field's current value as the starting point
      SpeechRecognition.startListening({ continuous: true });
      setFormData(prev => ({...prev, [fieldName]: prev[fieldName] + ' '})); // Add a space
    }
  };

  // --- Form Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch(API_ENDPOINTS.CORE_APPLICATIONS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setErrors({ general: data.error || 'Failed to submit application. Please try again.' });
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Sorry, your browser does not support speech recognition.</span>;
  }

  // --- JSX ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-100"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lead the CPC Team</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the CPC Team as Executive for 2025-26 and help shape the future of college guidance!
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Application Submitted Successfully!</h3>
              <p>Thank you for applying. We'll review your application and get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* --- Basic Information --- */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="form-input" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} disabled className="form-input-disabled" />
                  </div>
                </div>

                {/* College */}
                <div>
                  <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">College *</label>
                  <select id="college" name="college" required value={formData.college} onChange={handleChange} className="form-input">
                    <option value="">Select Your College</option>
                    {colleges.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                
                {/* Year & Branch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Current Year *</label>
                    <select id="year" name="year" required value={formData.year} onChange={handleChange} className="form-input">
                      <option value="">Select Year</option>
                      <option value="First Year">First Year</option>
                      <option value="Second Year">Second Year</option>
                      <option value="Third Year">Third Year</option>
                      <option value="Fourth Year">Fourth Year</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
                    <select id="branch" name="branch" required value={formData.branch} onChange={handleChange} className="form-input">
                      <option value="">Select Your Branch</option>
                      {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* --- Role Preferences --- */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Role Preferences</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Domain(s) * (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {domains.map(domain => (
                      <label key={domain} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-orange-50 cursor-pointer">
                        <input
                          type="checkbox"
                          name="preferredDomain"
                          value={domain}
                          checked={formData.preferredDomain.includes(domain)}
                          onChange={handleDomainChange}
                          className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span>{domain}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* --- Experience & Vision --- */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Experience & Vision</h2>
                
                {/* Generic TextArea with Voice Input */}
                {(['experience', 'futurePlans', 'whyCore'] as const).map((fieldName) => (
                    <div key={fieldName}>
                        <label htmlFor={fieldName} className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                            <span>
                                {fieldName === 'experience' && 'Your Experience with CPC *'}
                                {fieldName === 'futurePlans' && 'Future Plans for CPC *'}
                                {fieldName === 'whyCore' && 'Why Do You Want to be an Executive Member? *'}
                            </span>
                            <button type="button" onClick={() => handleVoiceClick(fieldName)} className={`p-1 rounded-full ${listening && activeVoiceInput === fieldName ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 hover:bg-orange-500 hover:text-white'}`}>
                                {/* Microphone Icon SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm5 2a1 1 0 11-2 0V4a1 1 0 112 0v2zM4 9a1 1 0 00-1 1v1a5 5 0 005 5h1a5 5 0 005-5v-1a1 1 0 10-2 0v1a3 3 0 01-3 3h-1a3 3 0 01-3-3v-1a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            </button>
                        </label>
                        <textarea
                            id={fieldName}
                            name={fieldName}
                            required
                            value={formData[fieldName]}
                            onChange={handleChange}
                            rows={4}
                            className="form-textarea"
                            placeholder={
                                fieldName === 'experience' ? "Share your experience as a Mentor or College Head..." :
                                fieldName === 'futurePlans' ? "What are your plans and ideas for CPC's future?" :
                                "Tell us why you want to join the core team..."
                            }
                        />
                    </div>
                ))}
              </div>

              {/* --- Submission --- */}
              <div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4 text-lg">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : 'Submit Application'}
                </button>
              </div>

              {errors.general && (
                <div className="text-red-600 text-center">{errors.general}</div>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CoreApplicationPage;