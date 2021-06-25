import React from 'react'
import "./Register.css"
import {Link} from "react-router-dom"
import {useState} from "react"
import axios from "axios"
function Register() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [err,setErr]=useState(false);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {

            const res=await axios.post("/auth/register",{
                username,
                password,
                email
            })
            console.log(res.data);
            res.data && window.location.replace("/login");
        }catch(err){
            setErr(true);
        }
        
        
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form  
            onSubmit={handleSubmit}
            className="registerForm">
                <label >Username:</label>
                <input 
                onChange={(e)=>setUsername(e.target.value)}
                type="text" placeholder="Enter your email..." />
                <label >Email:</label>
                <input 
                onChange={(e)=>setEmail(e.target.value)}
                type="text" placeholder="Enter your email..." />
                <label >
                    Password:
                </label>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                type="password" placeholder="Enter your password..." />
                <button type="submit" className="registerButton">
                Register 
                </button>
                <span className="error"> {err?"something went wrong":""}</span>
               
            </form>
                
            <button className="registerLoginButton">
            <Link style={{textDecoration:"none",color:"inherit"}} className="link " to="/login">Already Registerd ? Login
            </Link>
            </button>
        </div>
    )
}

export default Register
