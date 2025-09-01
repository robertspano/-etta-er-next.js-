// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Firebase configuration from user's project
const firebaseConfig = {
  apiKey: "AIzaSyBBLfpq2jGHRcmMNZX567W84-aivG5ruUE",
  authDomain: "verki-login.firebaseapp.com",
  projectId: "verki-login",
  storageBucket: "verki-login.firebasestorage.app",
  messagingSenderId: "442656367557",
  appId: "1:442656367557:web:87ac4d28252159a6e8a1ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Enable debug logging for Firebase Auth (helpful for development)
if (typeof window !== 'undefined') {
  auth.settings.appVerificationDisabledForTesting = false;
}

// Export Firebase services
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
export default app;