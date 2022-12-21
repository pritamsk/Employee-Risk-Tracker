import React, { useState } from "react";
import "./navbar.css";
import {Link, NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Button } from "@material-ui/core";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout1 from '@mui/icons-material/Logout';

// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';   //for spacing between buttons

const Navigation = props => {

  const [isOpen, setIsOpen] = useState(false);


  const name = props.name;
  const navigate = useNavigate ();
  const Logout = async () => {
    try {
      await axios.delete ('http://localhost:4000/logout');
      navigate ('/');
    } catch (error) {
      console.log (error);
    }
  };
  
  return (
    <div className="Navbar">
    {/* <span className="nav-logo">Employee Risk Tracker</span> */}
    <Typography variant="h6" noWrap
    style={{
      color:"white",
      marginLeft: "15px",
    }} >
            Employee Risk Tracker
          </Typography>
         
    <div className={`nav-items ${isOpen && "open"}`}>
      <NavLink style={({isActive})=>{return{color: isActive?'black':'white',fontWeight: isActive?'bold':''}}} to="/dashboard">Dashboard</NavLink>
      <NavLink style={({isActive})=>{return{color: isActive?'black':'white',fontWeight: isActive?'bold':''}}} to="/teamdetails">Team Info</NavLink>
      <NavLink style={({isActive})=>{return{color: isActive?'black':'white',fontWeight: isActive?'bold':''}}} to="/leaverecord">Leave Record</NavLink>
      <NavLink style={({isActive})=>{return{color: isActive?'black':'white',fontWeight: isActive?'bold':''}}} to="/resourcetable">Resource Table</NavLink>
    </div>
    <div
      className={`nav-toggle ${isOpen && "open"}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="bar"></div>
    </div>
    <div className="Navbar1" >
        {/* <h3 style={{color:"white",marginRight:"15px"}}>{name}</h3> */}
        <Button  
        disabled
   style={{color:"white",marginRight:"15px" ,textTransform: "capitalize" }}>
          <AccountCircle style={{marginRight:"5px",borderRadius:"10%"}}/>  {name}
          </Button>
    
    <Button 
    // className="btn-res" 
    style={{color:"white",backgroundColor:"red",fontSize:"10px"}}
    variant="outlined"
    size="small"
    sx={{ ml: 2 }}
      onClick={() => {
        localStorage.clear()
        navigate('/')
    }}
    startIcon={
      <Logout1 style={{marginRight:"5px"}}/>}
      >Logout</Button>
    </div>
  </div>
  );
 
};

export default Navigation;