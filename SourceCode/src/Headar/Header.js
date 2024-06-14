import { React, useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Logo from '../Images/nippon.svg'; // Import your logo
import '../Headar/Header.css';
import { Link, Route, Routes } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { MouseEvent } from 'react';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Fade from '@mui/material/Fade';
import zIndex from "@mui/material/styles/zIndex";
import { SwipeableDrawer } from '@mui/material';
import { Badge } from "react-bootstrap";
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserContext from "../Context/UserContext";
function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header1');
      const navbar = document.querySelector('.navbar');


      if (window.scrollY > 0) {
        header.classList.add('shrink');
        navbar.classList.add('shrink');
      } else {
        header.classList.remove('shrink');
        navbar.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { userDetails, login, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = () => {
    setAnchor(!anchor);
  };




  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <header>
        <div id="header1">
          <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <Link to="/Dashboard" style={{ margin:0}}> */}
            <img src={Logo} alt="Logo" style={{ width: '180px', height: '40px', marginLeft: '50px', paddingTop: '2px' }} /> {/* Logo */}

            <div style={{ display: 'flex' }}>
              <span sx={{  fontFamily: 'Arial', fontWeight: 'bold' }}> Welcome : {userDetails.empname}</span>
          
              <Button color="inherit" sx={{ color: '#1A005D', fontFamily: 'Arial', fontWeight: 'bold' }}>Home</Button>
              <Button color="inherit" sx={{ color: '#1A005D', fontFamily: 'Arial', fontWeight: 'bold' }}>About</Button>
              <Button color="inherit" sx={{ color: '#1A005D', fontFamily: 'Arial', fontWeight: 'bold' }}>Services</Button>
              <Button color="inherit" sx={{ color: '#1A005D', fontFamily: 'Arial', fontWeight: 'bold' }}>Contact</Button>




            </div>



            <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ paddingRight: '8px' }}

                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                sx={{ zIndex: '99999' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>

            <Button onClick={toggleDrawer}>Click me</Button>


            <SwipeableDrawer
              anchor="right" // Specify the anchor position here
              open={anchor}
              onClose={() => setAnchor(false)}
              onOpen={() => setAnchor(true)}
              sx={{ width: '500px' }}
            >
              {/* Drawer content */}
              <h1>this is right bar </h1>
            </SwipeableDrawer>



          </div>
        </div>

      </header>
    </>
  );
}

export default Header;
