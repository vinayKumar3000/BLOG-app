const router = require('express').Router();

const Post =require("../models/Post");
const User= require("../models/User");


//post POST 
router.post("/",async (req,res)=>{
    
    
    try{
        const newPost=new Post(req.body);
        console.log(newPost);
        const savedPost=await newPost.save();
        console.log(savedPost);
        res.status(200).json(savedPost);
    }catch(err){
        console.log(err.message);
        res.status(500).json(err);
    }
}
)

//DELETE POST
router.delete("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.username=== req.body.username){
            try{
                await post.delete();
                res.status(200).json("your post has been deleted");
            }catch(err){
                res.status(500).json(err)
            }
        }else
        {
            res.status(401).json("you cannot update post")
        }
    }
    catch(err){
        res.status(500).json(err)
    }  
}
);


//Update Post
router.put("/:id",async (req,res)=>{
        try{
            console.log(req.body);
            console.log(req.params.id);
            const post=await Post.findById(req.params.id);
            if(post.username=== req.body.username){
                try{
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                        $set:req.body,
                    },{new:true});
                    res.status(200).json(updatedPost);
                }catch(err){
                    res.status(500).json(err)
                }
            }else
            {
                res.status(401).json("you cannot update post")
            }
        }
        catch(err){
            res.status(500).json(err)
        }  
}
);

//GET Post
router.get("/:id",async (req,res)=>{
    try{
        const post =await Post.findById(req.params.id);
        
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
}
);
//GET ALL POST

router.get("/",async (req,res)=>{
    const catName=req.query.cat;
    const username=req.query.user;
    console.log(username);
    try{
        let posts;
       if(username){
            posts= await Post.find({username});
            
       }else if(catName){
            posts= await Post.find({categories:{
               $in:[catName],
           }});

       }else{
             posts= await Post.find();
       }
        
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
}
);



module.exports=router;