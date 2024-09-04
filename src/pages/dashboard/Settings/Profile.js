/*import React, { useEffect } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../../sections/Dashboard/Settings/ProfileForm";
import { useDispatch } from "react-redux";
import { FetchUserProfile } from "../../../redux/slices/app";

const Profile = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(FetchUserProfile());
  }, []);

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left Pane *//*}
        <Box
          sx={{
            overflowY: "scroll",

            height: "100vh",
            width: 360,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header *//*}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">My Profile</Typography>
            <IconButton onClick={handleDropdownOpen} size="large">
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDropdownClose}
            >
              <MenuItem onClick={handleDropdownClose}>Edit</MenuItem>
              <MenuItem onClick={handleDropdownClose}>Action</MenuItem>
              <Divider />
              <MenuItem onClick={handleDropdownClose}>Another action</MenuItem>
            </Menu>
          </Stack>

            {/* Profile Edit Form *//*}
            <ProfileForm />
          </Stack>
        </Box>

       
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        ></Box>
      </Stack>
    </>
  );
};

export default Profile;
*/ 


import { MoreVert } from "@mui/icons-material"; // Correct import for MoreVert icon
import { Box, Divider, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FetchUserProfile } from "../../../redux/slices/app";
import ProfileForm from "../../../sections/Dashboard/Settings/ProfileForm";
import { useTheme } from "@mui/material/styles";

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the anchor element for the menu

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, [dispatch]);

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu by setting the anchor element
  };

  const handleDropdownClose = () => {
    setAnchorEl(null); // Close the menu by clearing the anchor element
  };

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left Pane */}
        <Box
          sx={{
           overflowY:"scroll",
           
           '&::-webkit-scrollbar': { width: '8px' },
           '&::-webkit-scrollbar-track': { background: theme.palette.mode === 'light' ? '#F0F0F0' : '#3E3E3E' },
           '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '10px' },
           '&::-webkit-scrollbar-thumb:hover': { background: '#555' },
            height: "100vh",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            //boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={4} spacing={5} 
         >
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" >
              <Typography variant="h4">My Profile</Typography>
              <IconButton onClick={handleDropdownOpen} size="large">
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
              >
                <MenuItem onClick={handleDropdownClose}>Edit</MenuItem>
                <MenuItem onClick={handleDropdownClose}>Action</MenuItem>
                <Divider />
                <MenuItem onClick={handleDropdownClose}>Another action</MenuItem>
              </Menu>
            </Stack>

            {/* Profile Edit Form */}
            <ProfileForm />
          </Stack>
        </Box>

        {/* Right Pane */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        ></Box>
      </Stack>
    </>
  );
};

export default Profile;
