import React, { useState } from 'react';
import logo from '../../../public/logo.svg';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { UserButton } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false); // Close drawer after navigation
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo on the left */}
          <Box display="flex" alignItems="center">
            <img
              src={logo}
              alt="logo"
              style={{
                height: '40px',
                marginRight: '8px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            />
          </Box>

          {/* Center Links or Menu */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            gap={2}
          >
            {!isMobile && (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    cursor: 'pointer',
                    textDecoration: location.pathname === '/dashboard' ? 'underline' : 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={() => handleNavigate('/dashboard')}
                >
                  Dashboard
                </Typography>


                <Button variant="contained" color="primary" onClick={() => handleNavigate('/upgrade')}>
                  Upgrade
                </Button>
              </>
            )}
          </Box>

          {/* Right: UserButton or Mobile Menu */}
          <Box>
            {isMobile ? (
              <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <UserButton />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for small screens */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            <ListItem button onClick={() => handleNavigate('/dashboard')}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate('/question')}>
              <ListItemText primary="Question" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate('/upgrade')}>
              <ListItemText primary="Upgrade" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
