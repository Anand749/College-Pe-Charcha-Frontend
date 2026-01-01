import { useState } from 'react';
import { Download, Lock, FileText, Star, Users } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';




interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'College Rankings' | 'Branch Analysis' | 'Career Guidance' | 'Placement Data' | 'Admission Guidance';
  isPremium: boolean;
  price?: number;
  downloads: number | string;
  rating: number;
  previewImage: string;
  lastUpdated: string;
  fileUrl?: string;
}

const ResourcesPage = () => {
  // Fetch resources from API
  const { resources, loading, error, refresh } = useResources();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading resources..." />;
  }

  // Error state
  if (error) {
    return <ErrorDisplay message={error} onRetry={refresh} />;
  }

  const handleDownload = async (resource: Resource) => {
    if (resource.isPremium) {
      setShowModal(true);
      return;
    }

    try {
      if (resource.fileUrl) {
        // Show loading state could be added here if we had a specific state for it
        let downloadUrl = resource.fileUrl;

        // For Cloudinary URLs, ensure we get the file content
        // We do NOT add fl_attachment here because we are fetching the blob directly
        // and we want the raw file content, not a "Content-Disposition" header wrapper
        // which might conflict with fetch/blob creation in some cases.

        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Ensure accurate extension
        let filename = resource.title;
        if (!filename.toLowerCase().endsWith('.pdf')) {
          filename += '.pdf'; // Default to PDF if not specified, or could extract from blob.type
        }

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Download failed:', error);

      // Fallback to simple link if fetch fails (e.g. due to CORS)
      if (resource.fileUrl) {
        window.open(resource.fileUrl, '_blank');
      } else {
        alert('Download failed. Please try again.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const categories = ['All', ...new Set(resources.map(r => r.category))];

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resource Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access curated guides, rankings, and insights to make informed decisions about your engineering career.
            All resources are created by our expert team and updated regularly.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${selectedCategory === category
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={resource.previewImage}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {resource.isPremium && (
                    <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      Premium
                    </div>
                  )}
                  <div className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    {resource.category}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {resource.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    <span>{resource.rating}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Last updated: {formatDate(resource.lastUpdated)}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {resource.isPremium ? (
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{resource.price}
                      </span>
                    ) : (
                      <span className="text-lg font-semibold text-green-600">
                        Free
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDownload(resource)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center ${resource.isPremium
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later for new resources.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl shadow-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Custom Research?
          </h2>
          <p className="text-lg mb-6 text-orange-100">
            Can't find what you're looking for? Our team can create custom reports and analysis based on your specific needs.
          </p>
          <a
            href="mailto:research@collegepecharcha.com"
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 inline-flex items-center"
          >
            <FileText className="h-5 w-5 mr-2" />
            Request Custom Research
          </a>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all animate-fadeIn">
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Premium Resource Access
                </h3>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    Thank you for your interest in our premium resources. This content is currently being processed and will be made available upon request.
                  </p>
                  <div className="space-y-4">
                    <p className="text-gray-700 font-medium">Please contact us through either of these channels:</p>
                    <div className="flex items-center space-x-3 bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">Phone</span>
                        <span className="font-semibold text-orange-600">+91 7499957162</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">Email</span>
                        <span className="font-semibold text-orange-600 break-all">collegepecharcha11@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-orange-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-orange-200 text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;