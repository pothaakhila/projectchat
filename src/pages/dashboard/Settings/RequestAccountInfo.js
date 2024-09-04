import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton, Stack } from '@mui/material';
import { X } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const PersonalInfo = ({ isOpen, onClose }) => {
  const theme = useTheme(); // Get the theme object

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    time: false,
    location: false,
  });

  const [info, setInfo] = useState({
    name: 'Patricia Smith',
    email: 'adc@123.com',
    time: '11:40 AM',
    location: 'California, USA',
  });

  const [tempInfo, setTempInfo] = useState({ ...info });

  const handleEdit = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (event, field) => {
    setTempInfo({ ...tempInfo, [field]: event.target.value });
  };

  const handleSave = () => {
    setInfo(tempInfo);
    setIsEditing({
      name: false,
      email: false,
      time: false,
      location: false,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setIsEditing({
        name: false,
        email: false,
        time: false,
        location: false,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3, // Increased shadow for better visibility
        width: 400, // Adjust width as needed
        maxHeight: '80vh', // Ensure the box doesn't exceed viewport height
        overflowY: 'auto', // Allow scrolling if content overflows
        position: 'fixed', // Fixed position to stay in place
        top: '20%', // Adjust the vertical position
        left: '30%', // Adjust the horizontal position
        zIndex: 1300, // Ensure it's above other content
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Personal Information</Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.text.secondary // Use theme secondary text color
          }}
        >
          <X />
        </IconButton>
      </Stack>
      <Stack spacing={2} mt={2}>
        {['name', 'email', 'time', 'location'].map(field => (
          <Box key={field}>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Typography>
            {isEditing[field] ? (
              <TextField
                value={tempInfo[field]}
                onChange={(e) => handleChange(e, field)}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography variant="h6">{info[field]}</Typography>
            )}
            <Button
              variant={isEditing[field] ? 'contained' : 'outlined'}
              onClick={isEditing[field] ? handleSave : () => handleEdit(field)}
              sx={{ mt: 1 }}
            >
              {isEditing[field] ? 'Save' : 'Edit'}
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PersonalInfo;
