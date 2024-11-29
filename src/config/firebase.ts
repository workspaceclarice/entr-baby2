import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider } from '@firebase/auth';
import { getAnalytics } from '@firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKdqYlC2SjZNyjEKyymGZd5va-OiiBwpU",
  authDomain: "entr-baby2.firebaseapp.com",
  projectId: "entr-baby2",
  storageBucket: "entr-baby2.firebasestorage.app",
  messagingSenderId: "446412574463",
  appId: "1:446412574463:web:8f757cc224f3be33e906ca",
  measurementId: "G-FXDHK3Q7BZ"
};

// Initialize Firebase
console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);

// Initialize services
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics failed to initialize:', error);
  }
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

console.log("Firebase initialized successfully");

// Export initialized instances
export { auth, googleProvider, analytics };
export default app; 