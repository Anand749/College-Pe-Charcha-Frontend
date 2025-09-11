import arnav from '../assets/core/arnav.jpg';
import vedanti from '../assets/core/vedanti.jpg';
import samarth from '../assets/core/Samarth Dhagate.jpg';
import anand from '../assets/core/anand.jpg';
import hardik from '../assets/core/hardik.jpg';
import devesh from '../assets/core/devesh.jpg';
import jiya from '../assets/core/jiya.jpg';
///heads
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

//mentors
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




export interface College {
  id: string;
  name: string;
  fullName: string;
  location: string;
  established: number;
  image: string;
  description: string;
  highlights: string[];
  pros: string[];
  cons: string[];
  whatsappLink: string;
  mentors: Mentor[];
}

export interface Mentor {
  id: string;
  name: string;
  branch: string;
  year: string;
  photo: string;
  linkedin?: string;
  instagram?: string;
}

export const colleges: College[] = [
  {
    id: 'coep',
    name: 'COEP',
    fullName: 'College of Engineering Pune',
    location: 'Pune',
    established: 1854,
    image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
    description: 'One of India\'s oldest and most prestigious engineering colleges, known for its rich heritage and excellent placement records.',
    highlights: ['Top placement records', 'Strong alumni network', 'Research excellence', 'Historic campus'],
    pros: ['Excellent faculty', 'Strong industry connections', 'Beautiful campus', 'Rich legacy'],
    cons: ['High competition', 'Limited seats', 'Strict academic environment'],
    whatsappLink: 'https://chat.whatsapp.com/KRwgjOcjeVX7hD24FTbJmK?mode=ems_copy_c',
    mentors: []
    
    
  },
  {
    id: 'pict',
    name: 'PICT',
    fullName: 'Pune Institute of Computer Technology',
    location: 'Pune',
    established: 1983,
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?w=800',
    description: 'Premier institute known for excellence in computer science and IT education with outstanding placement records.',
    highlights: ['Top IT placements', 'Industry partnerships', 'Modern infrastructure', 'Innovation hub'],
    pros: ['Excellent IT placements', 'Modern labs', 'Industry exposure', 'Active student community'],
    cons: ['Limited branches', 'High fees', 'Competitive environment'],
    whatsappLink: 'https://chat.whatsapp.com/L77GRbsRTecJkb0ByBnPiE?mode=ems_copy_c',
    mentors: [
      {
        id: '1',
        name: 'Pranav Gawand',
        branch: 'Computer Engineering',
        year: 'Third Year',
        photo: pranav,
         
      },
      {
        id: '2',
        name: 'Siddhant Rajput',
        branch: 'Information Technology',
        year: 'Second Year',
        photo: siddant,
      },
      {
        id: '3',
        name: 'Anuraj Jagtap',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: anuraj,
      },
      {
        id: '4',
        name: 'Jay Matere',
        branch: 'ECE',
        year: 'Second Year',
        photo: jay,
      },
      {
        id: '5',
        name: 'Mahesh Khose',
        branch: 'Information Technology',
        year: 'Second Year',
        photo: mahesh,
      }
    ]
  },
  {
    id: 'vjti',
    name: 'VJTI',
    fullName: 'Veermata Jijabai Technological Institute',
    location: 'Mumbai',
    established: 1887,
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?w=800',
    description: 'Mumbai\'s premier technological institute with excellent engineering programs and strong industry connections.',
    highlights: ['Mumbai advantage', 'Industry proximity', 'Research opportunities', 'Diverse branches'],
    pros: ['Mumbai location', 'Good placements', 'Diverse opportunities', 'Strong alumni'],
    cons: ['High cost of living', 'Competitive admission', 'Limited campus space'],
    whatsappLink: 'https://chat.whatsapp.com/HQxtnIfFOCTHQojfzcK1jP?mode=ems_copy_c',
    mentors: [
      {
        id: '6',
        name: 'Yash Bhate',
        branch: 'ELectrical Engineering',
        year: 'Second Year',
        photo: yash,
      },
      {
        id: '7',
        name: 'Prathamesh Naik',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: prathamesh,
      },
      {
        id: '8',
        name: 'Aryan Jadhav',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: aryan,
      }
    ]
  },
  {
    id: 'spit',
    name: 'SPIT',
    fullName: 'Sardar Patel Institute of Technology',
    location: 'Mumbai',
    established: 1962,
    image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
    description: 'Well-established engineering institute in Mumbai known for quality education and good placement opportunities.',
    highlights: ['Good placements', 'Mumbai location', 'Industry connections', 'Active student life'],
    pros: ['Mumbai advantage', 'Good faculty', 'Industry exposure', 'Cultural activities'],
    cons: ['High competition', 'Expensive city', 'Limited hostel facilities'],
    whatsappLink: 'https://chat.whatsapp.com/FB84RMgdxlFHRAb3DudWLT?mode=ems_share_c',
    mentors: [
      {
        id: '9',
        name: 'Harsh Patil',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '10',
        name: 'Akshat Patil',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      }
      
    ]
  },
  {
    id: 'walchand',
    name: 'Walchand',
    fullName: 'Walchand College of Engineering',
    location: 'Sangli',
    established: 1947,
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?w=800',
    description: 'Renowned engineering college in Sangli with excellent academic standards and placement records.',
    highlights: ['Strong academics', 'Good placements', 'Affordable fees', 'Peaceful environment'],
    pros: ['Quality education', 'Affordable', 'Good faculty', 'Less crowded'],
    cons: ['Remote location', 'Limited city opportunities', 'Fewer companies visit'],
    whatsappLink: 'https://chat.whatsapp.com/KB80VEFm2VdCqv6l36ofNT?mode=ems_copy_c',
    mentors: [
      {
        id: '11',
        name: 'Udyaraj',
        branch: 'ELectrical Engineering',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '12',
        name: 'Pratik Yelmewad',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      }
      
    ]
  },
  {
    id: 'cummins',
    name: 'Cummins',
    fullName: 'Cummins College of Engineering for Women',
    location: 'Pune',
    established: 1990,
    image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
    description: 'Premier women\'s engineering college in Pune with excellent academic standards and empowering environment.',
    highlights: ['Women empowerment', 'Quality education', 'Good placements', 'Supportive environment'],
    pros: ['Women-focused', 'Good faculty', 'Pune location', 'Safe environment'],
    cons: ['Only for women', 'Limited diversity', 'Competitive admission'],
    whatsappLink: 'https://chat.whatsapp.com/BiYba2XkGBw6ax5Abwpo1N?mode=ems_copy_c',
    mentors: [
      {
        id: '13',
        name: 'Samiksha Magdum',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: samiksha,
      },
      {
        id: '14',
        name: 'Janhavi Deshpande',
        branch: 'ENTC',
        year: 'Second Year',
        photo: janhavi,
      },
      {
        id: '15',
        name: 'Gargi Mukkawar',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: gargi,
      },
      {
        id: '16',
        name: 'Purva Kavathekar',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: purva,
      }
    ]
  },
  {
    id: 'vit',
    name: 'VIT',
    fullName: 'Vishwakarma Institute of Technology',
    location: 'Pune',
    established: 1983,
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?w=800',
    description: 'Leading private engineering institute in Pune known for its modern curriculum and industry-focused education.',
    highlights: ['Modern curriculum', 'Industry partnerships', 'Good infrastructure', 'Innovation focus'],
    pros: ['Modern facilities', 'Industry exposure', 'Good placements', 'Active campus life'],
    cons: ['High fees', 'Competitive environment', 'Large batch size'],
    whatsappLink: 'https://chat.whatsapp.com/E6S01xdg1AuDURz9fbyeV8?mode=ems_copy_c',
    mentors: [
      {
        id: '17',
        name: 'Anand Chapke',
        branch: 'Information Technology',
        year: 'Third Year',
        photo: anand,
      },
      {
        id: '18',
        name: 'Vedanti Raut',
        branch: 'Computer Engineering-AI',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '19',
        name: 'Samarth Dhagate',
        branch: 'Information Technology',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '20',
        name: 'Arnav Mahajan',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '21',
        name: 'Hardik Rokhde',
        branch: 'Computer Engineering-AIDS',
        year: 'Third year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '22',
        name: 'Devesh Nhalde',
        branch: 'Information Technology',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=200'
      },
      {
        id: '23',
        name: 'Pragati Rakhunde',
        branch: 'Computer Engineering-AI',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '24',
        name: 'Adinath Dound',
        branch: 'Information Technology',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '25',
        name: 'Arya Kale',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '26',
        name: 'Ruchi Hande',
        branch: 'Information Technology',
        year: 'Second year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '27',
        name: 'Atharv',
        branch: 'Computer Engineering-AI',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '28',
        name: 'Pratham Dedgaonkar',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '29',
        name: 'Shreeharsh Omase',
        branch: 'Mechcanical Engineering',
        year: 'Second year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      }
    ]
  },
  {
    id: 'dypit',
    name: 'DY Patil',
    fullName: 'Dr. D. Y. Patil Institute of Technology',
    location: 'Pune',
    established: 1998,
    image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
    description: 'Modern engineering institute with state-of-the-art facilities and strong industry connections.',
    highlights: ['Modern infrastructure', 'Industry connections', 'Research focus', 'International exposure'],
    pros: ['Modern facilities', 'Good faculty', 'Industry exposure', 'International programs'],
    cons: ['High fees', 'Newer institute', 'Limited legacy'],
    whatsappLink: 'https://chat.whatsapp.com/JaiqCJKk4EAKNjbeA9GD20?mode=ems_copy_c',
    mentors: [
      {
        id: '30',
        name: 'Vedant Ingle',
        branch: 'ELectrical Engineering',
        year: 'Third Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      }
      
    ]
  },
  {
    id: 'pccoe',
    name: 'PCCOE',
    fullName: 'Pimpri Chinchwad College of Engineering',
    location: 'Pune',
    established: 1999,
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?w=800',
    description: 'Well-established engineering college in Pimpri Chinchwad with good academic standards and placement records.',
    highlights: ['Good placements', 'Industry connections', 'Research opportunities', 'Student activities'],
    pros: ['Good faculty', 'Industry exposure', 'Affordable fees', 'Active student life'],
    cons: ['Suburban location', 'Limited brand recognition', 'Competitive environment'],
    whatsappLink: 'https://chat.whatsapp.com/JhY1s9beKDNExTgevoV2Ls?mode=ems_copy_c',
    mentors: [
      {
        id: '31',
        name: 'Aadhya Bhagat',
        branch: 'Computer Engineering',
        year: 'Third Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '32',
        name: 'Sakshi Patil',
        branch: 'Computer Engineering',
        year: 'Third Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '33',
        name: 'Siddhesh Sarphale',
        branch: 'Computer Engineering',
        year: 'Third',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      },
      {
        id: '34',
        name: 'Ishwar Sonawane',
        branch: 'Computer Engineering',
        year: 'Third Year',
        photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?w=200'
      }
    ]
  },
  {
  id: 'jspm',
  name: 'JSPM',
  fullName: 'Jayawant Shikshan Prasarak Mandal',
  location: 'Pune',
  established: 1999,
  image: 'https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?w=800',
  description: 'Group of educational institutions in Pune, known for engineering and management programs with decent placement opportunities.',
  highlights: ['Multiple campuses', 'Affordable fees', 'Growing placement opportunities', 'Diverse programs'],
  pros: ['Affordable education', 'Good faculty-student ratio', 'Wide range of branches', 'Decent placements'],
  cons: ['Newer institute', 'Average infrastructure at some campuses', 'Brand recognition still growing'],
  whatsappLink: 'https://chat.whatsapp.com/FakeLinkForJSPM',
  mentors: [
    {
      id: '35',
      name: 'Aditya Patel',
      branch: 'Computer Engineering',
      year: 'Second Year',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=200'
    },
    {
      id: '36',
      name: 'Avdhoot Patankar',
      branch: 'Computer Engineering',
      year: 'Second Year',
      photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=200'
    }
  ]
},
{
  id: 'scoe',
  name: 'SCOE',
  fullName: 'Sinhgad College of Engineering',
  location: 'Pune',
  established: 1996,
  image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?w=800',
  description: 'Large private engineering institute in Pune under Sinhgad Institutes, known for its lush campus and diverse student activities.',
  highlights: ['Large campus', 'Many branches', 'Cultural festivals', 'Good environment'],
  pros: ['Big campus life', 'Active cultural fests', 'Wide variety of courses', 'Good faculty in core branches'],
  cons: ['Average placements compared to tier-1', 'Large batch sizes', 'Located far from main city'],
  whatsappLink: 'https://chat.whatsapp.com/FakeLinkForSCOE',
  mentors: [
      // {
      //   id: '37',
      //   name: 'Rohan Kulkarni',
      //   branch: 'Mechanical Engineering',
      //   year: 'Third Year',
      //   photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=200'
      // },
      // {
      //   id: '38',
      //   name: 'Sneha Patil',
      //   branch: 'Computer Engineering',
      //   year: 'Second Year',
      //   photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=200'
      // }
  ]
},
{
  id: 'djsce',
  name: 'DJ Sanghvi',
  fullName: 'Dwarkadas J. Sanghvi College of Engineering',
  location: 'Mumbai',
  established: 1994,
  image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?w=800',
  description: 'One of the top private engineering colleges in Mumbai, popular for CS/IT branches and strong placement opportunities.',
  highlights: ['Mumbai advantage', 'Great IT placements', 'Modern infrastructure', 'NAAC accreditation'],
  pros: ['Strong placement record', 'Modern labs', 'Prime location in Mumbai', 'Active student life'],
  cons: ['High fees', 'Limited campus size', 'High competition for CS/IT'],
  whatsappLink: 'https://chat.whatsapp.com/FakeLinkForDJSanghvi',
  mentors: [
    // {
    //   id: '39',
    //   name: 'Aarav Mehta',
    //   branch: 'Computer Engineering',
    //   year: 'Third Year',
    //   photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=200'
    // },
    // {
    //   id: '40',
    //   name: 'Riya Shah',
    //   branch: 'Information Technology',
    //   year: 'Second Year',
    //   photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=200'
    // }
  ]
},

  
  
  
];

export const getCollegeByName = (collegeName: string): College | undefined => {
  return colleges.find(
    (college) =>
      college.id.toLowerCase() === collegeName.toLowerCase() ||
      college.name.toLowerCase() === collegeName.toLowerCase() ||
      college.fullName.toLowerCase() === collegeName.toLowerCase()
  );
};