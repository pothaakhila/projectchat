import SendIcon from '@mui/icons-material/Send';
import { Avatar, Badge, Box, Dialog, DialogContent, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import EmojiPicker from 'emoji-picker-react';
import { DotsThree, ImageSquare, MagnifyingGlass, Paperclip, Phone, Smiley, User, VideoCamera } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
      border: `1px solid ${theme.palette.success.main}`,
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

const ChatPage = ({ activeProfile, onClose }) => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.app);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // State to store messages
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  // Reference for the messages container
  const messagesEndRef = useRef(null);

  const headerBackgroundColor = theme.palette.mode === 'dark' ? '#333' : '#F8FAFF';
  const headerBoxShadow = theme.palette.mode === 'dark' ? '0px 0px 2px rgba(255, 255, 255, 0.25)' : '0px 0px 2px rgba(0, 0, 0, 0.25)';
  const footerBackgroundColor = theme.palette.mode === 'dark' ? '#333' : '#F8FAFF';
  const footerBoxShadow = theme.palette.mode === 'dark' ? '0px 0px 2px rgba(255, 255, 255, 0.25)' : '0px 0px 2px rgba(0, 0, 0, 0.25)';

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      // Handle file upload logic here
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Example dummy messages
    const messages = [
      'Hello there!',
      'How are you?',
      'What are you doing?',
      'Let’s catch up soon!'
    ];
    if (term) {
      const results = messages.filter(msg => msg.toLowerCase().includes(term.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleProfileOpen = () => {
    setOpenProfile(true);
  };

  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: user?.firstName || 'You', time: new Date().toLocaleTimeString() }]);
      setMessage('');
    }
  };

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentMessageIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMessageIndex(null);
  };

  const handleMenuAction = (action) => {
    console.log(`Action ${action} on message ${currentMessageIndex}`);
    handleMenuClose();
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Stack height="100vh" direction="column">
      {/* Chat Header */}
      <Box
        p={2}
        sx={{
          height: 100,
          width: "100%",
          backgroundColor: headerBackgroundColor,
          boxShadow: headerBoxShadow,
          position: "fixed",
          top: 0,
          zIndex: 1,
        }}
      >
        <Stack
          alignItems={"center"}
          direction="row"
          justifyContent={"space-between"}
          sx={{
            width: "100%",
            height: "100%",
            pl: { xs: 2, sm: 3, md: 4, lg: 5 },
            pr: { xs: 2, sm: 3, md: 4, lg: 5 },
          }}
        >
          <Stack direction={"row"} spacing={2} alignItems="center">
            <Box onClick={handleProfileOpen} sx={{ cursor: 'pointer' }}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  src={user?.avatar || '/assets/images/image.png'}
                  alt={user?.firstName}
                  sx={{ width: 56, height: 56 }}
                />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="h6">{user?.firstName || 'User Name'}</Typography>
              <Typography variant="caption">Online</Typography>
            </Stack>
            <Stack direction="row" alignItems={"center"} spacing={3} sx={{position:"fixed",right:40}}>
              <IconButton onClick={() => setSearchTerm(prev => !prev)}>
                <MagnifyingGlass />
              </IconButton>
              <IconButton>
                <Phone />
              </IconButton>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <IconButton onClick={() => navigate('/account')}>
                <User />
              </IconButton>
              <IconButton>
                <DotsThree size={32} />
              </IconButton>
            </Stack>
          </Stack>
          {searchTerm && (
            <Box
              sx={{
                position: 'absolute',
                top: 80,
                width: '100%',
                maxWidth: 300,
                backgroundColor: theme.palette.background.paper,
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
        </Stack>
      </Box>

      {/* Message Content */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          overflow: "auto",
          pb: 15, // To make space for the fixed header
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Ensures messages start from the bottom
        }}
      >
        <Stack spacing={2} >
          {messages.map((msg, index) => (
            <Stack
              key={index}
              direction={msg.sender === 'You' ? 'row-reverse' : 'row'}
              spacing={2}
              alignItems="flex-start"
            >
              <Box sx={{ flexShrink: 0 }}>
                <Avatar
                  src={msg.sender === 'You' ? user?.avatar : '/assets/images/default-avatar.png'} // Change avatar based on sender
                  alt={msg.sender}
                  sx={{ width: 40, height: 40 }}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: msg.sender === 'You' ? 'row-reverse' : 'row'
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      backgroundColor: msg.sender === 'You' ? '#E1FFC7' : '#F1F0F0',
                      borderRadius: 2,
                      p: 1,
                      maxWidth: '80%', // Limit the width of the message bubble
                      wordBreak: 'break-word'
                    }}
                  >
                    {msg.text}
                  </Typography>
                  <IconButton onClick={(e) => handleMenuClick(e, index)} sx={{ ml: 1 }}>
                    <DotsThree size={24} />
                  </IconButton>
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                  <i className="ri-time-line align-middle"></i> <span className="align-middle">{msg.time}</span>
                </Typography>
              </Box>
            </Stack>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      {/* Message Footer */}
      <Box
        sx={{
          height: 80,
          width: "80%", // Adjusted width to 100% to fit the entire screen
          backgroundColor: footerBackgroundColor,
          boxShadow: footerBoxShadow,
          position: "fixed",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            width: "90%",
            height: "100%",
            pl: { xs: 2, sm: 3, md: 4, lg: 5 },
            pr: { xs: 2, sm: 3, md: 4, lg: 5 },
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setShowEmojiPicker(false)}
          />
          <IconButton onClick={() => setShowEmojiPicker(prev => !prev)}>
            <Smiley />
          </IconButton>
          <IconButton>
            <ImageSquare />
          </IconButton>
          <IconButton>
            <Paperclip />
          </IconButton>
          <IconButton onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </Stack>
        {showEmojiPicker && (
          <Dialog open={showEmojiPicker} onClose={() => setShowEmojiPicker(false)}>
            <DialogContent>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </DialogContent>
          </Dialog>
        )}
      </Box>

      {/* Message Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuAction('Copy')}>Copy</MenuItem>
        <MenuItem onClick={() => handleMenuAction('Save')}>Save</MenuItem>
        <MenuItem onClick={() => handleMenuAction('Forward')}>Forward</MenuItem>
        <MenuItem onClick={() => handleMenuAction('Delete')}>Delete</MenuItem>
      </Menu>

    </Stack>
  );
};

export default ChatPage;
