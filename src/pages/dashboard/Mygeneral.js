/*
import React,{Suspense,lazy} from "react";

const Cat = lazy(() => import ("../../components/Cat"));
const GeneralApp = () => {

  return (
    <>
      <Suspense fallback="Loading...">
        <Cat/>
      </Suspense>
    </>
  );
};

export default GeneralApp;
*/

import React from 'react'

import { Box,Stack, useTheme } from '@mui/material';
import Conversation from '../../components/Conversation'
import MyProfile from './MyProfile'
import Profile from './Settings/Profile';
const Mygeneral = () => {
  const theme = useTheme();
  return (
    
   
<Stack direction={"row"} sx={{width:"100vw"}}>


<Profile/>
<Box  sx={{height:"100%" , position:"fixed",mr:-3,right:24,width:"calc(100.5vw - 420px)", backgroundColor:theme.palette.mode === "light" ? "#edf0f0":theme.palette.background.default,}}>
{/*conversation*/}

<Conversation/>

</Box>
{/*contact*/}

</Stack>

  );
};

export default Mygeneral
