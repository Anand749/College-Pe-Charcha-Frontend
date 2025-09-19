import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyChIvc7fpy6rw0eaR2O8DzbFKZgnaPqtUc",
  authDomain: "college-pe-charcha.firebaseapp.com",
  projectId: "college-pe-charcha",
  storageBucket: "college-pe-charcha.firebasestorage.app",
  messagingSenderId: "50561120994",
  appId: "1:50561120994:web:d7d4f37f65fc3b7ad0bcbb",
  measurementId: "G-8P5238151P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider with additional options
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});

// Add OAuth scopes for better user data access
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');

export { analytics };