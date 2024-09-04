
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Correct import path if firebase.js is in src
//import {  FaApple } from 'react-icons/fa'; // Font Awesome icons
//import './AuthPage.css'; // Import the CSS file for styles
import { FcGoogle } from "react-icons/fc";
//import { FaFacebookSquare } from "react-icons/fa";
const AuthPage = () => {
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      navigate('/app');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

 

  return (
    <div className="auth-container">
      <div className="style top"></div>
      <div className="auth-buttons">
        <button onClick={handleSignInWithGoogle} className="google-icon">
         
          <FcGoogle size={24}/>
        </button>
      
      </div>
    
    </div>
  );
};

export default AuthPage;
