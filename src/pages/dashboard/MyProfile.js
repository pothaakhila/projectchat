/*
// src/pages/dashboard/MyProfile.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, IconButton, Stack, Typography, Menu, MenuItem, Divider, Accordion, AccordionSummary, AccordionDetails, List, ListItem, Button, useTheme, Avatar } from '@mui/material';
import { ExpandMore, MoreVert, FileCopy, Image as MuiImage } from '@mui/icons-material';
import { Paperclip, User } from 'phosphor-react';

const UserProfile = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileMenuAnchorEl, setFileMenuAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState('/static/media/avatar-1.3921191a8acf79d3e907.jpg');
  const [newProfileImage, setNewProfileImage] = useState(null);

  // Fetch user data from Redux
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (user && user.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleFileMenuOpen = (event) => {
    setFileMenuAnchorEl(event.currentTarget);
  };

  const handleFileMenuClose = () => {
    setFileMenuAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    if (newProfileImage) {
      setProfileImage(URL.createObjectURL(newProfileImage));
      setNewProfileImage(null);
    }
    setEditMode(false);
  };

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      setNewProfileImage(event.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: 360,
        backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: '100%', overflowY: 'auto' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">My Profile</Typography>
          <IconButton onClick={handleDropdownOpen} size="large">
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            <MenuItem onClick={handleDropdownClose}>Edit</MenuItem>
            <MenuItem onClick={handleDropdownClose}>Action</MenuItem>
            <Divider />
            <MenuItem onClick={handleDropdownClose}>Another action</MenuItem>
          </Menu>
        </Stack>

        <Box sx={{ textAlign: 'center', p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ mb: 2, position: 'relative', display: 'inline-flex' }}>
            <Avatar
              src={profileImage}
              alt="Profile"
              sx={{ width: 100, height: 100, borderRadius: '50%' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: 'green',
                border: `2px solid ${theme.palette.background.paper}`,
              }}
            />
          </Box>
          {editMode ? (
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
              <Button variant="contained" onClick={handleSaveClick}>Save</Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleEditClick}>Edit</Button>
            </Stack>
          )}
          <Typography variant="h5" noWrap>{user ? user.name : 'Name'}</Typography>
          <Typography color="textSecondary" noWrap>
            <span style={{ color: 'green', fontSize: '0.8rem', marginRight: '5px' }}>•</span>
            {user ? user.status : 'Status'}
          </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography color="textSecondary" paragraph>
            {user ? user.bio : 'Bio'}
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">
                <User size={20} sx={{ marginRight: '8px' }} />
                About
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography color="textSecondary">Name</Typography>
                <Typography variant="body1">{user ? user.name : 'Name'}</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>Email</Typography>
                <Typography variant="body1">{user ? user.email : 'Email'}</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>Time</Typography>
                <Typography variant="body1">{user ? user.time : 'Time'}</Typography>
                <Typography color="textSecondary" sx={{ mt: 2 }}>Location</Typography>
                <Typography variant="body1">{user ? user.location : 'Location'}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">
                <Paperclip size={20} sx={{ marginRight: '8px' }} />
                Attached Files
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {/* Render attached files here *//*}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Stack>
    </Box>
  );
};

const FileCard = ({ theme, fileName, fileSize, fileType, onMenuClick }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
    onMenuClick(event);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const icon = fileType === 'image' ? <MuiImage /> : <FileCopy />;

  return (
    <ListItem sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, mb: 2, borderRadius: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main' }}>
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" noWrap>{fileName}</Typography>
          <Typography variant="body2" color="textSecondary">{fileSize}</Typography>
        </Box>
        <IconButton onClick={handleMenuOpen} size="large">
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Download</MenuItem>
          <MenuItem onClick={handleMenuClose}>Action</MenuItem>
          <MenuItem onClick={handleMenuClose}>Another Action</MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        </Menu>
      </Box>
    </ListItem>
  );
};

export default UserProfile;
*/

