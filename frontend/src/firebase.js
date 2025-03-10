import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyDeuftUSYEi3v8FXsi6rFSRc1WetDWCd7I",
    authDomain: "ai-market-place.firebaseapp.com",
    projectId: "ai-market-place",
    storageBucket: "ai-market-place.firebasestorage.app",
    messagingSenderId: "377788128670",
    appId: "1:377788128670:web:4cb83b64075619e1064a8f",
    measurementId: "G-S83QP2RRSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };