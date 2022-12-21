import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import axiox from "axios"; //similar to fetch()
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Grid, Avatar, Card, CardContent } from "@material-ui/core";
import { useEffect } from "react";

import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "45ch",
      width: "30ch",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success,setSuccess]= useState(false);
  const navigate = useNavigate();

  useEffect(() =>{
    userRef.current.focus();
  },[])

  useEffect(() =>{
    setError('');
  },[email,password])  

  const login = (e) => {
    e.preventDefault();
    axiox
      .post("http://localhost:4000/login/", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.config.data));

        // let userDetails = JSON.parse(localStorage.getItem('user'));

        console.log("response", response);
        localStorage.setItem("token", response.data.token);

        console.log(response.config.data);

        // localStorage.setItem("login1",
        //   JSON.stringify({
        //       // userLogin: true,
        //       id:response.config.id,
        //       res:response.config.data,//here we need to add local storage varibles that can print the data
        //     }));

        setError("");
        setEmail("");
        setPassword("");
        // setLogoutUser(false);
        navigate("/Dashboard");
      })
      .catch((error) => setError(error.response.data.message));
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <div
      align="center"
      style={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >
      <Card
        sx={{ overflow: "visible" }}
        variant="outlined"
        style={{ width: "30vw", height: "65vh" }}
      >
        <CardContent>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Login</h2>
          </Grid>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={login}
          >
            <TextField
              id="username"
              label="Username"
              type="text"
              ref={userRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button
              style={{ width: "100px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>
          <p>
            Don't have an account then please do{" "}
            <Link to="/register">Register</Link> yourself
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
