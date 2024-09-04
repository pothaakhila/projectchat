// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAELcIPLY3yCmmjBDas1CW0SXeDrKxJXvY",
  authDomain: "chat-9f730.firebaseapp.com",
  projectId: "chat-9f730",
  storageBucket: "chat-9f730.appspot.com",
  messagingSenderId: "982516536030",
  appId: "1:982516536030:web:0dfd7956ced230a68da84f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
