// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuMgFivABYV7ca6nDodPRa5JhHy-oabHI",
    authDomain: "studycircle-9835f.firebaseapp.com",
    projectId: "studycircle-9835f",
    storageBucket: "studycircle-9835f.firebasestorage.app",
    messagingSenderId: "40835355736",
    appId: "1:40835355736:web:8d62e9e6fd0ffc8668e62d",
    measurementId: "G-C5EY6HRM2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Authentication Logic
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
