import React from 'react';
import { Download, Calendar, BookOpen, Users, TrendingUp, FileText } from 'lucide-react';

const DashboardPage = () => {
  const user = { name: 'User' };
  const downloadStats = { totalDownloads: 0, premiumDownloads: 0, freeDownloads: 0, totalSpent: 0 };
  const paymentHistory: any[] = [];

  const mockPredictions = [
    { id: '1', date: '2024-01-15', collegeName: 'COEP Pune', branch: 'Computer Engineering', status: 'Purchased' },
    { id: '2', date: '2024-01-10', collegeName: 'PICT Pune', branch: 'Information Technology', status: 'Purchased' }
  ];

  const mockEvents = [
    { id: '1', title: 'COEP Placement Preparation', date: '2024-02-20', status: 'Registered' },
    { id: '2', title: 'Tech Career Guidance', date: '2024-02-15', status: 'Attended' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Here's your personalized dashboard with all your activities and progress.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Predictions</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Events Attended</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resources Downloaded</p>
                <p className="text-2xl font-bold text-gray-900">
                  {downloadStats.totalDownloads}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {`₹${downloadStats.totalSpent}`}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mentors Connected</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Downloads */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Download className="h-6 w-6 mr-2 text-green-600" />
              Recent Downloads
            </h2>
            
            <div className="space-y-4">
              {paymentHistory.length > 0 ? (
                paymentHistory.slice(0, 5).map((payment) => (
                  <div key={payment._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{payment.resourceTitle}</h3>
                        <p className="text-gray-600 text-sm">₹{payment.amount}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                        {payment.status === 'completed' && (
                          <button className="text-green-600 hover:text-green-700">
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No downloads yet. Check out our resources!</p>
                </div>
              )}
            </div>
          </div>

          {/* College Predictions History */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-orange-600" />
              College Predictions
            </h2>
            
            <div className="space-y-4">
              {mockPredictions.map((prediction) => (
                <div key={prediction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{prediction.collegeName}</h3>
                      <p className="text-gray-600 text-sm">{prediction.branch}</p>
                      <p className="text-gray-500 text-xs mt-1">Generated on {prediction.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        prediction.status === 'Purchased' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {prediction.status}
                      </span>
                      <button className="text-orange-600 hover:text-orange-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {mockPredictions.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No predictions yet. Try our AI College Predictor!</p>
                </div>
              )}
            </div>
          </div>

          {/* Events History */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-600" />
              Events & Sessions
            </h2>
            
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-gray-600 text-sm">{event.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'Attended' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
              
              {mockEvents.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No events attended yet. Check out our upcoming sessions!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/predictor"
              className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
            >
              <TrendingUp className="h-8 w-8 text-orange-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600">Get New Prediction</h3>
                <p className="text-gray-600 text-sm">Use our AI College Predictor</p>
              </div>
            </a>
            
            <a
              href="/events"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <Calendar className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Browse Events</h3>
                <p className="text-gray-600 text-sm">Join expert sessions</p>
              </div>
            </a>
            
            <a
              href="/colleges"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <Users className="h-8 w-8 text-purple-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">Find Mentors</h3>
                <p className="text-gray-600 text-sm">Connect with seniors</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;