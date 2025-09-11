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
    description: 'COEP is a prestigious autonomous government engineering institute in Pune renowned for its legacy, academics, and innovation culture.',
    highlights: ['Historic campus', 'Tier-I accreditation ', 'One of India\'s top college', 'Excellent placements'],
    pros: ['Very strong placements', 'Large and well-maintained campus', 'Experienced faculty', 'Strong alumni network'],
    cons: ['High admission cutoffs', 'Heavy academic schedule', 'Higher fees than other government colleges'],
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
    description: 'VJTI is government-aided, autonomous under Mumbai University, and known for academic excellence and strong placements.',
    highlights: ['Historic Legacy & Autonomy', 'Placement Excellence', 'Vibrant Campus & Facilities', 'Alumni & Industry Linkages'],
    pros: ['Excellent Placement Outcomes', 'Rich Legacy & Autonomy', 'Affordability & Support', 'Influential Alumni & Industry Ties'],
    cons: ['Aging Infrastructure', 'Strict Attendance & Grading', 'Hostel & Mess Constraints', 'Highly competitive Admission'],
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
    description: 'SPIT is a premier autonomous tech-focused institute known for its strong academic rigor, vibrant innovation and hackathon culture.',
    highlights: ['Autonomous tech-only institute', 'Strong tech & innovation culture', 'Good alumni network', 'Excellent placements'],
    pros: ['Excellent placements', 'Vibrant campus', 'Good connectivity', 'Research tie-ups'],
    cons: ['Intense academics with strict grading/attendance', 'Expensive city', 'Limited hostel facilities'],
    whatsappLink: 'https://chat.whatsapp.com/FB84RMgdxlFHRAb3DudWLT?mode=ems_share_c',
    mentors: [
      {
        id: '9',
        name: 'Harsh Patil',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: harsh
      },
      {
        id: '10',
        name: 'Akshat Patil',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: akshat
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
    description: 'Walchand College is a prominent autonomous engineering institution located on a sprawling ~90-acre campus in Sangli, Maharashtra.',
    highlights: ['Historic & autonomous legacy', 'Vast and green campus', 'Includes one of Asia’s largest Library ', 'Strong placements'],
    pros: ['Rich history and proud autonomy', 'Expansive, green, well-equipped campus', 'Strong placement records', 'Highly rated'],
    cons: ['Limited international exposure', 'Remote location '],
    whatsappLink: 'https://chat.whatsapp.com/KB80VEFm2VdCqv6l36ofNT?mode=ems_copy_c',
    mentors: [
      {
        id: '11',
        name: 'Udyaraj',
        branch: 'ELectrical Engineering',
        year: 'Second Year',
        photo: udayraj
      },
      {
        id: '12',
        name: 'Darshan Ptil',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: darshan
      },
      {
        id: '13',
        name: 'Pratik Yelmewad',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: pratik
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
    description: 'Cummins College of Engineering for Women, Pune is an autonomous institute.Known for modern infrastructure and excellent placements. ',
    highlights: ['Strong placement records', 'Opportunities for fully funded MS degree ', 'Major recruiters include Microsoft, Goldman Sachs'],
    pros: ['India’s first all-women engineering college', 'Safe and empowering environment.', 'Excellent recruitment', 'Autononous'],
    cons: ['Branch-Wise Placement Gap', 'Limited campus size ', 'Strict Rules & Regulations'],
    whatsappLink: 'https://chat.whatsapp.com/BiYba2XkGBw6ax5Abwpo1N?mode=ems_copy_c',
    mentors: [
      {
        id: '14',
        name: 'Samiksha Magdum',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: samiksha
      },
      {
        id: '15',
        name: 'Janhavi Deshpande',
        branch: 'ENTC',
        year: 'Second Year',
        photo: janhavi
      },
      {
        id: '16',
        name: 'Gargi Mukkawar',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: gargi
      },
      {
        id: '17',
        name: 'Purva Kavathekar',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: purva
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
    description: 'VIT Pune is a top autonomous engineering college in Maharashtra, offering strong academics and industry exposure.',
    highlights: ['Autonomous under SPPU', 'Strong industry exposure & tie-ups', 'Active technical & cultural clubs', 'International collaborations' , 'Good placement record'],
    pros: ['Great exposure & research opportunities', 'Vibrant campus life', 'Strong alumni support', 'Good placements'],
    cons: ['Highly competitive admissions', 'Crowded infrastructure', 'Uneven branch opportunities', 'Strict rules'],
          whatsappLink: 'https://chat.whatsapp.com/E6S01xdg1AuDURz9fbyeV8?mode=ems_copy_c',
    mentors: [
      {
        id: '18',
        name: 'Anand Chapke',
        branch: 'Information Technology',
        year: 'Third Year',
        photo: anand
      },
      {
        id: '19',
        name: 'Vedanti Raut',
        branch: 'Computer Engineering-AI',
        year: 'Second Year',
        photo: vedanti
      },
      {
        id: '20',
        name: 'Samarth Dhagate',
        branch: 'Information Technology',
        year: 'Second Year',
        photo: samarth
      },
      {
        id: '21',
        name: 'Arnav Mahajan',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: arnav 
      },
      {
        id: '22',
        name: 'Hardik Rokhde',
        branch: 'Computer Engineering-AIDS',
        year: 'Third year',
        photo: hardik
      },
      {
        id: '23',
        name: 'Devesh Nhalde',
        branch: 'Information Technology',
        year: 'Second Year',
        photo: devesh
      },
      {
        id: '24',
        name: 'Pragati Rakhunde',
        branch: 'Computer Engineering-AI',
        year: 'Second Year',
        photo: pragati
      },
      {
        id: '25',
        name: 'Adinath Dound',
        branch: 'Information Technology',
        year: 'Second Year',
        photo: adinath
      },
      {
        id: '26',
        name: 'Arya Kale',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: arya
      },
      {
        id: '27',
        name: 'Ruchi Hande',
        branch: 'Information Technology',
        year: 'Second year',
        photo: ruchi
      },
      {
        id: '28',
        name: 'Atharv',
        branch: 'Computer Engineering-AI',
        year: 'Second Year',
        photo: atharv
      },
      {
        id: '29',
        name: 'Pratham Dedgaonkar',
        branch: 'Computer Engineering',
        year: 'Second Year',
        photo: pratham
      },
      {
        id: '30',
        name: 'Shreeharsh Omase',
        branch: 'Mechcanical Engineering',
        year: 'Second year',
        photo: shreeharsh
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
    description: 'Dr. D. Y. Patil Institute of Technology is one of the top engineering college in maharashtra is a premier private engineering college.',
    highlights: ['Good Placement records', 'Internship opportunity', 'Active technical and cultural club ', 'DYPIT-Pimpri has secured MoUs with leading industry', 'Highest package 70 lakhs'],
    pros: ['Faculty is experienced and qualified', 'Strong academic reputation', 'College life is enriched with cultural event,Technical clubs and other activities'],
    cons: ['Limited campus size and space', 'College is strict about academics', 'Attendance is mandatory'],
    whatsappLink: 'https://chat.whatsapp.com/JaiqCJKk4EAKNjbeA9GD20?mode=ems_copy_c',
    mentors: [
      {
        id: '31',
        name: 'Vedant Ingle',
        branch: 'ELectrical Engineering',
        year: 'Third Year',
        photo: vedant
      }
      
    ]
  },
  {
    id: 'pccoe',
    name: 'PCCOE',
    fullName: 'Pimpri Chinchwad College of Engineering',
    location: 'Pune',
    established: 1999,
    image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?w=800',
    description: 'PCCOE is a premier autonomous institute renowned for its strong industry-academia collaboration. Located in Pune, a major educational and automotive hub.',
    highlights: ['Good placements', 'Industry connections', 'Research opportunities', 'Student activities'],
    pros: ['Supports research and innovation', 'Have lot of clubs for learning experiences', 'Organizes many activities throughout  the year'],
    cons: ['Strict about attendance', 'Has college hours of 9-5'],
    whatsappLink: 'https://chat.whatsapp.com/JhY1s9beKDNExTgevoV2Ls?mode=ems_copy_c',
    mentors: [
      {
        id: '32',
        name: 'Aadhya Bhagat',
        branch: 'Computer Engineering',
        year: 'Third Year',
        photo: aadhya
      },
      {
        id: '33',
        name: 'Sakshi Patil',
        branch: 'Computer Engineering',
        year: 'Third Year',
        photo: sakshi
      },
      {
        id: '34',
        name: 'Siddhesh Sarphale',
        branch: 'Computer Engineering',
        year: 'Third',
        photo: siddhesh
      },
      {
        id: '35',
        name: 'Ishwar Sonawane',
        branch: 'Computer Engineering',
        year: 'Third Year',
        photo: ishwar
      },
      {
        id: '36',
        name: 'Tejas Parkar',
        branch: 'Computer Engineering',
        year: 'Third Year',
        photo: tejas
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
  description: 'JSPM holds \'A\' grade accreditation from NAAC and approved by AICTE and UGC, with a strong emphasis on modern, industry-relevant curriculum design.',
  highlights: ['\'A\' grade NAAC accreditation', 'Robust placement', 'Award-winning institute', 'Comprehensive academic offerings '],
  pros: ['Autonomous ', 'NAAC Aaccredited and NBA-accredited programs', 'Recognized as a Nodal Center for Virtual Labs (IIT Bombay)', 'Strong industry collaborations', 'Active student clubs '],
  cons: ['Strict attendance policies', 'Campus infrastructure is functional but not very impressive', 'Accessibility is limited'],
  whatsappLink: 'https://chat.whatsapp.com/FakeLinkForJSPM',
  mentors: [
    {
      id: '37',
      name: 'Aditya Patel',
      branch: 'Computer Engineering',
      year: 'Second Year',
      photo: aditya
    },
    {
      id: '38',
      name: 'Avdhoot Patankar',
      branch: 'Computer Engineering',
      year: 'Second Year',
      photo: avdhoot
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
  description: ' A well-known college under the Sinhgad Institutes umbrella, recognized for its large campus, a wide range of engineering programs.',
  highlights: ['Extensive infrastructure', 'Decent placement record', 'Active campus with numerous clubs and events'],
  pros: ['Excellent infrastructure, including a large library and sports complex', 'On-campus hostel facilities are available', '​Lively atmosphere with various fests and clubs'],
  cons: ['Average salary packages are moderate', 'Limited placements for core engineering branches', 'Some students have reported issues with college administration'],
  whatsappLink: 'https://chat.whatsapp.com/FakeLinkForSCOE',
  mentors: [
      // {
      //   id: '39',
      //   name: 'Rohan Kulkarni',
      //   branch: 'Mechanical Engineering',
      //   year: 'Third Year',
      //   photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=200'
      // },
      // {
      //   id: '40',
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
  description: 'D. J. Sanghvi College of Engineering is a reputed private autonomous institute affiliated to the University of Mumbai and accredited by NAAC and NBA.',
  highlights: ['\'A\' Grade by NAAC and DTE', 'Strong placement record', 'Active student chapters'],
  pros: ['Excellent placements with a high salary package', 'Modern infrastructure with well-equipped labs', 'Highly qualified and experienced faculty', 'Vibrant committee culture with various clubs', 'Prime location in Mumbai'],
  cons: ['Small campus with limited outdoor facilities', 'No on-campus hostel accommodation', 'Strict attendance policy in certain departments', 'Significant number of seats reserved for the Gujarati linguistic minority'],
  whatsappLink: 'https://chat.whatsapp.com/FakeLinkForDJSanghvi',
  mentors: [
    // {
    //   id: '41',
    //   name: 'Aarav Mehta',
    //   branch: 'Computer Engineering',
    //   year: 'Third Year',
    //   photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=200'
    // },
    // {
    //   id: '42',
    //   name: 'Riya Shah',
    //   branch: 'Information Technology',
    //   year: 'Second Year',
    //   photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=200'
    // }
  ]
},

{
  id: 'aissms',
  name: 'AISSMS',
  fullName: 'All India Shri Shivaji Memorial Society',
  location: 'Pune',
  established: 1992,
  image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?w=800',
  description: 'AISSMS College of Engineering is a prominent private engineering college affiliated with Savitribai Phule Pune University.',
  highlights: ['\'A+\' Grade by NAAC', 'Well-equipped labs', 'Decent placements', 'Active student clubs'],
  pros: ['Modern labs, good library', 'Experienced and knowledgeable teachers', 'Decent placement record', 'Active student clubs and a vibrant atmosphere'],
  cons: ['Heavy academic schedule', 'Lack of proper guidance', 'Placement process can be "taxing" for students'],
  whatsappLink: 'https://chat.whatsapp.com/FakeLinkForAISSMS',
  mentors: [
    
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