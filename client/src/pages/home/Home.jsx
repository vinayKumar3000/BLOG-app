import React from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useState,useEffect } from 'react'
import "./Home.css"
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function Home() {

    const [posts,setPosts]=useState([]);
    const {search} = useLocation();

    console.log(search);
    useEffect(() =>{

        const fetchPosts= async () =>{
           const res=await axios.get('/posts'+search);
           console.log(res.data);
           setPosts(res.data);
        };
        fetchPosts();

    },[search]);

    return (<>
        
           <Header/>
           <div className="home">
               <Posts posts={posts}/>
               <Sidebar/>
           </div>
      </>
    )
}

export default Home