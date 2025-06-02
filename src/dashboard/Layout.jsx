// src/Layout.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from './component/Header';
import { UserButton } from '@clerk/clerk-react';
import { Outlet } from "react-router-dom";
import Robot from '../../src/Robot.svg'
import Welcome from './component/Welcome';

const Layout = ({ children }) => {
  return (
    <Container>
        <Header ></Header>
       
            <Welcome></Welcome>


            <Outlet/> 










       


      {/* <Typography variant="h4" gutterBottom>
        Dashboard Layout
      </Typography> */}
      {children}
    </Container>
  );
};

export default Layout;
