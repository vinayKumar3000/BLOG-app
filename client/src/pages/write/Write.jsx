import React from 'react'
import { Context } from '../../context/Context';
import "./Write.css"
import {useContext,useState} from "react"
import axios from "axios"


function Write() {
    const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("posts/", newPost);
      console.log(res.data);
      window.location.replace("post/" + res.data._id);
    } catch (err) {}
  };

    return (
        <div className="write">
            {file &&( <img 
            src={URL.createObjectURL(file)}
             alt=""
              className="writeImage" />)}
           
             <form onSubmit={handleSubmit} className="writeForm">
                 <div className="writeFormGroup">
                     <label htmlFor="fileInput">
                     <i className="fileInputIcon fas fa-plus"/>    
                     </label>
                     <input type="file"
                     onChange={(e)=>(setFile(e.target.files[0]))}
                     id="fileInput" style={{display:"none"}}/>
                     <input onChange={(e)=>setTitle(e.target.value)} className="writeInput" type="text" placeholder="Title" autoFocus={true} />
                 </div>
                 <div className="writeFormGroup textarea">
                     <textarea onChange={(e)=>setDesc(e.target.value)} type="text" placeholder="write your story"
                     className="writeInput writeText"/>

                     
                 </div>
                 <button className="writeSubmit"
                 type="submit"
                 >Publish</button>
             </form>
        </div>
    )
}

export default Write
