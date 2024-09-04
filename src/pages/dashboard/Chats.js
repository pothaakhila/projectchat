/*
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import BottomNav from "../../layouts/dashboard/BottomNav";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";
import Friends from '../../sections/Dashboard/Friends';

// Cards items
const items = [
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg",
    name: "Patrick",
  },
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg",
    name: "Doris",
  },
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-5.a5c59cee7b3dfda1156d.jpg",
    name: "Emily",
  },
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-6.dc44eabff29dbd9780cb.jpg",
    name: "Steve",
  },
];

const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();
  const { conversations = [] } = useSelector((state) => state.conversation?.direct_chat || {});

  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id: window.localStorage.getItem("user_id") }, (data) => {
      console.log(data); // this data is the list of conversations
      dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the chat list based on the search term
  const filteredChats = ChatList.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCard = ({ name }) => (
    <Box
      sx={{
        width: 55,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 0.5,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: 1,
        textAlign: 'center',
        mb: 3,
      }}
    >
      <Typography variant="caption" sx={{ fontSize: '0.75rem', color: theme.palette.text.primary }}>
        {name}
      </Typography>
    </Box>
  );

  const renderImage = ({ imgSrc }) => (
    <Box
      sx={{
        width: 35,
        height: 35,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${theme.palette.divider}`,
        position: 'relative',
        bottom: 120,
      }}
    >
      <img
        src={imgSrc}
        alt="avatar"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: 'green',
          position: 'absolute',
          bottom: 2,
          right: 3,
          border: `2px solid ${theme.palette.background.paper}`,
        }}
      />
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: isDesktop ? 330 : "100vw",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        {!isDesktop && (
          // Bottom Nav
          <BottomNav />
        )}

        <Stack p={3} spacing={2} sx={{ maxHeight: "100vh", overflow: "hidden" }}>
          <Stack
            alignItems={"center"}
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h5">Chats</Typography>

            <Stack direction={"row"} alignItems="center" spacing={1}>
              <IconButton
                onClick={handleOpenDialog}
                sx={{ width: "max-content" }}
              >
                <Users />
              </IconButton>
              <IconButton sx={{ width: "max-content" }}>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction={"row"} spacing={1.5} alignItems="center">
              <Stack
                sx={{
                  padding: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ mt: 3 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="space-between">
                    {items.map((item, index) => (
                      <Box key={index} sx={{ margin: '4px' }}>
                        {renderCard(item)}
                      </Box>
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {items.map((item, index) => (
                      <Box key={index} sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', margin: '0.5%' }}>
                        {renderImage(item)}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={{ flexGrow: 1, overflowY: "scroll", position: "relative" ,bottom:90
            ,
            '&::-webkit-scrollbar': { width: '8px' },
            '&::-webkit-scrollbar-track': { background: theme.palette.mode === 'light' ? '#F0F0F0' : '#3E3E3E' },
            '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '10px' },
            '&::-webkit-scrollbar-thumb:hover': { background: '#555' },
          }}>
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={2.4} sx={{ paddingBottom: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                  Recent
                </Typography>
               
                {filteredChats.filter((el) => el.pinned).length > 0 ? (
                  filteredChats.filter((el) => el.pinned).map((el, idx) => (
                    <ChatElement key={idx} {...el} />
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "#676667" }}>
                    No results found in Recent Chats
                  </Typography>
                )}
                <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                  All Chats
                </Typography>
                
                {filteredChats.filter((el) => !el.pinned).length > 0 ? (
                  filteredChats.filter((el) => !el.pinned).map((el, idx) => (
                    <ChatElement key={idx} {...el} />
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "#676667" }}>
                    No results found in All Chats
                  </Typography>
                )}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;

*/

// src/pages/Chats.js

