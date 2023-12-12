// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-edf46.firebaseapp.com",
  projectId: "mern-auth-edf46",
  storageBucket: "mern-auth-edf46.appspot.com",
  messagingSenderId: "567590532718",
  appId: "1:567590532718:web:367b4494009cc1ce8ad87f",
  measurementId: "G-QWR8176RP9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
