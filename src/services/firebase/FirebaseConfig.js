// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtPLyC7LB7qeFsV3F04DR1QCK0c8OY6xA",
  authDomain: "voting-portal1.firebaseapp.com",
  projectId: "voting-portal1",
  storageBucket: "voting-portal1.appspot.com",
  messagingSenderId: "849254894916",
  appId: "1:849254894916:web:658a833a5ea9c46d75db11",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);
export const auth = getAuth(app);
export const firebaseStorage = getStorage(app);
