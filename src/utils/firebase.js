// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYWSWB1d_PCnAE40Lmht9EuiDsubAzr_8",
  authDomain: "grocery-a3bc8.firebaseapp.com",
  projectId: "grocery-a3bc8",
  storageBucket: "grocery-a3bc8.firebasestorage.app",
  messagingSenderId: "1029432327315",
  appId: "1:1029432327315:web:d12824ed8dc99992952166",
  measurementId: "G-88XC9NNRWM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
