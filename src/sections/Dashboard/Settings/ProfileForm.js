/*import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../../redux/slices/app";
//import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    firstName: user?.firstName,
    about: user?.about,
    //avatar: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
  } = methods;

  const onSubmit = async (data) => {
    try {
      // Send API request
      console.log("DATA", data);
      dispatch(
        UpdateUserProfile({
          firstName: data?.firstName,
          about: data?.about,
          avatar: file,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitSuccessful || isSubmitting}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
*/

/*
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/slices/app"; // Ensure correct import

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    firstName: user?.firstName,
    about: user?.about,
    avatar: user?.avatar, // Ensure the default value is set
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(
        updateUserProfile({
          firstName: data?.firstName,
          about: data?.about,
          avatar: file,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        
        
        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
*/
/*
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/slices/app"; // Ensure correct import

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);

  // Updated schema to include email validation
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    email: Yup.string().email("Email must be a valid email").required("Email is required"),
    avatar: Yup.string().nullable(true),
  });

  // Include email in the default values
  const defaultValues = {
    firstName: user?.firstName || "",
    about: user?.about || "",
    email: user?.email || "", // Ensure email is included
    avatar: user?.avatar || "", // Ensure the default value is set
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(
        updateUserProfile({
          firstName: data?.firstName,
          about: data?.about,
          email: data?.email, // Include email in the profile update
          avatar: file,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        
        <RHFTextField
          type="email"
          name="email"
          label="Email Address"
          helperText={"This is your contact email"}
        />

        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;

*/ 
/*
// src/pages/profile/ProfileForm.js
import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/slices/app";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const [file, setFile] = useState(null);

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
    } catch (error) {
      console.error(error);
    }
  };

  // Handle file drop for avatar upload
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {/* Display current avatar or allow new upload *//*}
        <RHFUploadAvatar
          name="avatar"
          maxSize={3145728}
          onDrop={handleDrop}
          preview={file ? URL.createObjectURL(file) : user?.avatar}
        />
        <RHFTextField name="firstName" label="First Name" />
        <RHFTextField type="email" name="email" label="Email Address" />
        <RHFTextField multiline rows={4} name="about" label="About" />
        <Stack direction="row" justifyContent="end">
          <LoadingButton color="primary" size="large" type="submit" variant="contained">
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
*/
/*
// src/pages/profile/ProfileForm.js
import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { Stack,Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/slices/app";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const [file, setFile] = useState(null);

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
    } catch (error) {
      console.error(error);
    }
  };

  // Handle file drop for avatar upload
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );


  const user_id = window.localStorage.getItem("user_id");
  const user_name = user?.firstName;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {/* Display current avatar or allow new upload *//*}
        {/*<RHFUploadAvatar
          name="avatar"
          maxSize={3145728}
          onDrop={handleDrop}
          preview={file ? URL.createObjectURL(file) : user?.avatar}
        />*//*}
         <Avatar
        src={user?.avatar || "/assets/images/image.png"}
        id="profile-positioned-button"
        aria-controls={openMenu ? "profile-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        alt={user_name}
        onClick={handleClick}
        sx={{ width: 90, height: 90 ,}} 
     
      />
        <RHFTextField name="firstName" label="First Name" />
        <RHFTextField type="email" name="email" label="Email Address" />
        <RHFTextField multiline rows={4} name="about" label="About" />
        <Stack direction="row" justifyContent="end">
          <LoadingButton color="primary" size="large" type="submit" variant="contained">
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
*/

import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme, IconButton, Menu, MenuItem, Divider, List, ListItem, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import FormProvider from "../../../components/hook-form";
import { updateUserProfile } from "../../../redux/slices/app";
import { ExpandMore, MoreVert, Download as DownloadIcon } from "@mui/icons-material";
import { FileCopy, Image as MuiImage } from "@mui/icons-material";
import { Paperclip, User } from 'phosphor-react';

// Helper function to format file size
const formatFileSize = (size) => {
  if (size < 1024) return `${size} bytes`;
  if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / 1048576).toFixed(2)} MB`;
};

const ProfileForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
         
          position: 'relative',
          height: '98vh',
          width: 246,
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.default,
          //boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: '80%',  }}>
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
              <span style={{ color: 'green', fontSize: '24px', marginRight: '5px' }}>• Active </span>
              {user ? user.status : 'Status'}
            </Typography>
          </Box>

          <Box sx={{ p: 2,position:"relative" , right:30,width:255,height:250 }}>
            <Typography color="textSecondary" paragraph>
              {user ? user.about : 'Bio'}
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">
                <User size={20} sx={{ marginRight: '8px' }} />
                  About</Typography>
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
                  Attached Files</Typography>
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
                          mb: 1, // Margin bottom to space out items
                          p: 1, // Padding to reduce the size
                          border: `1px solid ${theme.palette.divider}`, // Optional border for card
                          borderRadius: 1, // Rounded corners
                          overflow: 'hidden', // Ensure content does not overflow
                          maxWidth: '100%', // Ensures card doesn't exceed container width
                        }}
                      >
                        <Box
                          sx={{
                            mr: 1,
                            width: 30, // Smaller width for icons
                            height: 30, // Smaller height for icons
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden', // Clip content that overflows
                            borderRadius: 1, // Rounded corners for icon
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
             <MenuItem onClick={handleFileMenuClose}> Action</MenuItem>
        
          <MenuItem onClick={handleFileDelete}>
            Delete
          </MenuItem>
          <MenuItem onClick={handleFileMenuClose}>Another Action</MenuItem>
        </Menu>
      </Box>
    </FormProvider>
  );
};

export default ProfileForm;
