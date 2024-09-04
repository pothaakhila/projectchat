import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Avatar } from '@mui/material';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth); // Use `auth` slice if user data is stored there

  if (!user) {
    return <div>No user data available. Please log in.</div>;
  }

  return (
    <Box>
      <Typography variant="h4">Profile</Typography>
      <Box display="flex" alignItems="center">
        <Avatar
          src={user.avatar || '/default-avatar.png'} // Fallback to default image if no avatar is available
          alt={user.firstName}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography variant="h6"><strong>Name:</strong> {user.firstName}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="body1"><strong>About:</strong> {user.about}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
