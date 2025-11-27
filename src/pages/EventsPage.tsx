import React, { useState } from 'react';
import { Calendar, Clock, Users, ExternalLink, MapPin } from 'lucide-react';
import Barclays from '../assets/Barclays_1.png';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'Expert Session' | 'Workshop' | 'Session' | 'Webinar';
  speaker: string;
  company?: string;
  image: string;
  lumaLink: string;
  isUpcoming: boolean;
}

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const events: Event[] = [
    {
      id: '1',
      title: 'Breaking into Tech: A Software Engineer\'s Journey',
      description: 'Learn from a Google software engineer about career paths, interview preparation, and what it takes to succeed in top tech companies.',
      date: '2024-02-25',
      time: '7:00 PM IST',
      type: 'Expert Session',
      speaker: 'Rajesh Kumar',
      company: 'Google',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=400',
      lumaLink: 'https://lu.ma/tech-career-session',
      isUpcoming: true
    },
 
   {
  "id": "4",
  "title": "Vision To Visionaries - Barclays",
  "description": "Exclusive session with Vaishnav Bhor (Barclays) where you’ll learn skills for success, balancing academics, coding, insider placement tips, and more.",
  "date": "2025-08-21",
  "time": "7:00 PM IST",
  "type": "Expert Session",
  "speaker": "Vaishnav Bhor",
  "company": "Barclays",
  "image": Barclays,
  "lumaLink": "https://lu.ma/m0lzwsvg",
  "isUpcoming": false
},
    {
  id: '5',
  title: 'SPIT Mumbai: Reality of Placements',
  description: 'A candid student review on placements, recruitment trends, and the current scenario at SPIT Mumbai.',
  date: '2025-07-12', // adjust if there's an actual release or event date
  time: '7:00 PM IST', // you can customize or omit if not time-bound
  type: 'Session',    // 'Expert Session' or 'Webinar' depending on style
  speaker: 'Harsh Patil',
  company: 'SPIT',
  image: 'https://i.ytimg.com/vi/yvwO-e_lt1w/maxresdefault.jpg', // Poster image from the video
  lumaLink: 'https://www.youtube.com/watch?v=yvwO-e_lt1w',      // Direct link to the video
  isUpcoming: false  // Set to false if it's already available as a recording
},
{
  id: '6',
  title: "VIT Pune: Honest Review – Intake Vs Placement",
  description: "A detailed student perspective on admission intake and placement trends at VIT Pune.",
  date: "2025-07-01", // or omit if not time-bound
  time: "7:00 PM IST",
  type: "Session",
  speaker: "Venugopal Baheti",
  company: "VIT",
  image: "https://i.ytimg.com/vi/h2SuxMpibyU/maxresdefault.jpg",
  lumaLink: "https://www.youtube.com/watch?v=h2SuxMpibyU",
  isUpcoming: false
},
{
  id: '7',
  title: "Everything about Cummins College of Engineering, Pune",
  date: "2025-06-27", // or omit if not time-bound
  time: "7:00 PM IST",
  type: "Session",
  speaker: "Samiksha",
  company: "CUMMINS",
  image: "https://i.ytimg.com/vi/eQJDpP8K3_0/maxresdefault.jpg",
  lumaLink: "https://www.youtube.com/watch?v=eQJDpP8K3_0",
  isUpcoming: false,
  description: "Insights into placement trends, career opportunities, and student experiences."

}
,
{
  id: '8',
  title: "Everything about VJTI Mumbai- Honest Review",
  description: "Detailed discussion on placements, career prospects, and growth opportunities at VJTI Mumbai",
  date: "2025-06-27", // or omit if not time-bound
  time: "7:00 PM IST",
  type: "Session",
  speaker: "Yash Bhate",
  company: "VJTI",
  image: "https://i.ytimg.com/vi/czYCooJeciE/maxresdefault.jpg",
  lumaLink: "https://www.youtube.com/watch?v=czYCooJeciE",
  isUpcoming: false
}
,
{
  id: '9',
  title: "VIT CS vs PICT ENTC",
  description: "Comparative analysis of VIT Pune Computer Science and PICT Electronics & Telecommunication, covering academics, placements, and campus life to help students decide wisely.",

  date: "2025-06-27", // or omit if not time-bound
  time: "7:00 PM IST",
  type: "Session",
  speaker: "Pranav,Jay,Anuraj",
  company: "PICT",
  image: "https://i.ytimg.com/vi/vNy4opIcWJU/maxresdefault.jpg",
  lumaLink: "https://www.youtube.com/watch?v=vNy4opIcWJU",
  isUpcoming: false
}
  
  ];

  const upcomingEvents = events.filter(event => event.isUpcoming);
  const pastEvents = events.filter(event => !event.isUpcoming);
  const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Events & Expert Sessions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join exclusive sessions with industry experts, successful professionals, and gain insights 
            that can shape your career journey.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'upcoming' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'past' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'Expert Session' ? 'bg-orange-100 text-orange-800' :
                    event.type === 'Workshop' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
                {!event.isUpcoming && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.speaker}</span>
                    {event.company && (
                      <span className="text-orange-600 ml-1">@ {event.company}</span>
                    )}
                  </div>
                </div>
                
                <a
                  href={event.lumaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    event.isUpcoming 
                      ? 'bg-orange-600 text-white hover:bg-orange-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {event.isUpcoming ? 'Register Now' : 'View Details'}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {displayEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {activeTab} events
            </h3>
            <p className="text-gray-600">
              {activeTab === 'upcoming' 
                ? 'Stay tuned for exciting upcoming sessions!' 
                : 'Check back later for past event recordings.'}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl shadow-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to Host an Event?
          </h2>
          <p className="text-lg mb-6 text-orange-100">
            Are you an industry expert or successful professional? Share your knowledge with aspiring students.
          </p>
                     <Link
             to="/contact"
             className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 inline-flex items-center"
           >
            <Calendar className="h-5 w-5 mr-2" />
            Partner With Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;