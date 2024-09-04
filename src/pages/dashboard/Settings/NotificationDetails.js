import React from "react";
import { Box, Typography } from "@mui/material";

const NotificationDetails = () => {
  return (
    <Box p={3}>
      <Typography variant="h6">Notifications</Typography>
      <Typography variant="body2">
        Here you can manage your notification settings.
      </Typography>
    </Box>
  );
};

export default NotificationDetails;
