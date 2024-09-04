import React, { useState, useRef } from 'react';
import { Box, Stack, Typography, IconButton, Menu, MenuItem, Divider, useTheme } from '@mui/material';
import { DotsThree, Copy, FloppyDisk, ArrowBendUpRight, Trash, Paperclip, Download } from 'phosphor-react';
import FileMessage from './FileCard'; // Import the new FileMessage component
import { Chat_History } from '../../data';
import { AccessTime } from '@mui/icons-material';


const FileChat = () => {
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
      <Box >
        <Stack spacing={2} >
          {Chat_History.map((message, index) => (
            message.type === 'file' && (
              <FileMessage
              
                key={index}
                file={{ name: message.name, url: message.content }}
                onDownload={() => handleDownload(message.content)}
                onDelete={() => handleDeleteMessage(index)}
              />
            )
          ))}
          <Box p={2} mb={2} sx={{ border: '1px solid', borderRadius: 2, boxShadow: 1  }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2">File Actions</Typography>
              <IconButton onClick={handleMenuClick}>
                <DotsThree size={24} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleCopy}>
                  <Copy size={24} /> Copy
                </MenuItem>
                <MenuItem onClick={handleSave}>
                  <FloppyDisk size={32} /> Save
                </MenuItem>
                <MenuItem onClick={handleForward}>
                  <ArrowBendUpRight size={32} /> Forward
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <Trash size={32} /> Delete
                </MenuItem>
              </Menu>
            </Stack>
            <Box mt={1}>
              <IconButton onClick={() => fileInputRef.current.click()}>
                <Paperclip size={24} /> Upload
              </IconButton>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  };



// ReplyMsg Component
const ReplyMsg = ({ el ,onMenuClick}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "flex-start" : "flex-end"}>
      <Box
        p={0.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack p={2} direction="column" spacing={3} alignItems="center" sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
            <Typography variant='body2' color={theme.palette.text.primary}>
              {el.message}
            </Typography>
          </Stack>
          <Typography variant='body2' color={el.incoming ? theme.palette.text.primary : '#fff'}>
            {el.reply}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <AccessTime fontSize="small" color="action"  />
          <Typography variant="caption" color={el.incoming ? theme.palette.text.primary :"textSecondary"}>
            {el.time}
          </Typography>
          <IconButton onClick={onMenuClick}>
            <DotsThree size={20} />
          </IconButton>
        </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

// MediaMsg Component
const MediaMsg = ({ el ,onMenuClick,onDownload}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "flex-start" : "flex-end"} spacing={1}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <img
          src={el.img}
          alt={el.message}
          style={{ maxHeight: 210, borderRadius: "10px", maxWidth: "100%" }}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/210')}
        />
         <Box display="flex" justifyContent="space-between" alignItems="center">
         <AccessTime fontSize="small" color="action"  />
          <Typography variant="caption" color="textSecondary">
            {el.time}
          </Typography>
          <IconButton onClick={onDownload}>
                  <Download fontSize="medium" />
                </IconButton>
          <IconButton onClick={onMenuClick}>
            <DotsThree size={20} />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
};

// TextMsg Component
/*
const TextMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "flex-start" : "flex-end"} spacing={1}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "80%",
          wordBreak: "break-word",
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text.primary : "#fff"}
        >
          {el.message}
        </Typography>
      </Box>
    </Stack>
  );
};*/

const TextMsg = ({ el ,onMenuClick } ) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? 'flex-start' : 'flex-end'} spacing={1}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
          maxWidth: '80%',
          wordBreak: 'break-word',
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text.primary : '#fff'}
        >
          {el.message}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <AccessTime fontSize="small" color="action"  />
          <Typography variant="caption" color="textSecondary" >
       
            {el.time}
          </Typography>
          <IconButton onClick={onMenuClick}>
            <DotsThree size={20} />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
};

// DocMsg Component
const DocMsg = ({ el,onMenuClick }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "flex-start" : "flex-end"} spacing={1}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
          wordBreak: 'break-word',
        }}
      >
        <Stack direction="column" spacing={1}>
          <Typography variant="body2" color={el.incoming ? theme.palette.text.primary : "#fff"}>
            Document
          </Typography>
          <a href={el.content} download>
            <Typography variant="body2" color={theme.palette.primary.light}>
              {el.name}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <AccessTime fontSize="small" color="action"  />
          <Typography variant="caption" color="textSecondary">
            {el.time}
          </Typography>
          <IconButton onClick={onMenuClick}>
            <DotsThree size={20} />
          </IconButton>
        </Box>
          </a>
         
        </Stack>
      </Box>
    </Stack>
  );
};

// LinkMsg Component
const LinkMsg = ({ el ,onMenuClick,onDownload}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "flex-start" : "flex-end"} spacing={1}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="body2" color={el.incoming ? theme.palette.text.primary : "#fff"}>
            {el.message}
          </Typography>
          <a href={el.link} target="_blank" rel="noopener noreferrer">
            <img
              src={el.preview}
              alt="Link preview"
              style={{ maxHeight: 210, borderRadius: "10px", maxWidth: "100%" }}
              onError={(e) => (e.target.src = 'https://via.placeholder.com/210')}
            />
             <Box display="flex" justifyContent="space-between" alignItems="center">
             <AccessTime fontSize="small" color="action"  />
          <Typography variant="caption" color="textSecondary">
            {el.time}
          </Typography>
          <IconButton onClick={onDownload}>
                  <Download fontSize="medium" />
                </IconButton>
          <IconButton onClick={onMenuClick}>
            <DotsThree size={20} />
          </IconButton>
         
        </Box>
        
          </a>
        </Stack>
        
      </Box>
     
    </Stack>
  );
};

// Timeline Component
const Timeline = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46%" />
      <Typography variant="body2" color={theme.palette.text.primary}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

// Main Chat Component
const Chat = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const handleFileUpload = (file) => {
    const fileUrl = URL.createObjectURL(file);
    const newFileMessage = {
      type: 'msg',
      subtype: file.type.startsWith('image/') ? 'img' : 
                file.type.startsWith('application/pdf') ? 'pdf' : 'doc',
      content: fileUrl,
      name: file.name,
      message: `Uploaded file: ${file.name}`,
    };

    setChatHistory([...chatHistory, newFileMessage]);
  };

  const handleDeleteMessage = (messageIndex) => {
    const updatedChatHistory = chatHistory.filter((_, index) => index !== messageIndex);
    setChatHistory(updatedChatHistory);
  };

  return (
    <Box>
      <Stack spacing={3}>
        <FileChat onUpload={handleFileUpload} onDelete={() => handleDeleteMessage(0)} />
        <Stack spacing={3}>
          {chatHistory.map((el, index) => {
            switch (el.subtype) {
              case 'img':
                return <MediaMsg key={index} el={el} />;
              case 'pdf':
              case 'doc':
                return <DocMsg key={index} el={el} />;
              default:
                return <TextMsg key={index} el={el} />;
            }
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export {FileChat,TextMsg,ReplyMsg,LinkMsg,DocMsg,MediaMsg,Timeline};
