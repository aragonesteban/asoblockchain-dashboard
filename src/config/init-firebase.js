// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO4HXIU6x8S3hzk8-MdeiHA231PwqSwJQ",
  authDomain: "asoblockchain-2022.firebaseapp.com",
  projectId: "asoblockchain-2022",
  storageBucket: "asoblockchain-2022.appspot.com",
  messagingSenderId: "768360640240",
  appId: "1:768360640240:web:84592ce0872dd8f28f1c35",
  measurementId: "G-L9PMPGR866"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const auth = { getAuth, signInWithEmailAndPassword, onAuthStateChanged }