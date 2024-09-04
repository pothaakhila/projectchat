

import React from 'react';

import { Box, Stack, useTheme } from '@mui/material';
import ChatPage from './ChatPage';
import Chats from './Chats';

const Chatgeneral = () => {
  const theme = useTheme();
  return (
    
   
<Stack direction={"row"} sx={{width:"100vw"}}>

<Chats />

<Box  sx={{position:"fixed",right:0,height:"100%" ,width:"calc(100vw - 420px)", backgroundColor:theme.palette.mode === "light" ? "#edf0f0":theme.palette.background.default,}}>
{/*conversation*/}

<ChatPage/>

</Box>
{/*contact*/}

</Stack>

  );
};

export default Chatgeneral
