import React, { useState } from "react";
import { Box, Stack, Typography, IconButton, Divider } from "@mui/material";
import { CaretDown, CaretUp, X } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const HelpDetails = ({ open, handleClose }) => {
  const [activeSection, setActiveSection] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleToggleSection = (section) => {
    if (section === "settings") {
      navigate('/settings'); // Navigate to settings page
    } else {
      setActiveSection(activeSection === section ? null : section);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 4px 6px ${theme.palette.grey[400]}`,
        borderRadius: 2,
        p: 4,
        zIndex: 1300, // Ensure it's above other content
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: theme.palette.text.primary,
        }}
      >
        <X size={24} />
      </IconButton>

      <Typography variant="h6" mb={2}>Help</Typography>
      
      <Stack spacing={2}>
        {/* FAQs Section */}
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ cursor: "pointer" }}
            onClick={() => handleToggleSection("faqs")}
          >
            <Typography variant="body1">FAQs</Typography>
            {activeSection === "faqs" ? <CaretUp size={20} /> : <CaretDown size={20} />}
          </Stack>
          {activeSection === "faqs" && (
            <Box mt={2}>
              <Typography variant="body2">
                Here you can find answers to frequently asked questions. If you need further assistance, feel free to contact us.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Contact Section */}
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ cursor: "pointer" }}
            onClick={() => handleToggleSection("contact")}
          >
            <Typography variant="body1">Contact</Typography>
            {activeSection === "contact" ? <CaretUp size={20} /> : <CaretDown size={20} />}
          </Stack>
          {activeSection === "contact" && (
            <Box mt={2}>
              <Typography variant="body2">
                For any inquiries, please contact us at:
                <br />
                Email: support@example.com
                <br />
                Phone: (123) 456-7890
              </Typography>
            </Box>
          )}
        </Box>

        {/* Terms & Privacy Policy Section */}
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ cursor: "pointer" }}
            onClick={() => handleToggleSection("terms")}
          >
            <Typography variant="body1">Terms & Privacy Policy</Typography>
            {activeSection === "terms" ? <CaretUp size={20} /> : <CaretDown size={20} />}
          </Stack>
          {activeSection === "terms" && (
            <Box mt={2}>
              <Typography variant="body2">
                Please read our terms of service and privacy policy carefully. By using our service, you agree to our terms and conditions.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Settings Section */}
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ cursor: "pointer" }}
            onClick={() => handleToggleSection("settings")}
          >
            <Typography variant="body1">Settings</Typography>
            {activeSection === "settings" ? <CaretUp size={20} /> : <CaretDown size={20} />}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default HelpDetails;
