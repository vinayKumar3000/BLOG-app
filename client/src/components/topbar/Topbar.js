import React from 'react'
import "./Topbar.css"
import {Link} from "react-router-dom";
import {useContext} from 'react'
import { Context } from '../../context/Context';
//"https://www.hdnicewallpapers.com/Walls/Big/Nature%20and%20Landscape/Beautiful_Sunrising_Nature_Image.jpg"
function Topbar() {
    const {user,dispatch} = useContext(Context);
    const PF="http://localhost:5000/images/"
    const handleLogout=(e)=> {
        dispatch({type: "LOGOUT"});
    }
    return (
        <div className="top">
            <div className="topLeft">
             
             <i className="topIcon fab fa-facebook-square"></i>
             <i className="topIcon fab fa-twitter-square"></i>
             <i className="topIcon fab fa-facebook-square"></i>
             <i className="topIcon fab fa-twitter-square"></i>
            </div> 
            <div className="topCenter">
            
             <ul className="topList">
               <li className="topListItem">
                   <Link className="link" style={{textDecoration:"none",color:"inherit"}} to="/">Home </Link>
                </li>
              
              
               <li className="topListItem">
               <Link className="link" style={{textDecoration:"none",color:"inherit"}} to="/write">Create</Link>
               </li>
               <li className="topListItem" onClick={handleLogout}>
                {user&&"Logout"} 
               </li>
             </ul>           
            </div> 
            
            <div className="topRight">
                {user?(<Link to="/settings">
                    <img className="topImage"
               src={PF+user.profilePic}
               alt="vinay"/>
                </Link>):(<><Link style={{textDecoration:"none",color:"inherit"}} className="link topListItem" to="/login">Login</Link>
               <Link style={{textDecoration:"none",color:"inherit"}} className="link topListItem" to="/register">Register </Link></>) }
               
               <i className="topSearchIcon fas fa-search"></i>
            </div> 
        </div>
    )
}

export default Topbar
