import { faker } from '@faker-js/faker';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Badge, Box, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import axios from 'axios'; // Import axios for HTTP requests
import EmojiPicker from 'emoji-picker-react';
import { DotsThree, ImageSquare, MagnifyingGlass, Paperclip, Phone, Smiley, User, VideoCamera } from 'phosphor-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import StartCall from '../../sections/Dashboard/StartCall';
import ActionMenu from './ActionMenu'; // Import the ActionMenu component
import FileCard from './FileCard';
import Message from './Message';
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch } from "react-redux";

// Define the StyledBadge component
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-dot': {
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border:` 1px solid ${theme.palette.success.main}`,
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));



const Index = () => {

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to show/hide the emoji picker
  const [showImageUploader, setShowImageUploader] = useState(false); // State to show/hide the image uploader
  const [message, setMessage] = useState('');
  const [openStartCall, setOpenStartCall] = useState(false); // State to manage StartCall dialog
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // State to manage ActionMenu visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [showSearchBox, setShowSearchBox] = useState(false); // State to show/hide search box
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize navigate

  // Dummy messages for search
  const messages = [
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
  ];

  const headerBackgroundColor = theme.palette.mode === 'dark' ? '#333' : '#F8FAFF';
  const headerBoxShadow = theme.palette.mode === 'dark' ? '0px 0px 2px rgba(255, 255, 255, 0.25)' : '0px 0px 2px rgba(0, 0, 0, 0.25)';

  const footerBackgroundColor = theme.palette.mode === 'dark' ? '#333' : '#F8FAFF';
  const footerBoxShadow = theme.palette.mode === 'dark' ? '0px 0px 2px rgba(255, 255, 255, 0.25)' : '0px 0px 2px rgba(0, 0, 0, 0.25)';

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleImageChange = (event) => {
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setImageFile(URL.createObjectURL(uploadedImage)); // Store the URL of the image
      setShowImageUploader(false); // Hide the image uploader box
    }
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleArchive = () => {
    console.log('Archived');
    handleMenuClose();
  };

  const handleMute = () => {
    console.log('Muted');
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Account deleted');
    handleMenuClose();
  };



  const handleSave = () => {
    if (file) {
      // Logic to save the file (e.g., save to local device or backend)
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
      handleMenuClose();
    }
  };

  const handleCopy = () => {
    if (file) {
      // Copy the file URL to clipboard
      const url = URL.createObjectURL(file);
      navigator.clipboard.writeText(url).then(() => {
        console.log('Copied to clipboard');
        handleMenuClose();
      });
    }
  };

  const handleForward = () => {
    if (file) {
      // Forward the file URL via email
      // Example: Open the user's default mail client with a pre-filled message
      const url = URL.createObjectURL(file);
      window.location.href = `mailto:?subject=Forwarded File&body=Here is the file you requested: ${url}`;
      handleMenuClose();
    }
  };

  const handleDeletes = () => {
    // Logic to delete the account (e.g., send a request to the backend)
    console.log('Account deleted');
    handleMenuClose();
  };

  const handleDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
      handleMenuClose();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleAvatarClick = () => {
    navigate('/contact'); // Navigate to the profile page
  };

  const handlePhoneClick = () => {
    setOpenStartCall(true); // Open StartCall dialog
  };

  const handleVideoClick = () => {
    setOpenStartCall(true); // Open StartCall dialog
  };

  const handleCloseStartCall = () => {
    setOpenStartCall(false); // Close StartCall dialog
  };

  const handleSearchClick = () => {
    setShowSearchBox(prev => !prev); // Toggle search box visibility
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const results = messages.filter(msg => msg.toLowerCase().includes(term.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAvatarClicks = () => {
    navigate('/account'); // Navigate to AccountProfile page
  };
  return (
    <Stack height={"100vh"} direction="column" >
     {/*chat header*/}
      <Box
        p={2}
        sx={{
          
          height: 100,
          width: "100%",
          backgroundColor: headerBackgroundColor,
          boxShadow: headerBoxShadow,
        }}
      >
        <Stack
          alignItems={"center"}
          direction="row"
          justifyContent={"space-between"}
          sx={{
         pb:10,
            width: "100%",
            height: "100%",
            pl: { xs: 2, sm: 3, md: 4, lg: 5 },
            pr: { xs: 2, sm: 3, md: 4, lg: 5 },
            position: "fixed",
            left: 440,
            bottom: 320
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  alt={faker.name.fullName()}
                  src={faker.image.avatar()}
                  onClick={handleAvatarClick} // Add onClick handler

                />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
              <Typography variant="caption">Online</Typography>
            </Stack>
            <Stack direction="row" alignItems={"center"} spacing={3} sx={{position:"fixed",right:20}}>
              <IconButton onClick={handleSearchClick}>
                <MagnifyingGlass />
              </IconButton>
              <IconButton onClick={handlePhoneClick}>
                <Phone />
              </IconButton>
              <IconButton onClick={handleVideoClick}>
                <VideoCamera />
              </IconButton>
              <IconButton onClick={ handleAvatarClicks }>
                <User />
              </IconButton>
              <IconButton onClick={handleMenuClick}>
                <DotsThree size={32} />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        {showSearchBox && (
          <Box
            sx={{
              position: 'absolute',
              top: 80,
              left: 440,
              width: 300,
              backgroundColor: theme => theme.palette.background.paper,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: 1,
              p: 2,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <List>
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={result} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No results found" />
                </ListItem>
              )}
            </List>
          </Box>
        )}
      </Box>

      {/*Message Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          overflow: "auto",
        }}
      >
        <Message />
        {file && <FileCard file={file} onMenuClick={handleMenuClick} onDownload={handleDownload} onDelete={handleDelete} />}
        {imageFile && (
          <Box sx={{ mt: 2 }}>
            <img src={imageFile} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </Box>
        )}
      </Box>

      {/*Chat Footer */}
      <Box
        sx={{
          height: 100,
          width: "100%",
          backgroundColor: footerBackgroundColor,
          boxShadow: footerBoxShadow,
          display: 'flex',
          alignItems: 'center',
          padding: 1,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '50%', position: "fixed", left: 440 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Type a message"
            fullWidth
            sx={{ flexGrow: 1 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        <Box sx={{position:"fixed",right:90}}>
         <IconButton   onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Smiley size={32} />
          </IconButton>
          <IconButton onClick={() => document.getElementById('file-input').click()}>
            <Paperclip size={32} />
            <input
              id="file-input"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </IconButton>
          <IconButton onClick={() => document.getElementById('image-input').click()}>
            <ImageSquare size={32} />
            <input
              id="image-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </IconButton>
          </Box>
          <Box
            sx={{
              position:"fixed",
            
              right:30,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme => theme.palette.primary.main,
              borderRadius: 1,
            }}
          >
            <SendIcon sx={{ color: theme => theme.palette.background.paper, width: 40 }} />
          </Box>

        </Stack>
        {showEmojiPicker && (
          <Box sx={{ position: 'absolute', bottom: 100, left: 440 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Box>
        )}
        {showImageUploader && (
          <Box sx={{ position: 'absolute', bottom: 100, left: 440, backgroundColor: '#fff', padding: 2, borderRadius: 1 }}>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: '100%' }}
            />
            <Typography variant="body2">Upload an image</Typography>
          </Box>
        )}
      </Box>

      {/*StartCall Dialog */}
      <StartCall open={openStartCall} handleClose={handleCloseStartCall} />

     
      <ActionMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        onArchive={handleArchive}
        onMute={handleMute}
        onDelete={handleDelete}
      />
     
      <ActionMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        onSave={handleSave}
        onCopy={handleCopy}
        onForward={handleForward}
        onDelete={handleDeletes}
      />
    </Stack>
  );
}

export default Index;
