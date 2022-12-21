import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
// import { Link } from 'react-router-dom';
// import { Container } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import { Login } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import {useNavigate,Link,NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';
const drawerWidth = 240;

 const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// export default function PersistentDrawerLeft() {
    const Navigation = props => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const name = props.name;
  const Logout = async () => {
    try {
      await axios.delete ('http://localhost:4000/logout');
      navigate ('/');
    } catch (error) {
      console.log (error);
    }
  };



  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const StyledHomeIcon = styled(HomeIcon,{
    name: "StyledHomeIcon",
    slot: "Wrapper"
  })({
    color: "#1e90ff",
    "&:hover": { color: "blue" }
  });

  const StyledPersonIcon = styled(PersonIcon,{
    name: "StyledHomeIcon",
    slot: "Wrapper"
  })({
    color: "#1e90ff",
    "&:hover": { color: "blue" }
  });

  const StyledVaccinesIcon = styled(VaccinesIcon,{
    name: "StyledHomeIcon",
    slot: "Wrapper"
  })({
    color: "#1e90ff",
    "&:hover": { color: "blue" }
  });
 
   return (
    // <Container>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Employee Risk Tracker
          </Typography>
          <div style={{
            marginLeft: "auto",
          }}>
        {/* this is for logout button  */}
         <Button
         disabled
         id="basic-button" 
         style={{marginRight:"15px",color:"white"}}
        size="small"
        sx={{ ml: 2 }}
       ><AccountBoxIcon style={{marginRight:"5px"}}/>
        {name}
      </Button> 
      {/* <Button
        id="basic-button" style={{color:"white",backgroundColor:"red",fontSize:"8px"}}
        onClick={() => {
            localStorage.clear()
            navigate('/')
        }}
        variant="outlined"
        size="small"
        sx={{ ml: 2 }}
        // aria-controls={open ? 'account-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
 
      ><Logout style={{marginRight:"5px"}}/>
      logout
      </Button> */}
      {/* <Logout style={{marginRight:"5px"}}/> */}
       <Button 
        id="basic-button" style={{color:"white",backgroundColor:"red",fontSize:"8px"}}
        variant="outlined"
        size="small"
        sx={{ ml: 2 }}
    //    className="btn-res" 
      onClick={() => {
        localStorage.clear()
        navigate('/')
    }}
      >Logout</Button>
     
      
          </div>
        </Toolbar>
      </AppBar>
{/* end of app Bar */}

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
{/* dashboard button */}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StyledHomeIcon/>
              </ListItemIcon>
              {/* <ListItemText primary="Dashboard" /> */}

                 <NavLink style={({ isActive }) => {
                     return{
                         display: "block",
                         margin: "1rem 0",
                         color: isActive ? "red" : "",
                        };
                    }} to="/dashboard" >Dashboard</NavLink>

            {/* <Link to="/Dashboard" style={{ textDecoration: 'none',color:"#1e90ff"}} >Dashboard</Link> */}
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />
        {/* Team Info button */}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StyledPersonIcon/>
                {/* <PersonIcon /> */}
              </ListItemIcon>
              {/* <ListItemText primary="User" /> */}
              <NavLink style={({ isActive }) => {
              return{
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }} to="/teamdetails" >Team Info</NavLink>
            
              {/* <Link to="/teamdetails" style={{ textDecoration: 'none',color:"#1e90ff"}} >Team Info</Link> */}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StyledVaccinesIcon/>
                {/* <VaccinesIcon /> */}
              </ListItemIcon>
              {/* <ListItemText primary="Vaccinated" /> */}
              {/* <Link to="/leaverecord" style={{ textDecoration: 'none',color:"#1e90ff"}} >Leave Record</Link> */}
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      {/* <Main open={open}>
        {/* <DrawerHeader /> */}
        {/* <Dashboard/> */}
        
      {/* </Main>  */}
    </Box>
    // </Container>
  );
}

export default Navigation;