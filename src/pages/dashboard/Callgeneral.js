

import React from 'react'

import { Box,Stack, useTheme } from '@mui/material';
import Conversation from '../../components/Conversation'
import Call from './Call';

const Callgeneral = () => {
  const theme = useTheme();
  return (
    
   
<Stack direction={"row"} sx={{width:"100vw"}}>

<Call />

<Box  sx={{position:"fixed",right:0,height:"100%" ,width:"calc(100vw - 420px)", backgroundColor:theme.palette.mode === "light" ? "#edf0f0":theme.palette.background.default,}}>
{/*conversation*/}

<Conversation/>

</Box>
{/*contact*/}

</Stack>

  );
};

export default Callgeneral