import {
  Box,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  CircleDashed,
  MagnifyingGlass,
  Users,
} from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ChatElement from '../../components/ChatElement';
import ProfileCard from '../../components/Conversation/ProfileCard'; // Import the ProfileCard component
import { SimpleBarStyle } from '../../components/Scrollbar';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/Search';
import { ChatList } from '../../data';
import useResponsive from '../../hooks/useResponsive';
import BottomNav from '../../layouts/dashboard/BottomNav';
import { FetchDirectConversations } from '../../redux/slices/conversation';
import { connectSocket, socket } from '../../socket';
import Friends from '../../sections/Dashboard/Friends';

// Cards items
const items = [
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg",
    name: "Patrick",
  },
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-4.b23e41d9c09997efbc21.jpg",
    name: "Doris",
  },
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-5.a5c59cee7b3dfda1156d.jpg",
    name: "Emily",
  },
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-6.dc44eabff29dbd9780cb.jpg",
    name: "Steve",
  },
];

const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { conversations = [] } = useSelector((state) => state.conversation?.direct_chat || {});
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeProfile, setActiveProfile] = useState(null);

  const { user } = useSelector((state) => state.app);

  useEffect(() => {
    if (user) {
      connectSocket(user.id); // Ensure the socket is connected with user_id
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.emit('get_direct_conversations', { user_id: window.localStorage.getItem('user_id') }, (data) => {
        console.log(data); // this data is the list of conversations
        dispatch(FetchDirectConversations({ conversations: data }));
      });
    } else {
      console.error('Socket is not initialized');
    }
  }, [dispatch]);

  useEffect(() => {
    socket.emit('get_direct_conversations', { user_id: window.localStorage.getItem('user_id') }, (data) => {
      console.log(data); // this data is the list of conversations
      dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProfileClick = () => {
    setActiveProfile(user); // Set the active profile to the logged-in user
    navigate('/chatgeneral'); // Navigate to the ChatPage
  };

  // Filter the chat list based on the search term
  const filteredChats = ChatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCard = ({ name }) => (
    <Box
      sx={{
        width: 55,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 0.5,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: 1,
        textAlign: 'center',
        mb: 3,
      }}
    >
      <Typography variant="caption" sx={{ fontSize: '0.75rem', color: theme.palette.text.primary }}>
        {name}
      </Typography>
    </Box>
  );

  const renderImage = ({ imgSrc }) => (
    <Box
      sx={{
        width: 35,
        height: 35,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${theme.palette.divider}`,
        position: 'relative',
        bottom: 120,
      }}
    >
      <img
        src={imgSrc}
        alt="avatar"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: 'green',
          position: 'absolute',
          bottom: 2,
          right: 3,
          border: `2px solid ${theme.palette.background.paper}`,
        }}
      />
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: isDesktop ? 330 : '100vw',
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F8FAFF'
              : theme.palette.background,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        {!isDesktop && (
          // Bottom Nav
          <BottomNav />
        )}

        <Stack p={3} spacing={2} sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
          <Stack
            alignItems={'center'}
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h5">Chats</Typography>

            <Stack direction={'row'} alignItems="center" spacing={1}>
              <IconButton
                onClick={handleOpenDialog}
                sx={{ width: 'max-content' }}
              >
                <Users />
              </IconButton>
              <IconButton sx={{ width: 'max-content' }}>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: '100%' }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction={'row'} spacing={1.5} alignItems="center">
              <Stack
                sx={{
                  padding: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ mt: 3 }}>
                 
                  <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="space-between">
                    {items.map((item, index) => (
                      <Box key={index} sx={{ margin: '4px' }}>
                        {renderCard(item)}
                      </Box>
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {items.map((item, index) => (
                      <Box key={index} sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', margin: '0.5%' }}>
                        {renderImage(item)}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={{ flexGrow: 1, overflowY: 'scroll', position: 'relative', bottom: 60 }}>
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={2.4} sx={{ paddingBottom: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#676667' }}>
                  Recent
                </Typography>
                <ProfileCard onClick={handleProfileClick} />
                {filteredChats.filter((el) => el.pinned).length > 0 ? (
                  filteredChats.filter((el) => el.pinned).map((el, idx) => (
                    <ChatElement key={idx} {...el} />
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#676667' }}>
                    No results found in Recent Chats
                  </Typography>
                )}
                <Typography variant="subtitle2" sx={{ color: '#676667' }}>
                  Conversations
                </Typography>
                {filteredChats.length > 0 ? (
                  filteredChats.map((el, idx) => (
                    <ChatElement key={idx} {...el} />
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#676667' }}>
                    No results found in Conversations
                  </Typography>
                )}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;

/*
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { CircleDashed, MagnifyingGlass, Users } from 'phosphor-react';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import BottomNav from '../../layouts/dashboard/BottomNav';
import { ChatList } from '../../data';
import ChatElement from '../../components/ChatElement';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { socket, connectSocket } from '../../socket'; // Import connectSocket
import { useDispatch, useSelector } from 'react-redux';
import { FetchDirectConversations } from '../../redux/slices/conversation';
import Friends from '../../sections/Dashboard/Friends';
import ProfileCard from '../../components/Conversation/ProfileCard';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    imgSrc: "http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg",
    name: "Patrick",
  },
  // Other items...
];

const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { conversations = [] } = useSelector((state) => state.conversation?.direct_chat || {});
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeProfile, setActiveProfile] = useState(null);

  const { user } = useSelector((state) => state.app);

  useEffect(() => {
    if (user) {
      connectSocket(user.id); // Ensure the socket is connected with user_id
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.emit('get_direct_conversations', { user_id: window.localStorage.getItem('user_id') }, (data) => {
        console.log(data); // this data is the list of conversations
        dispatch(FetchDirectConversations({ conversations: data }));
      });
    } else {
      console.error('Socket is not initialized');
    }
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProfileClick = () => {
    setActiveProfile(user);
    navigate('/chatpage');
  };

  const filteredChats = ChatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCard = ({ name }) => (
    <Box
      sx={{
        width: 55,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 0.5,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: 1,
        textAlign: 'center',
        mb: 3,
      }}
    >
      <Typography variant="caption" sx={{ fontSize: '0.75rem', color: theme.palette.text.primary }}>
        {name}
      </Typography>
    </Box>
  );

  const renderImage = ({ imgSrc }) => (
    <Box
      sx={{
        width: 35,
        height: 35,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${theme.palette.divider}`,
        position: 'relative',
        bottom: 120,
      }}
    >
      <img
        src={imgSrc}
        alt="avatar"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: 'green',
          position: 'absolute',
          bottom: 2,
          right: 3,
          border: `2px solid ${theme.palette.background.paper}`,
        }}
      />
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: isDesktop ? 330 : '100vw',
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F8FAFF'
              : theme.palette.background,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        {!isDesktop && (
          <BottomNav />
        )}

        <Stack p={3} spacing={2} sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
          <Stack
            alignItems={'center'}
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h5">Chats</Typography>

            <Stack direction={'row'} alignItems="center" spacing={1}>
              <IconButton
                onClick={handleOpenDialog}
                sx={{ width: 'max-content' }}
              >
                <Users />
              </IconButton>
              <IconButton sx={{ width: 'max-content' }}>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: '100%' }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction={'row'} spacing={1.5} alignItems="center">
              <Stack
                sx={{
                  padding: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ mt: 3 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="space-between">
                    {items.map((item, index) => (
                      <Box key={index} sx={{ margin: '4px' }}>
                        {renderCard(item)}
                      </Box>
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {items.map((item, index) => (
                      <Box key={index} sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', margin: '0.5%' }}>
                        {renderImage(item)}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Stack>

          <Stack sx={{ flexGrow: 1, overflowY: 'scroll', position: 'relative', bottom: 60 }}>
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={1}>
                {conversations?.length > 0 ? (
                  conversations.map((chat, index) => (
                    <ChatElement key={index} chat={chat} />
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No conversations found
                  </Typography>
                )}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
        {openDialog && (
          <Friends
            open={openDialog}
            onClose={handleCloseDialog}
            onProfileClick={handleProfileClick}
          />
        )}
      </Box>
    </>
  );
};

export default Chats;
*/