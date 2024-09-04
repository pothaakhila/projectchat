

import React from 'react'

import { Box,Stack, useTheme } from '@mui/material';
import Conversation from '../../components/Conversation'
import Settings from './Settings';
//import Contact from '../../sections/Dashboard/Contact';

const Settingsgeneral = () => {
  const theme = useTheme();
  return (
    
   
<Stack direction={"row"} sx={{width:"90vw"}}>

<Settings />

<Box  sx={{height:"100%" ,position:"fixed",right:-1,width:"calc(100vw - 420px)", backgroundColor:theme.palette.mode === "light" ? "#edf0f0":theme.palette.background.default,
  
}}>{/*conversation*/}

<Conversation/>

</Box>
{/*contact*/}

</Stack>

  );
};

export default Settingsgeneral
