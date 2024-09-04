import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import CreateGroup from "../../sections/Dashboard/CreateGroup";
import useResponsive from "../../hooks/useResponsive";

const Group = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [pinnedGroups, setPinnedGroups] = useState(ChatList.filter((el) => el.pinned));
  const [recentGroups, setRecentGroups] = useState(ChatList.filter((el) => !el.pinned));
  const isDesktop = useResponsive("up", "md");
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCreateGroup = (newGroup) => {
    setPinnedGroups((prevPinned) => [newGroup, ...prevPinned]);
    setRecentGroups((prevRecent) => [newGroup, ...prevRecent]);
  };

  const theme = useTheme();

  return (
    <>
      <Stack direction="row" sx={{ width: "10%" }}>
        {/* Left */}

        <Box
          sx={{
            height: "100vh",
             width: isDesktop ? 330 : "100vw",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" sx={{}} component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ overflowY: "scroll",flexGrow: 1, height: "100%"  ,
            
            '&::-webkit-scrollbar': { width: '8px' },
            '&::-webkit-scrollbar-track': { background: theme.palette.mode === 'light' ? '#F0F0F0' : '#3E3E3E' },
            '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '10px' },
            '&::-webkit-scrollbar-thumb:hover': { background: '#555' },
          }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}  >
                <Stack spacing={2.4}  >
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    Pinned
                  </Typography>
                  {/* Pinned Groups List */}
                
                  {pinnedGroups.map((el, idx) => (
                    <ChatElement   key={idx} {...el} />
                  ))}
               
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    Recent Groups
                  </Typography>
                  {/* Recent Groups List */}
                  {recentGroups.map((el, idx) => (
                    <ChatElement key={idx} {...el} />
                  ))}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
      </Stack>
      {openDialog && (
        <CreateGroup
          open={openDialog}
          handleClose={handleCloseDialog}
          onCreate={handleCreateGroup}
       
        />
      )}
    </>
  );
};

export default Group;
