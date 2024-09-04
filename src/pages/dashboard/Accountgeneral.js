
import React from 'react';

import { Box, Stack, useTheme } from '@mui/material';
import Conversation from '../../components/Conversation';
import Account from "./Account";

const Accountgeneral = () => {
  const theme = useTheme();
  return (
    
   
<Stack direction={"row"} sx={{width:"100vw"}}>

<Account/>

<Box  sx={{position:"fixed",mr:0,right:0,height:"100%" ,width:"calc(99vw - 420px)", backgroundColor:theme.palette.mode === "light" ? "#edf0f0":theme.palette.background.default,}}>
{/*conversation*/}

<Conversation/>

</Box>
{/*contact*/}

</Stack>

  );
};

export default Accountgeneral
