import { useState, useEffect } from 'react';
import { Download, Lock, FileText, Star, Users, Loader2 } from 'lucide-react';
 
import list from '../assets/general/list.png'
import list1 from '../files/top20.pdf'
import list2 from '../files/clist.pdf'
 

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
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  

  // Load resources from backend
  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/resources');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Failed to load resources:', error);
        // Fallback to static data
        setResources([
          {
            id: '1',
            title: 'College Preference List for CAP Rounds',
            description: 'Expertly curated preference list for CAP rounds including top colleges from Mumbai, Pune, and Sangli. Built from seniors\' real experiences, placement insights, and college reviews to help students make the best choice.',
            category: 'Admission Guidance',
            isPremium: true,
            price: 199,
            downloads: '1K+',
            rating: 4.9,
            previewImage: list,
            lastUpdated: '2025-08-10',
            fileUrl: list2
          },
          {
            id: '2',
            title: 'Top 20 Engineering Colleges in Maharashtra',
            description: 'Comprehensive list and analysis of the top 20 engineering colleges in Maharashtra, covering rankings, placements, infrastructure, and student reviews.',
            category: 'College Rankings',
            isPremium: false,
            price: 0,
            downloads: '2.4K+',
            rating: 4.8,
            previewImage: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
            lastUpdated: '2025-07-15',
            fileUrl: list1
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  // Auth and payments removed
  useEffect(() => {
    // no-op
  }, [resources]);

  // Payments removed

  const handleDownload = async (resource: Resource) => {
    console.log('Download clicked for:', resource.title);
    // Direct download
    try {
      if (resource.fileUrl) {
        const link = document.createElement('a');
        link.href = resource.fileUrl;
        link.download = resource.title + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert('Download started! Check your downloads folder.');
      } else {
        alert('File not available yet!');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading resources...</p>
        </div>
      </div>
    );
  }

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
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
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
                    className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center ${
                      resource.isPremium
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
      </div>
    </div>
  );
};

export default ResourcesPage;