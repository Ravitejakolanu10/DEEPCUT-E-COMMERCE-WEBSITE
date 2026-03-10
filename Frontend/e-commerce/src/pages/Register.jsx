import axios from 'axios';
import React, { useState } from 'react'
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const [userName , setUserName] = useState("");
    const [userEmail , setUserEmail] = useState("");
    const [userPhone , setUserPhone] = useState("");
    const [userPassword , setUserPassword] = useState("");
    const [verifyPassword , setVerifyPassword] = useState("");
    const navigate = useNavigate();

    const userRegister = async (e) => {
    e.preventDefault();

    try {

        if(userPassword !== verifyPassword){
            alert("Confirm password is wrong");
            return;
        }

        const res = await axios.post(
            "http://localhost:5000/api/user-register",
            { userName, userEmail, userPhone, userPassword }
        );

        alert(res.data.message);

        navigate("/login");

        setUserName("");
        setUserEmail("");
        setUserPhone("");
        setUserPassword("");
        setVerifyPassword("");

    } catch (error) {

        console.error(error);

        if(error.response){
            alert(error.response.data.message);
        }else{
            alert("Server Error");
        }

    }
};
    return (
        <div className="register-container">

            <form className="register-card" onSubmit={userRegister}>

                <h2>Create Account</h2>

                <label>Username</label>
                <input type="text" placeholder="Enter your Name"
                value={userName} required
                onChange={(e)=>setUserName(e.target.value)} />

                <label>Email Address</label>
                <input type="email" placeholder="Enter your Email"
                value={userEmail} required
                onChange={(e)=>setUserEmail(e.target.value)} />

                <label>Mobile Number</label>
                <input type="text" placeholder="Enter your Mobile Number"
                value={userPhone} required
                onChange={(e)=>setUserPhone(e.target.value)} />

                <label>Create Password</label>
                <input type="password" placeholder="Create Password"
                value={userPassword} required
                onChange={(e)=>setUserPassword(e.target.value)} />

                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password"
                value={verifyPassword} required
                onChange={(e)=>setVerifyPassword(e.target.value)} />

                <button type="submit">Create Account</button>

                <p className="login-text">
                    Already have an account?<Link to="/login" >Sign In </Link>
                </p>

            </form>

        </div>
    )
}

export default Register