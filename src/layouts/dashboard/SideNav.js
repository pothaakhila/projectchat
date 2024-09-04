
import { Box, Divider, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import AntSwitch from "../../components/AntSwitch";

import Logo from "../../assets/Images/logo.ico";

import { Nav_Buttons, Nav_Setting } from "../../data";
import useSettings from "../../hooks/useSettings";

import LanguageIcon from '@mui/icons-material/Language'; // Import LanguageIcon
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateTab } from "../../redux/slices/app";
import ProfileMenu from "./ProfileMenu";

// Import flag images
import englishFlag from '../../assets/Images/english-flag.jpeg';
import germanFlag from '../../assets/Images/german-flag.png'; // Placeholder path for German flag
import italianFlag from '../../assets/Images/italian-flag.png'; // Placeholder path for Italian flag
import russianFlag from '../../assets/Images/russian-flag.png'; // Placeholder path for Russian flag
import spanishFlag from '../../assets/Images/spanish-flag.png'; // Placeholder path for Spanish flag

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/settings";
    case 4:
      return "/myprofile";
    default:
      return "/";
  }
};

const SideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { tab ,user} = useSelector((state) => state.app);

  const navigate = useNavigate();

  const { onToggleMode } = useSettings();

  const selectedTab = tab;

  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(getPath(index));
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
 
// Handle language menu click
const handleLanguageClick = (event) => {
  setAnchorEl(event.currentTarget);
};

// Handle language menu close
const handleLanguageClose = () => {
  setAnchorEl(null);
};

  return (
    <Box
      sx={{
        height: "100vh",
        width: 100,

        backgroundColor:
          theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        py={3}
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              height: 64,
              width: 64,
            }}
            p={1}
          >
            <img src={Logo} alt="chat" />
          </Box>{/*
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems={"center"}
            spacing={3}
          >
            {Nav_Buttons.map((el) => {
              return el.index === selectedTab ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
            <Divider sx={{ width: 48 }} />
            {Nav_Setting.map((el) => {
              return el.index === selectedTab ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);

                    // dispatch(UpdateTab(el.index));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
          </Stack>*/}
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems={"center"}
            spacing={3}
          >
            {Nav_Buttons.map((el) => (
              <Box
                key={`nav-button-${el.index}`}
                sx={{
                  backgroundColor: el.index === selectedTab
                    ? theme.palette.primary.main
                    : "transparent",
                  borderRadius: 1.5,
                }}
                p={1}
              >
                <IconButton
                  onClick={() => handleChangeTab(el.index)}
                  sx={{ width: "max-content", color: el.index === selectedTab ? "#ffffff" : (theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary) }}
                >
                  {el.icon}
                </IconButton>
              </Box>
            ))}
            <Divider sx={{ width: 48 }} />
            {Nav_Setting.map((el) => (
              <Box
                key={`nav-setting-${el.index}`}
                sx={{
                  backgroundColor: el.index === selectedTab
                    ? theme.palette.primary.main
                    : "transparent",
                  borderRadius: 1.5,
                }}
                p={1}
              >
                <IconButton
                  onClick={() => handleChangeTab(el.index)}
                  sx={{ width: "max-content", color: el.index === selectedTab ? "#ffffff" : (theme.palette.mode === "light" ? "#080707" : theme.palette.text.primary) }}
                >
                  {el.icon}
                </IconButton>
              </Box>
            ))}
            <Stack p={1} spacing={4}>
              <IconButton onClick={handleLanguageClick}>
                <LanguageIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleLanguageClose}
              >
                <MenuItem onClick={handleLanguageClose}>
                  <img src={englishFlag} alt="English" style={{ width: 24, height: 24, marginRight: 8 }} />
                  <span>English</span>
                </MenuItem>
                <MenuItem onClick={handleLanguageClose}>
                  <img src={spanishFlag} alt="Spanish" style={{ width: 24, height: 24, marginRight: 8 }} />
                  <span>Spanish</span>
                </MenuItem>
                <MenuItem onClick={handleLanguageClose}>
                  <img src={germanFlag} alt="German" style={{ width: 24, height: 24, marginRight: 8 }} />
                  <span>German</span>
                </MenuItem>
                <MenuItem onClick={handleLanguageClose}>
                  <img src={italianFlag} alt="Italian" style={{ width: 24, height: 24, marginRight: 8 }} />
                  <span>Italian</span>
                </MenuItem>
                <MenuItem onClick={handleLanguageClose}>
                  <img src={russianFlag} alt="Russian" style={{ width: 24, height: 24, marginRight: 8 }} />
                  <span>Russian</span>
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={4}>
        
         <AntSwitch
            defaultChecked={theme.palette.mode === "dark"}
            onChange={onToggleMode}
          />
         
           <ProfileMenu />
        </Stack>
        
      </Stack>
    </Box>
  );
};

export default SideBar;


