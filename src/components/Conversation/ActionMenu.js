import { Menu, MenuItem } from '@mui/material';
import React from 'react';

const ActionMenu = ({ anchorEl, open, onClose, onSave, onCopy, onForward, onDelete }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MenuItem onClick={onSave}>Save</MenuItem>
      <MenuItem onClick={onCopy}>Copy</MenuItem>
      <MenuItem onClick={onForward}>Forward</MenuItem>
      <MenuItem onClick={onDelete}>Delete</MenuItem>
    </Menu>
  );
};

export default ActionMenu;
