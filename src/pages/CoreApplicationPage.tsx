import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/useAuth';
import { API_ENDPOINTS } from '../config/api.config';
import Team from '../assets/general/teamstructure.png';

const colleges = [
  'COEP', 'PICT', 'SPIT', 'VJTI', 'CUMMINS', 'DJ-SANGHAVI', 
  'VIT', 'PCCOE', 'DYP', 'WALCHAND', 'JSPM', 'SINHGAD', 
  'AISSMS', 'OTHER'
];

const branches = [
  'CS', 'IT', 'ENTC', 'CS WITH SPEC', 'MECH', 'CIVIL', 
  'INSTRU', 'CHEMICAL'
];

const roles = [
  'Marketing', 'Operations', 'Research', 'Design', 'Content Creation',
  'Social Media', 'Event Management', 'Technical', 'Outreach', 'Finance'
];

const CoreApplicationPage = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    college: '',
    year: '',
    branch: '',
    preferredRoles: [] as string[],
    whatsappNumber: '',
    experience: '',
    futurePlans: '',
    whyCore: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{
    email?: string;
    confirmEmail?: string;
    whatsappNumber?: string;
    general?: string;
  }>({});
  


  const validateForm = () => {
    const newErrors: {
      whatsappNumber?: string;
      general?: string;
    } = {};

    // Validate all required fields
    if (!formData.name.trim()) {
      newErrors.general = 'Name is required';
    } else if (!formData.college) {
      newErrors.general = 'College selection is required';
    } else if (!formData.year) {
      newErrors.general = 'Current year is required';
    } else if (!formData.branch) {
      newErrors.general = 'Branch selection is required';
    } else if (formData.preferredRoles.length === 0) {
      newErrors.general = 'Please select at least one preferred role';
    } else if (!formData.whatsappNumber.trim()) {
      newErrors.general = 'WhatsApp number is required';
    } else if (!formData.experience.trim()) {
      newErrors.general = 'Experience field is required';
    } else if (!formData.futurePlans.trim()) {
      newErrors.general = 'Future plans field is required';
    } else if (!formData.whyCore.trim()) {
      newErrors.general = 'Why you want to be a core member is required';
    }

    // Validate WhatsApp number format
    if (formData.whatsappNumber && !/^\d{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'WhatsApp number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    if (name === 'email' || name === 'confirmEmail' || name === 'whatsappNumber') {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleRoleChange = (role: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredRoles: checked 
        ? [...prev.preferredRoles, role]
        : prev.preferredRoles.filter(r => r !== role)
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('Submitting to:', API_ENDPOINTS.CORE_APPLICATIONS);
      console.log('Form data being sent:', JSON.stringify(formData, null, 2));
      const response = await fetch(API_ENDPOINTS.CORE_APPLICATIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response:', { status: response.status, data });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setErrors({ general: data.error || 'Failed to submit application. Please try again.' });
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ 
        general: 'Network error. Please check your connection and try again. ' +
                'Make sure the backend server is running on port 5000.'
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-100"
        >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Executive Team Application</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the CPC Executive Team for 2025-26 and help shape the future of college guidance!
          </p>
        </div>

        {/* Team Hierarchy Section */}
        <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">CPC Team Structure</h2>
          <p className="text-green-700 text-center mb-6">
            Understand the organizational hierarchy and executive roles in CPC
          </p>
          <div className="flex justify-center">
            <img 
              src={Team}  
              alt="CPC Team Hierarchy - Core Team with Operations, Marketing, and Research departments"
              className="max-w-full h-auto rounded-lg shadow-lg border border-green-300"
              style={{ maxHeight: '500px' }}
            />
          </div>
          <div className="mt-4 text-sm text-green-600 text-center">
            <p>As an Executive, you'll lead one of the three main departments: Operations, Marketing, or Research</p>
          </div>
        </div>

        {submitStatus === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Application Submitted Successfully!</h3>
            <p>Thank you for applying to be a part of the CPC Executive Team. We'll review your application and get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address (Verified with Google)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                  College *
                </label>
                <select
                  id="college"
                  name="college"
                  required
                  value={formData.college}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select your college</option>
                  {colleges.map(college => (
                    <option key={college} value={college}>{college}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Year *
                  </label>
                  <select
                    id="year"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                    Branch *
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select your branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Role Preferences */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Role Preferences</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Roles * (Select multiple)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {roles.map(role => (
                    <label key={role} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.preferredRoles.includes(role)}
                        onChange={(e) => handleRoleChange(role, e.target.checked)}
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
              
              <div>
                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  required
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  maxLength={10}
                  className={`form-input w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                    errors.whatsappNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter 10-digit WhatsApp number"
                />
                {errors.whatsappNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>
                )}
              </div>
            </div>

            {/* Experience & Vision */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Experience & Vision</h2>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Experience with CPC *
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  rows={4}
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Share your experience as a Mentor or College Head this year..."
                />
              </div>

              <div>
                <label htmlFor="futurePlans" className="block text-sm font-medium text-gray-700 mb-1">
                  Future Plans for CPC *
                </label>
                <textarea
                  id="futurePlans"
                  name="futurePlans"
                  required
                  value={formData.futurePlans}
                  onChange={handleChange}
                  rows={4}
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="What are your plans and ideas for CPC's future?"
                />
              </div>

              <div>
                <label htmlFor="whyCore" className="block text-sm font-medium text-gray-700 mb-1">
                  Why Do You Want to be an Executive? *
                </label>
                <textarea
                  id="whyCore"
                  name="whyCore"
                  required
                  value={formData.whyCore}
                  onChange={handleChange}
                  rows={4}
                  className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us why you want to join the executive team..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full py-4 px-6 text-white rounded-xl text-lg font-semibold transition-all duration-300 transform ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed scale-95'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Executive Application'
                )}
              </button>
            </div>

            {(submitStatus === 'error' || errors.general) && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                <p className="text-center">
                  {errors.general || 'There was an error submitting your application. Please try again.'}
                </p>
              </div>
            )}
          </form>
        )}
        </motion.div>
      </div>
    </div>
  );
};

export default CoreApplicationPage;