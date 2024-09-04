/*
import { Stack, Box } from '@mui/material';
import { Chat_History, Message_options } from '../../data';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MsgTypes';

import React, { useState, useRef } from 'react';
import { Typography, IconButton, Menu, MenuItem, Divider, useTheme } from '@mui/material';
import { DotsThree, Copy, FloppyDisk, ArrowBendUpRight, Trash, Paperclip } from 'phosphor-react';
import FileMessage from './FileCard'; // Import the new FileMessage component

const Message = () => {

    const [chatHistory, setChatHistory] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const fileInputRef = useRef(null);
    const theme = useTheme();
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleCopy = () => {
      console.log('Copy action');
      handleMenuClose();
    };
  
    const handleSave = () => {
      console.log('Save action');
      handleMenuClose();
    };
  
    const handleForward = () => {
      console.log('Forward action');
      handleMenuClose();
    };
  
    const handleDelete = () => {
      console.log('Delete action');
      handleMenuClose();
    };
  
    const handleFileUpload = (file) => {
      const fileUrl = URL.createObjectURL(file);
      const newFileMessage = {
        type: 'file',
        content: fileUrl,
        name: file.name,
      };
      setChatHistory([...chatHistory, newFileMessage]);
    };
  
    const handleDownload = (fileUrl) => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'file'; // Change this as needed
      link.click();
    };
  
    const handleDeleteMessage = (index) => {
      const updatedChatHistory = chatHistory.filter((_, i) => i !== index);
      setChatHistory(updatedChatHistory);
    };
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        handleFileUpload(selectedFile);
      }
    };
  
  return (
    <Box 
      p={3} 
      sx={{ 
        position: "inline", 
        ml: 0, 
       mb:0,
        width: "100%", 
        height: 'calc(83.1vh - 64px)', // Adjust height as needed
        overflowY: 'auto', // Enable vertical scrolling
        overflowX: 'hidden', // Prevent horizontal scrolling
        backgroundColor: 'background.paper', // Optional: Set background color if needed
      }}
    >


      <Stack spacing={3}>
        {Chat_History.map((el, index) => {
          
          switch (el.type) {
            case "divider":
              // timeline
              return <Timeline key={index} el={el} />;

            case "msg":
              switch (el.subtype) {
                case "divider":
              // timeline
              return <Timeline key={index} el={el} />;

                case "img":
                  // img msg
                  return <MediaMsg key={index} el={el} />;
                case "doc":
                  // doc msg
                  return <DocMsg key={index} el={el} />;
                case "link":
                  // link msg
                  return <LinkMsg key={index} el={el} />;
                case "reply":
                  // reply msg
                  return <ReplyMsg key={index} el={el} />;
                default:
                  // text msg
                  return <TextMsg key={index} el={el} />;
              }

            default:
              return null;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
*/   


import React, { useState } from 'react';
import { Box, Stack, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { DotsThree, Copy, FloppyDisk, ArrowBendUpRight, Trash } from 'phosphor-react';
import { Chat_History } from '../../data';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MsgTypes';
import { useTheme } from '@emotion/react';

const Message = () => {
  const theme = useTheme();
  const [chatHistory, setChatHistory] = useState(Chat_History);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentIndex(null);
  };

  const handleCopy = () => {
    console.log('Copy action');
    handleMenuClose();
  };

  const handleSave = () => {
    console.log('Save action');
    handleMenuClose();
  };

  const handleForward = () => {
    console.log('Forward action');
    handleMenuClose();
  };

  const handleDelete = () => {
    if (currentIndex !== null) {
      const updatedChatHistory = chatHistory.filter((_, index) => index !== currentIndex);
      setChatHistory(updatedChatHistory);
    }
    handleMenuClose();
  };
    // Define handleDownload
    const handleDownload = (fileUrl, fileName) => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName; // Set the file name for download
      link.click();
    };
  
    // Define handleDeleteMessage
    const handleDeleteMessage = (index) => {
      const updatedChatHistory = chatHistory.filter((_, i) => i !== index);
      setChatHistory(updatedChatHistory);
    };

  return (
    <Box
      p={3}
      sx={{
        width: '100%',
        height: 'calc(83.2vh - 64px)',
       
        overflowY: "scroll",
        
        overflowX: 'hidden',
        backgroundColor: 'background.paper',
        
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-track': { background: theme.palette.mode === 'light' ? '#F0F0F0' : '#3E3E3E' },
        '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '10px' },
        '&::-webkit-scrollbar-thumb:hover': { background: '#555' },
      }}
    >
      <Stack spacing={3}>
        {chatHistory.map((el, index) => {
          const commonProps = {
            key: index,
            onMenuClick: () => handleDeleteMessage(index),
            onDownload: () => handleDownload(el.content, el.name),
          };
          
          switch (el.type) {
            case 'divider':
              return <Timeline key={index} el={el} />;
            case 'msg':
              switch (el.subtype) {
                case 'img':
                  return (
                    <MediaMsg
                      key={index}
                      el={el}
                      {...commonProps}
                      onMenuClick={(event) => handleMenuClick(event, index)}
                    />
                  );
                case 'doc':
                  return (
                    <DocMsg
                      key={index}
                      el={el}
                      onMenuClick={(event) => handleMenuClick(event, index)}
                    />
                  );
                case 'link':
                  return (
                    <LinkMsg
                      key={index}
                      el={el}
                      {...commonProps}
                      onMenuClick={(event) => handleMenuClick(event, index)}
                    />
                  );
                case 'reply':
                  return (
                    <ReplyMsg
                      key={index}
                      el={el}
                      onMenuClick={(event) => handleMenuClick(event, index)}
                    />
                  );
                default:
                  return (
                    <TextMsg
                      key={index}
                      el={el}
                      onMenuClick={(event) => handleMenuClick(event, index)}
                    />
                  );
              }
            default:
              return null;
          }
        })}
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleCopy}>
          <Copy size={24} /> Copy
        </MenuItem>
        <MenuItem onClick={handleSave}>
          <FloppyDisk size={24} /> Save
        </MenuItem>
        <MenuItem onClick={handleForward}>
          <ArrowBendUpRight size={24} /> Forward
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Trash size={24} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Message;
