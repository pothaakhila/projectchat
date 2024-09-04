

import React from 'react'
import Chats from './Chats'
import { Box,Stack, useTheme,Typography } from '@mui/material';
import Conversation from '../../components/Conversation'
import NoChat from "../../assets/Illustration/NoChat";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

const GeneralApp = () => {
  const theme = useTheme();

  const [searchParams] = useSearchParams();



  const { sideBar, room_id, chat_type } = useSelector((state) => state.app);

  return (
    
   
<Stack direction={"row"} sx={{width:"100vw"}}>

<Chats />

<Box  sx={{height:"100%" ,width:"calc(100vw - 420px)", backgroundColor:theme.palette.mode === "light" ? "#edf0f0":theme.palette.background.default,
  
}}>

{chat_type === "individual" &&
          room_id !== null ? (
            <Conversation />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>
          )}


</Box>


</Stack>

  );
};

export default GeneralApp




