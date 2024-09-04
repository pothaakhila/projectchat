import React from 'react';
import { Box, Typography, Stack, Divider, Switch, IconButton } from '@mui/material';
import { X } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';

const SecurityDetails = ({ handleClose }) => {
  const theme = useTheme();

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
        top: '45%', // Adjust the vertical position
        right: '40%', // Adjust the horizontal position
        zIndex: 1300, // Ensure it's above other content
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Security</Typography>
        <Box>
          <IconButton onClick={handleClose} size="small">
            <X size={24} color={theme.palette.text.primary} />
          </IconButton>
        </Box>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={2}>
        <Typography variant="body1">Show security notifications</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Switch
            id="security-notification-switch"
            // Add state and event handling if needed
          />
          <Typography variant="body2">Enable notifications</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SecurityDetails;
