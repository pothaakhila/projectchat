import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const ProfileCard = ({ onClick }) => {
  const { user } = useSelector((state) => state.app);

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginBottom: 2,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        }
      }}
    >
      <Avatar
        src={user?.avatar || '/assets/images/image.png'}
        alt={user?.firstName}
        sx={{ width: 56, height: 56, marginRight: 2 }}
      />
      <Box>
        <Typography variant="h6">{user?.firstName || 'User Name'}</Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.email || 'User Email'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileCard;
