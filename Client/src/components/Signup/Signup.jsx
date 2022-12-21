import React,{ useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
const Signup =async (e) => {
	e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
        navigate("/");
        } catch (error) {
			if (
				error.response 
				
				) {
				setMsg(error.response.data.msg);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
							<div className={styles.right}>
					<form className={styles.form_container} onSubmit={Signup}>
						<h1 style={{color:"black",fontSize:"40px"}}>Create Account</h1>
						<input
							className={styles.input}
							type="text"
							placeholder="Full Name"
							name="fullName"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							name="password"
							onChange={(e) => setConfPassword(e.target.value)}
							value={confPassword}
							required
							className={styles.input}
						/>
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
						<Link to="/">
						<button type="button" className={styles.green_btn}>
							Sign in
						</button>
					</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
