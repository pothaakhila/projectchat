import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme, IconButton, Menu, MenuItem, Divider, List, ListItem, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ExpandMore, MoreVert, Download as DownloadIcon, Close as CloseIcon } from "@mui/icons-material";
import { FileCopy, Image as MuiImage } from "@mui/icons-material";
import { Paperclip, User } from 'phosphor-react';
import { updateUserProfile } from "../../redux/slices/auth";
import FormProvider from "../../components/hook-form/FormProvider";
import { useNavigate } from "react-router-dom"; // Import useNavigate for page redirection

// Helper function to format file size
const formatFileSize = (size) => {
  if (size < 1024) return `${size} bytes`;
  if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / 1048576).toFixed(2)} MB`;
};

const UserProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { user } = useSelector((state) => state.app);
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [fileMenuAnchorEl, setFileMenuAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Validation schema
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    email: Yup.string().email("Email must be a valid email").required("Email is required"),
    avatar: Yup.string().nullable(true),
  });

  // Set default values based on user data
  const defaultValues = {
    firstName: user?.firstName || "",
    about: user?.about || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  };

  // Initialize the form
  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (user?.avatar) {
      setFile(user.avatar);
    }
  }, [user]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      dispatch(
        updateUserProfile({
          firstName: data.firstName,
          about: data.about,
          email: data.email,
          avatar: file,
        })
      );
      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error(error);
    }
  };

  // Handle file input change for avatar upload
  const handleImageChange = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      setFile(URL.createObjectURL(file)); // Preview the selected image
      setValue("avatar", file, { shouldValidate: true });
    }
  };

  // Handle file input change for attached files
  const handleFileUpload = (event) => {
    if (event.target.files.length) {
      const newFiles = Array.from(event.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));
      setAttachedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  // Handle file menu open
  const handleFileMenuOpen = (event, file) => {
    setFileMenuAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handleFileMenuClose = () => {
    setFileMenuAnchorEl(null);
  };

  const handleFileDownload = () => {
    const link = document.createElement('a');
    link.href = selectedFile.url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleFileMenuClose();
  };

  const handleFileDelete = () => {
    setAttachedFiles(prevFiles => prevFiles.filter(file => file !== selectedFile));
    handleFileMenuClose();
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setFile(user?.avatar); // Reset file to original avatar
  };

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  // Handle close button click
  const handleCloseClick = () => {
    navigate('/'); // Navigate to the "Chats" page
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          width: 360,
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
          overflow: 'hidden',
        }}
      >
        <IconButton
          onClick={handleCloseClick}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1, // Ensure the close button is on top of other content
            color: theme.palette.text.primary,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Stack p={3} spacing={2} sx={{ height: '80%' }}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ mb: 2, position: 'relative', display: 'inline-flex' }}>
              <Avatar
                src={file || user?.avatar || "/assets/images/image.png"}
                alt={user?.firstName || "Profile Picture"}
                sx={{ width: 100, height: 100, borderRadius: '50%' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: 'green',
                  border: `2px solid ${theme.palette.background.paper}`,
                }}
              />
            </Box>
            {editMode && (
              <Box sx={{ marginTop: 2 }}>
                <input
                  accept="image/*"
                  id="avatar-upload"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="avatar-upload">
                  <Button variant="contained" component="span">
                    Upload New Avatar
                  </Button>
                </label>
              </Box>
            )}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              {editMode ? (
                <>
                  <LoadingButton color="primary" size="large" type="submit" variant="contained">
                    Save
                  </LoadingButton>
                  <Button variant="outlined" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </Stack>
            <Typography variant="h5" noWrap>{user ? user.firstName : 'Name'}</Typography>
            <Typography color="textSecondary" noWrap>
              <span style={{ color: 'green', fontSize: '25px', marginRight: '5px' }}>•Active</span>
              {user ? user.status : 'Status'}
            </Typography>
          </Box>

          <Box sx={{ p: 2, mr:20, width: 290, height: 250 }}>
            <Typography color="textSecondary" paragraph>
              {user ? user.about : 'Bio'}
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">
                  <User size={20} sx={{ marginRight: '8px' }} />
                  About
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography color="textSecondary">Name</Typography>
                  <Typography variant="body1">{user ? user.firstName : 'Name'}</Typography>
                  <Typography color="textSecondary" sx={{ mt: 2 }}>Email</Typography>
                  <Typography variant="body1">{user ? user.email : 'Email'}</Typography>
                  <Typography color="textSecondary" sx={{ mt: 2 }}>Time</Typography>
                  <Typography variant="body1">{user ? user.time : 'Time'}</Typography>
                  <Typography color="textSecondary" sx={{ mt: 2 }}>Location</Typography>
                  <Typography variant="body1">{user ? user.location : 'Location'}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">
                  <Paperclip size={20} sx={{ marginRight: '8px' }} />
                  Attached Files
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <input
                    accept="*"
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload">
                    <Button variant="contained" component="span" startIcon={<Paperclip />}>
                      Attach Files
                    </Button>
                  </label>
                  <List sx={{ mt: 2 }}>
                    {attachedFiles.map((file, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                          p: 1,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 1,
                          overflow: 'hidden',
                          maxWidth: '100%',
                        }}
                      >
                        <Box
                          sx={{
                            mr: 1,
                            width: 30,
                            height: 30,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            borderRadius: 1,
                          }}
                        >
                          {file.type.startsWith('image/') ? (
                            <MuiImage src={file.url} alt={file.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <FileCopy sx={{ fontSize: 20 }} />
                          )}
                        </Box>
                        <Stack sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" noWrap>{file.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {formatFileSize(file.size)}
                          </Typography>
                        </Stack>
                        <Tooltip title="Download">
                          <IconButton onClick={() => handleFileDownload(file)}>
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More Options">
                          <IconButton onClick={(event) => handleFileMenuOpen(event, file)}>
                            <MoreVert />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Stack>

        {/* File Menu */}
        <Menu
          anchorEl={fileMenuAnchorEl}
          open={Boolean(fileMenuAnchorEl)}
          onClose={handleFileMenuClose}
        >
          <MenuItem onClick={handleFileMenuClose}>Action</MenuItem>
          <MenuItem onClick={handleFileDelete}>Delete</MenuItem>
          <MenuItem onClick={handleFileMenuClose}>Another Action</MenuItem>
        </Menu>
      </Box>
    </FormProvider>
  );
};

export default UserProfile;
