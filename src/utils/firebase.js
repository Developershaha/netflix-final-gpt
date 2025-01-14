// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnR76MqgSkAOq5c-8TR1yesCOPgB9maVE",
  authDomain: "fir-gpt-neq.firebaseapp.com",
  projectId: "fir-gpt-neq",
  storageBucket: "fir-gpt-neq.firebasestorage.app",
  messagingSenderId: "78653604387",
  appId: "1:78653604387:web:4c9651b6eee49ad61aa796",
  measurementId: "G-EY5LF241SV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
