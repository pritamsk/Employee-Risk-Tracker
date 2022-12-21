import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom'
import styles from "./styles.module.css";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Grid, Avatar} from '@material-ui/core';


function Login({setLogoutUser}) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
    const handleSubmit = () => {
        axios.post('http://localhost:4000/login',
            {
                email: email,
                password: password
            })
            .then(res => {
                console.log("resposnse data",res.data)

                if (res.data.code === 500) {
                    alert('User Not Found')
                }
                if (res.data.code === 404) {
                    alert('Password is wrong')
                }
                if (res.data.code === 200) {
                    // move to home
                    localStorage.setItem('login',true);
                    localStorage.setItem('TOKEN', res.data.token)
                    localStorage.setItem('EMAIL', res.data.email)


					navigate('/dashboard')
                }
            }).catch(err => {
                console.log(err)
            })

			var token = localStorage.getItem('TOKEN')
			const decoded_token= jwt_decode(token)
			const id=decoded_token.result.id;
			var userName = decoded_token.result.firstName
			// console.log(id,userName);
			
			
    }
    const avatarStyle={backgroundColor:'#1bbd7e'};
    return (
        <div className={styles.login_container}>
			<div className={styles.login_form_container}>
			
            	<div className={styles.left}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Login</h2>
                </Grid>
                
            <br></br>
        <TextField
            onChange={(e) => {
                setEmail(e.target.value)
            }}
            id="email"
          label="Email"
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email} /> 
            <br/>
    
        <TextField
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            id="password"
          label="Password"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            /> 
            <br></br>
            <br></br>
        <Button
        // id="myBtn"
        style={{ width: "100px" }}
       variant="contained"
          color="primary"
        type="submit" 
            onClick={handleSubmit}
            > Login </Button>
  
            </div>
		</div>
        </div>

    
    )
}


export default Login