// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQwNsNHmrVA58hJ-rqKCM9vr57FIjUPOE",
  authDomain: "urbanpulse-cb977.firebaseapp.com",
  projectId: "urbanpulse-cb977",
  storageBucket: "urbanpulse-cb977.firebasestorage.app",
  messagingSenderId: "26612625476",
  appId: "1:26612625476:web:7aa38a5f992bdd47af8c11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);