import React from 'react'
import "./Sidebar.css"
import {useState,useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom"
function Sidebar() {
    const [cats, setCats] = useState([]);
    
    useEffect(() => {
       
        const getCats = async () => {
            const res= await axios.get("/categories")
            setCats(res.data);
        }
        getCats();

    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">
                    ABOUT ME
                </span>
                <img 
                className="sidebarImage"
                src="https://www.hdnicewallpapers.com/Walls/Big/Nature%20and%20Landscape/Beautiful_Sunrising_Nature_Image.jpg"
                 alt="vinay" />
                 <p className="about">
                    I am v vinayKumar.This website is made using react,mongo DB,nodejs.
                    This is a demo Blog project with all operations
                 </p>
            </div>
            <div className="sidebarItem">
               
                <span className="sidebarTitle">
                    Categories
                </span>
                <ul className="sidebarList">
                {cats.map((c)=>(<li key={c._id} className="SidebarListItem">
                    <Link style={{textDecoration:"none",color:"inherit"}} to={`/?cat=${c.name}`} className="link">
                    {c.name}
                    </Link>
                      
                    </li>))}
                    
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">
                  FOLLOW US
                </span>
                <div className="sidebarSocial">
                < i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>   
        </div>
    )
}

export default Sidebar
