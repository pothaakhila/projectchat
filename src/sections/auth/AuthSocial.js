// @mui
/*
import { Divider, IconButton, Stack } from '@mui/material';
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react';

// ----------------------------------------------------------------------

export default function AuthSocial() {


  const handleGoogleLogin = async () => {

  };

  const handleGithubLogin = async () => {
    
  };

  const handleTwitterLogin = async () => {
    
  };

  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={handleGoogleLogin}>
          <GoogleLogo color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit" onClick={handleGithubLogin}>
          <GithubLogo />
        </IconButton>

        <IconButton onClick={handleTwitterLogin}>
          <TwitterLogo color="#1C9CEA" />
        </IconButton>
      </Stack>
    </div>
  );
}
*/

// src/components/AuthSocial.js
import React from 'react';
import { GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Adjust this path if necessary
import { Divider, IconButton, Stack } from '@mui/material';
import { GoogleLogo, GithubLogo, TwitterLogo } from 'phosphor-react';

const AuthSocial = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      navigate('/app'); // Navigate to the app after successful login
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with GitHub:', result.user);
      navigate('/app'); // Navigate to the app after successful login
    } catch (error) {
      console.error('Error signing in with GitHub:', error.message);
    }
  };

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Twitter:', result.user);
      navigate('/app'); // Navigate to the app after successful login
    } catch (error) {
      console.error('Error signing in with Twitter:', error.message);
    }
  };

  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={handleGoogleLogin}>
          <GoogleLogo color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit" onClick={handleGithubLogin}>
          <GithubLogo />
        </IconButton>

        <IconButton onClick={handleTwitterLogin}>
          <TwitterLogo color="#1C9CEA" />
        </IconButton>
      </Stack>
    </div>
  );
};

export default AuthSocial;
