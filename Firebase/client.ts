// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDBeatME9X6jKED7E4PHctH7G_IaaldkeM",
    authDomain: "mockmate-b0af3.firebaseapp.com",
    projectId: "mockmate-b0af3",
    storageBucket: "mockmate-b0af3.firebasestorage.app",
    messagingSenderId: "267304899728",
    appId: "1:267304899728:web:5aef9bd47ba18b73de7415",
    measurementId: "G-9393EFDZ29"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);