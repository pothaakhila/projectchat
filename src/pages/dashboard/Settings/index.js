import React, { useState } from 'react';
import { Box, Typography, Stack, Divider, IconButton, Avatar, Button, TextField } from '@mui/material';
import { CaretLeft, Bell, Lock, Key, PencilCircle, Note, Keyboard, Info, X, Check } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import { faker } from '@faker-js/faker';
import ThemeDialog from '../../../sections/Dashboard/Settings/ThemeDialog';
import ShortcutDialog from '../../../sections/Dashboard/Settings/ShortcutDialog';
//import NotificationDetails from './NotificationDetails';
import PrivacyDetails from './PrivacyDetails';
import SecurityDetails from './SecurityDetails';
import RequestAccountInfo from './RequestAccountInfo';
import HelpDetails from './HelpDetails';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Settings = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize navigate
  const [openTheme, setOpenTheme] = useState(false);
  const [openShortcuts, setOpenShortcuts] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailType, setDetailType] = useState(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  // Profile state
  const [profileImage, setProfileImage] = useState(faker.image.avatar());
  const [tempProfileImage, setTempProfileImage] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  // Profile info state
  const [profileName, setProfileName] = useState(`${faker.name.firstName()} ${faker.name.lastName()}`);
  const [profileEmail, setProfileEmail] = useState(faker.internet.email());
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleOpenTheme = () => {
    setOpenTheme(true);
  };

  const handleCloseTheme = () => {
    setOpenTheme(false);
  };

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };

  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };

  const handleOpenHelp = () => {
    setSelectedDetail(<HelpDetails handleClose={() => setSelectedDetail(null)} />);
    setDetailType('Help');
  };

  const handleOpenSecurity = () => {
    setSelectedDetail(<SecurityDetails handleClose={() => setSelectedDetail(null)} />);
    setDetailType('Security');
  };

  const handleOpenPrivacy = () => {
    setSelectedDetail(<PrivacyDetails handleClose={() => setSelectedDetail(null)} />);
    setDetailType('Privacy');
  };

  const handleOpenProfileInfo = () => {
    setShowPersonalInfo(true);
    setSelectedDetail(null);
    setDetailType(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (tempProfileImage) {
      setProfileImage(tempProfileImage);
      setTempProfileImage(null);
      setIsEditingAvatar(false);
    }
  };

  const handleCancelAvatar = () => {
    setTempProfileImage(null);
    setIsEditingAvatar(false);
  };

  const handleSaveProfileInfo = () => {
    setIsEditingProfile(false);
  };

  const handleCancelProfileInfo = () => {
    setIsEditingProfile(false);
  };

  const handleNavigateBack = () => {
    navigate('/contacts'); // Navigate to the Chats page
  };

  const list = [
    {
      key: 0,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: handleOpenPrivacy,
    },
    {
      key: 1,
      icon: <Key size={20} />,
      title: "Security",
      onclick: handleOpenSecurity,
    },
    {
      key: 2,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: handleOpenTheme,
    },
    {
      key: 3,
      icon: <Note size={20} />,
      title: "Profile Info",
      onclick: handleOpenProfileInfo,
    },
    {
      key: 4,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcuts,
    },
    {
      key: 5,
      icon: <Info size={20} />,
      title: "Help",
      onclick: handleOpenHelp,
    },
  ];

  return (
    <>
      <Stack direction="row" sx={{ height: '100vh', overflow: 'hidden' }}>
        {/* LeftPane */}
        <Box
          sx={{
            overflowY: "auto",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.default,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.mode === 'light' ? '#F0F0F0' : '#3E3E3E',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Stack p={4} spacing={5} >
            {/* Header */}
            <Stack direction="row" alignItems={"center"} spacing={3}>
              <IconButton onClick={handleNavigateBack}>
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>
              <Typography variant="h5">Settings</Typography>
            </Stack>

            {/* Profile */}
            <Stack direction="column" spacing={2} alignItems="flex-start">
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={tempProfileImage || profileImage}
                  sx={{ height: 60, width: 60 }}
                />
                <Stack spacing={0.5} flexGrow={1}>
                  {isEditingProfile ? (
                    <>
                      <TextField
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        label="Name"
                        fullWidth
                        size="small"
                        margin="dense"
                      />
                      <TextField
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        label="Email"
                        fullWidth
                        size="small"
                        margin="dense"
                      />
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Button
                          variant="contained"
                          onClick={handleSaveProfileInfo}
                          size="small"
                        >
                          Save
                          <Check size={16} />
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleCancelProfileInfo}
                          size="small"
                        >
                          Cancel
                          <X size={16} />
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1">{profileName}</Typography>
                      <Typography variant="body2">{profileEmail}</Typography>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditingProfile(true)}
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {isEditingAvatar ? (
                  <>
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                    >
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSaveAvatar}
                      size="small"
                    >
                      Save
                      <Check size={16} />
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleCancelAvatar}
                      size="small"
                    >
                      Cancel
                      <X size={16} />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditingAvatar(true)}
                    size="small"
                  >
                    Edit
                  </Button>
                )}
              </Stack>
            </Stack>

            {/* List */}
            <Stack spacing={4}>
              {list.map(({ key, icon, title, onclick }) => (
                <React.Fragment key={key}>
                  <Stack
                    onClick={() => {
                      if (onclick) {
                        onclick();
                      }
                    }}
                    sx={{ cursor: "pointer" }}
                    spacing={2}
                  >
                    <Stack alignItems={"center"} direction="row" spacing={2}>
                      {icon}
                      <Typography variant="body2">{title}</Typography>
                    </Stack>
                    {key !== 5 && <Divider />}
                  </Stack>
                </React.Fragment>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Right Pane */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
            overflowY: "auto",
            position: "relative",
            p: 3,
          }}
        >
          {/* Display the selected detail component in a card format */}
          {selectedDetail}

          {['Help', 'Security', 'Privacy'].includes(detailType) && (
            <IconButton
              onClick={() => {
                setSelectedDetail(null);
                setDetailType(null);
              }}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: theme.palette.text.primary,
              }}
            >
              <X size={24} />
            </IconButton>
          )}

          {/* Render Personal Info */}
          {showPersonalInfo && (
            <RequestAccountInfo
              isOpen={showPersonalInfo}
              onClose={() => setShowPersonalInfo(false)}
            />
          )}
        </Box>
      </Stack>

      {openTheme && (
        <ThemeDialog open={openTheme} handleClose={handleCloseTheme} />
      )}
      {openShortcuts && (
        <ShortcutDialog open={openShortcuts} handleClose={handleCloseShortcuts} />
      )}
    </>
  );
};

export default Settings;
