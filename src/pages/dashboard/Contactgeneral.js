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
import Contact from '../../sections/Dashboard/Contact';

const Contactgeneral = () => {
  const theme = useTheme();
  return (
    
   
<Stack direction={"row"} sx={{width:"100vw"}}>

<Contact />

<Box  sx={{height:"100%" ,width:"calc(100vw - 420px)", backgroundColor:theme.palette.mode === "light" ? "#edf0f0":theme.palette.background.default,}}>
{/*conversation*/}

<Conversation/>

</Box>
{/*contact*/}

</Stack>

  );
};

export default Contactgeneral
