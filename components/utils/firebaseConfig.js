// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8dK-DWDj5A0uMhh4gCHz9GGd_-x6iLX0",
  authDomain: "chibi-coin.firebaseapp.com",
  projectId: "chibi-coin",
  storageBucket: "chibi-coin.firebasestorage.app",
  messagingSenderId: "949425044728",
  appId: "1:949425044728:web:44c400657e18b529224f0d",
  measurementId: "G-H5NRQEN4NY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;