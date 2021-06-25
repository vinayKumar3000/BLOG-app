import React from 'react'
import "./Header.css"

function Header() {
    return (
        <div className="header">
           <div className="headerTitles">
           <span className="headerTitlesLarge">Welcome</span>
           

           </div>
           <img 
           className="headerImage"
           src="https://www.hallaminternet.com/wp-content/uploads/2020/01/Is-blogging-relevant-anymore.jpeg" 
           alt="Vinay" />
        </div>
    )
}

export default Header
