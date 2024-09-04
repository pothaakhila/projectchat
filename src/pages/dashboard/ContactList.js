import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactList = ({ contacts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // Open the menu
  const handleClick = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedContact(null);
  };

  // Handle share action
  const handleShare = () => {
    console.log("Share contact:", selectedContact);
    // Implement share functionality (WhatsApp, Email, etc.)
    handleClose();
  };

  // Handle block action
  const handleBlock = () => {
    console.log("Block contact:", selectedContact);
    // Implement block functionality
    handleClose();
  };

  // Handle delete action
  const handleDelete = () => {
    console.log("Delete contact:", selectedContact);
    // Implement delete functionality
    handleClose();
  };

  return (
    <div>
      {contacts.map((group) => (
        <div key={group.letter}>
          <Typography variant="subtitle1" sx={{ padding: '16px', fontWeight: 'bold', color: 'primary.main' }}>
            {group.letter}
          </Typography>
          <List>
            {group.list.map((contact, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" aria-label="more" onClick={(e) => handleClick(e, contact)}>
                  <MoreVertIcon />
                </IconButton>
              }>
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleShare}>
          <ShareIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>Share</Typography>
        </MenuItem>
        <MenuItem onClick={handleBlock}>
          <BlockIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>Block</Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ContactList;
