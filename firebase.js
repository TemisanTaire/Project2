// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGlk3MsU-z0Z2wgdI-Ji7Vv-hDwcdRbPU",
  authDomain: "ttpantryapp.firebaseapp.com",
  projectId: "ttpantryapp",
  storageBucket: "ttpantryapp.appspot.com",
  messagingSenderId: "296296083037",
  appId: "1:296296083037:web:ed9b307a9b96d8e95ea7b4",
  measurementId: "G-16L6WZFS21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {app, firestore}
const analytics = getAnalytics(app);