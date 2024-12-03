// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDB8bXdStkiZJ9nSDQAp4mTomsv96M9Eg",
  authDomain: "travel-path-4daca.firebaseapp.com",
  projectId: "travel-path-4daca",
  storageBucket: "travel-path-4daca.firebasestorage.app",
  messagingSenderId: "39059006294",
  appId: "1:39059006294:web:435d3d4484fac3403f2cf7",
  measurementId: "G-0L8EDG0F9T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);