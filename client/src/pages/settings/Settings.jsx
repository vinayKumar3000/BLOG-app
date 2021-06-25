import React from 'react'
import "./Settings.css"
import Sidebar from "../../components/sidebar/Sidebar"
import {useContext,useState} from "react"
import axios from "axios"
import { Context } from '../../context/Context';
function Settings() {
    const {user,dispatch}=useContext(Context);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [success,setSuccess] = useState(false)
    const [file, setFile] = useState(null);
    const PF="http://localhost:5000/images/"
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId:user._id,
      username,
      password,
      email,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload/", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/"+user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS", payload:res.data})
      console.log(res.data);
      //window.location.reload();
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"});
    }
  };

console.log("settings"+user);
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">
                        Update Account
                    </span>
                    <span className="settingsDeleteTitle">
                        Delete Account
                    </span>
                </div>
                <form  className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture:</label>
                    <div className="settingsPP">
                        {(<img className="settingsPPImage" src={file?(URL.createObjectURL(file)):PF+user.profilePic} 
                        alt="vinay" />)}
                        
                        <label htmlFor="fileInput">
                           <i className="settingsPPIcon fa fa-user-circle"/>    
                        </label>
                        <input onChange={(e)=>{setFile(e.target.files[0])}} type="file" id="fileInput" style={{display:"none"}}/>   
                    </div>
                    <label>
                           Username 
                     </label>
                    <input onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder={user.username}/>
                    <label  >
                           Email    
                     </label>
                     <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder={user.email}/>
                    <input 
                    onChange={(e)=>setPassword(e.target.value)} 
                    type="password" placeholder="Enter Password"/>

                    <button className="settingsSubmit" type="submit">Update</button>

                    {success&&<div className="success">"Profile has been Updated"</div>}
                   
                </form>
               
                            </div>
            <Sidebar/>
        </div>
    )
}

export default Settings
