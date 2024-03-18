

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZuSVFk7El_BhVFd2m5wk-y83JnXozVy0",
  authDomain: "learn-authentication-3ea43.firebaseapp.com",
  projectId: "learn-authentication-3ea43",
  storageBucket: "learn-authentication-3ea43.appspot.com",
  messagingSenderId: "208234355541",
  appId: "1:208234355541:web:c5654546fbd9630f5aaddc",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get the Auth service for the Firebase app
const auth = getAuth();

// Export the initialized Firebase app and Auth service
export { app, auth };
