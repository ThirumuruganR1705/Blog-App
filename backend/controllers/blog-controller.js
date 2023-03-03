import mongoose from "mongoose";
import blog from "../models/blog.js";
import User from "../models/user.js";

//get All Blogs

export let getAllBlogs = async(req,res,next) =>{
    let blogs;
    try{
        blogs = await blog.find().populate("user");
    }catch{(e)=>{
        console.log(e);
    }}
    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"});
    }else{
        return res.status(200).json({blogs});
    }
};

//Get Blogs By user id

export let blogsById = async (req,res,next) =>{
    let blogs;
    let {userId} = req.body ;
    try{
        blogs = await blog.findById(userId).populate("user");
    }catch{(e)=>{
        console.log(e);
    }};
    if(blogs){
        console.log(blogs);
        return res.status(200).json({message:blogs});
    }else{
        return res.status(404).json({message:"not found"});
    }
}

// Blog Creation

export let createBlogs = async(req,res,next)=>{
    let {title,description,image,user} = req.body;

    let ExistingUser;
    try{
        ExistingUser = await User.findById(user);
    }catch{(e)=>{
        console.log(e);
    }}

    if(!ExistingUser){
        res.status(404).json({message:"Not Found"})
    }

    
    let newBlog = new blog({
        title,
        description,
        image,
        user
    });
    try{
        let session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        ExistingUser.blogs.push(newBlog);
        await ExistingUser.save({session});
        await session.commitTransaction();
        console.log("New Blog Is Inserted")
    }catch{(e)=>{
        console.log(e);
    }}
    return res.status(200).json({blog});
};

//Update Blog

export let updateBlog = async(req,res,next) =>{
    let blogId = req.params.id;
    let {title,description} =  req.body;
    let newBlog = await blog.findByIdAndUpdate(blogId,{
        title,
        description
    });
    try{
        newBlog.save();
        console.log("Updated");
    }catch{(e)=>{
        console.log(e);
    }}
};

// Delete Blog

export let DeleteBlog = async(req,res,next) =>{
    let blogId = req.params.id;
    let newBlog;
    let ExistingUser;
    // try{
    //     ExistingUser = await User.findById(blogId);
    // }catch{(e)=>{
    //     console.log(e);
    // }}
    try{
        newBlog = await blog.find({id:blogId}).populate("user");
        await blog.findByIdAndRemove(blogId);
        console.log(newBlog);
        await newBlog.user.blogs.pull(newBlog);
        await newBlog.user.save();
        // ExistingUser = await User.find({blogs:blogId});
        // let session = await mongoose.startSession();
        // session.startTransaction();
        // newBlog = await blog.findByIdAndRemove(blogId); 
        // console.log(ExistingUser);
        // await ExistingUser.blogs;
        // await ExistingUser.save({session});
        // await session.commitTransaction();
        return res.status(200).json({message:"Successfully Deleted"});
        // console.log("Deleted");
    }catch{(e)=>{
        console.log(e);
    }}
    if(!newBlog){
        return res.status(404).json({message:"The Blog Is Not Exists"});
    }
};
