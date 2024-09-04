import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Switch, Menu, MenuItem, Paper, IconButton } from '@mui/material';
import { ArrowDropDown, Close } from '@mui/icons-material';

const PrivacyDetails = ({ open, handleClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Everyone');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    setAnchorEl(null); // Close the menu after selection
  };

  const openMenu = Boolean(anchorEl);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3, // Increased shadow for better visibility
        width: 400,  // Adjust width as needed
        maxHeight: '80vh', // Ensure the paper doesn't exceed viewport height
        overflowY: 'auto', // Allow scrolling if content overflows
        position: 'fixed', // Fix position to ensure it stays in place
        top: '10%', // Adjust the vertical position
        right: '45%', // Adjust the horizontal position
        zIndex: 1300, // Ensure it's above other content
      }}
    >
      {/* Close Icon */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'text.secondary',
        }}
      >
        <Close />
      </IconButton>

      <Typography variant="h6">Privacy Settings</Typography>
      <Box mt={2}>
        <Stack spacing={3}>
          {/* Profile Photo Privacy */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">Profile Photo</Typography>
            <Button
              aria-controls="profile-photo-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ArrowDropDown />}
            >
              {selectedOption}
            </Button>
            <Menu
              id="profile-photo-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuItemClick('Everyone')}>Everyone</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Selected')}>Selected</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Nobody')}>Nobody</MenuItem>
            </Menu>
          </Stack>

          {/* Last Seen */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">Last Seen</Typography>
            <Switch defaultChecked />
          </Stack>

          {/* Status */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">Status</Typography>
            <Button
              aria-controls="status-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ArrowDropDown />}
            >
              {selectedOption}
            </Button>
            <Menu
              id="status-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuItemClick('Everyone')}>Everyone</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Selected')}>Selected</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Nobody')}>Nobody</MenuItem>
            </Menu>
          </Stack>

          {/* Read Receipts */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">Read Receipts</Typography>
            <Switch defaultChecked />
          </Stack>

          {/* Groups */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">Groups</Typography>
            <Button
              aria-controls="groups-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ArrowDropDown />}
            >
              {selectedOption}
            </Button>
            <Menu
              id="groups-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuItemClick('Everyone')}>Everyone</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Selected')}>Selected</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('Nobody')}>Nobody</MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PrivacyDetails;
