// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Firebase configuration from user's project
const firebaseConfig = {
  apiKey: "AIzaSyCp_2LPB3XPNDzwJIGbKXcOu0D5DJfLEFE",
  authDomain: "verki-app.firebaseapp.com",
  projectId: "verki-app",
  storageBucket: "verki-app.firebasestorage.app",
  messagingSenderId: "950067899509",
  appId: "1:950067899509:web:0c67fbd26b1e1b6da93cb8"
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