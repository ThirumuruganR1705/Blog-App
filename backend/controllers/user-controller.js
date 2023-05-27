import User from "../models/user.js";
import bcrypt from "bcryptjs";

export let getAllUsers = async(req,res,next) =>{
    let userDetails ;
    try{
        userDetails = await User.find().populate("blogs");
    }catch{(e)=>{
        console.log(e);
    }}

    if(userDetails){
        return res.status(200).json({userDetails});
    }
    else{
        return res.status(404).json({message:"Users Not Found"});
    }
};

export let signup = async(req,res,next)=>{
    let ExistingUser;
    let {username,email,password} = req.body;
    try{
        ExistingUser = await User.findOne({email});
    }catch{(e)=>{
        console.log(e);
    }}
    if(ExistingUser){
        res.status(400).json({message:"Already Registered"});
    }
    else{
        console.log("Inserting Started...");

        let hashedPassword = bcrypt.hashSync(password);

        let newUsers = new User({
            username:username,
            email:email,
            password:hashedPassword,
            blogs:[]
        });
        await newUsers.save();
        console.log("Inserted");
        return res.status(200).json({message:"signup Successfull"});
    }
};

export let login = async(req,res,next) =>{
    let ExistingUser ;
    let {email,password} = req.body;
    try{
        ExistingUser = await User.findOne({email});
        console.log(ExistingUser);
    }catch{(e)=>{
        console.log(e);
    }}
    if(!ExistingUser){
        return res.status(404).json({message:"User Not Found"});
    }
    else{
        let isPassCor = bcrypt.compareSync(password,ExistingUser.password);
        if(!isPassCor){
            return res.status(400).json({message:"Incorrect Password"});
        }else{
            return res.status(200).json({message:"Login Successfull"});
        }
    }
}

export  let getUserId = async (req,res,next) =>{
    let userId;
    let {email} = req.body;
    try{
        userId = await User.findOne({email});
        // console.log(userId);
    }catch{(e)=>{
        console.log(e);
    }}
    if(userId){
        return res.status(200).json({message:userId.id});
    }else{
        return res.status(404).json({message:"not found"});
    }
}

export  let getUser = async (req,res,next) =>{
    let user;
    let {email} = req.body;
    try{
        user = await User.findOne({email}).populate("blogs");
        // console.log(userId);
    }catch{(e)=>{
        console.log(e);
    }}
    if(user){
        return res.status(200).json({message:user.blogs});
    }else{
        return res.status(404).json({message:"not found"});
    }
}