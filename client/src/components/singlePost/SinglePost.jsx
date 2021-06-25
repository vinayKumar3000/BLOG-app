import {React,useContext} from 'react'
import { useLocation } from 'react-router-dom'
import  './SinglePost.css'
import { useEffect,useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Context } from '../../context/Context'


function SinglePost() {
    const {user} = useContext(Context)
    const location=useLocation()
    const path=location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const [error,setError] = useState(false);
    const [title,setTitle] = useState("");
    const [desc,setDesc]=useState("");
    const [updateMode,setUpdateMode] = useState(false)
    const PF="http://localhost:5000/images/"

    const handleDelete= async()=>{

        try{
            if(post.username===user?.username)
            {
                await axios.delete(`/posts/${post._id}`,{
                    data:{
                        username: user.username
                    }  
                  });
                window.location.replace("/");
            }
        }catch{
            setError(true);
        }
    }
    const handleUpdate=async (e)=>{

        const updatedPost={
            title,desc,
        }
        console.log(updatedPost);

        try{
            const res=await axios.put(`/posts/${post._id}`,
                {
                   username:user.username,
                    title,
                    desc,
                }  
              );
            console.log(res.data);
            setPost(res.data);
            setUpdateMode(false);
            //window.location.reload();
        }catch(err){
            setError(true);
        }

    }
    useEffect(() => {
        const getPost=async ()=>{
            const res=await axios.get("/posts/"+path);
            console.log(res.data)
            setPost(res.data);
        }
       
        getPost();
       
    }, [path])
    return (
        <div className="singlePost">
           <div className="singlePostWrapper">
               {post.photo &&(<img className="singlePostImage" src={PF+post.photo}
                alt="vinay"  />)}
               {updateMode?(<div className="updateTitle">
                <input 
               onChange={(e) =>setTitle(e.target.value)}
               value={title}
               autoFocus
               placeholder="Update Title"
               type="text"/>
               </div>):(<h1 className="singlePostTitle">
                   {post.title}
                   {post.username===(user?.username)?( <div className="singlePostEdit">
                      <i  className="singlePostIcon far fa-edit" onClick={(e)=>setUpdateMode(true)}/>
                      <i onClick={handleDelete} className="singlePostIcon far fa-trash-alt"/>
                    </div>):""}
                   
                   
                </h1>)}
                
                <div className="singlePostInfo">
                    
                    <span className="singlePostAuthor">
                    Author:
                        <Link to={`/?user=${post.username}`} style={{textDecoration:"none",color:"inherit"}} className="link">
                        {post.username}
                        </Link>
                        
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {updateMode?(<div className="updateDesc"><textarea 
                placeholder="write a stroy"
                value={desc}
                onChange={(e) =>setDesc(e.target.value)}
                /></div>):( <p className="singlePostDesc">
                {post.desc}
                
                </p>)}
                <div className="updateWrapper">
                {updateMode?(<button className="updateButton" onClick={handleUpdate}>
                    Update
               </button> ):""}
                </div>
               
                {error}
           </div>
        </div>
    )
}

export default SinglePost
