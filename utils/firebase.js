// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAX7C6igl0Q2qnC1WoypLFhwSqBqmA4ayU",
    authDomain: "appdistributor-dbe33.firebaseapp.com",
    projectId: "appdistributor-dbe33",
    storageBucket: "appdistributor-dbe33.firebasestorage.app",
    messagingSenderId: "667855388374",
    appId: "1:667855388374:web:67221783392c6afcee5377",
    measurementId: "G-D98G44ZKZ1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)