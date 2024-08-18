import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBG6jkHMjURZOceLgyG8l8alZIZDlwP4kQ",
    authDomain: "skailama-a07ea.firebaseapp.com",
    projectId: "skailama-a07ea",
    storageBucket: "skailama-a07ea.appspot.com",
    messagingSenderId: "380648473821",
    appId: "1:380648473821:web:e6362704088bc1dbbe4734"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;