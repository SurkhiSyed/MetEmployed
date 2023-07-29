// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlaP99DZvai6deR0mGtUMrMWMnW59FiI0",
  authDomain: "metemployed-c6ae2.firebaseapp.com",
  projectId: "metemployed-c6ae2",
  storageBucket: "metemployed-c6ae2.appspot.com",
  messagingSenderId: "1011610807053",
  appId: "1:1011610807053:web:2baf19cbdcb72df81e9e44",
  measurementId: "G-RDW5MNXEST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();