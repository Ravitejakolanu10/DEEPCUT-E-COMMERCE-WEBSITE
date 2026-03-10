import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

function Login() {

    const [userEmail , setUserEmail] = useState("");
    const [userPassword , setUserPassword] = useState("");
    const navigate = useNavigate();

    const verifyUser = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                "https://deepcut-e-commerce-website.onrender.com/api/user-login",
                { userEmail, userPassword }
            );

            if(res.data.user){
                alert(res.data.message);
                localStorage.setItem("userId", res.data.user._id);
                navigate("/homepage");
            }

        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    }

    return (

<div className="login-page">
        
        <div className="login-container">

            <form className="login-card" onSubmit={verifyUser}>

                <h2>Sign In</h2>

                <label>Email Address</label>
                <input
                    type="email"
                    placeholder="Enter your Email"
                    value={userEmail}
                    required
                    onChange={(e)=>setUserEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your Password"
                    value={userPassword}
                    required
                    onChange={(e)=>setUserPassword(e.target.value)}
                />

                <button type="submit">Login</button>

                <p className="signup-text">
                    New customer? <a href="/register">Create account</a>
                </p>

            </form>

        </div>
        </div>
    )
}

export default Login
