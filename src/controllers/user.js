const User=require("../models/user");
//bcrypt
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");

const signupUser= async(req,res)=> {
    const {username, password}=req.body;
    try {
        //boolean?
        const exists= await User.findOne({ username});
        //check if something in exist
        if(exists){
            return res.status(400).json({error:"username in use." });
        }
        //whar we hash,times we hash 10times,very secure
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=await User.create({
            username,
            password:hashedPassword
        });
        res.status(200).json({newUser});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};
//login user

const loginUser=async(req,res)=>{
    const{username,password}=req.body;
    try {
        const exists= await User.findOne({username});
        if(!exists){
            return res.status(404).json({error:"username not found"});
        }
        //boolean
        const isPasswordMatched = await bcrypt.compare(password,exists.password);
        if(! isPasswordMatched){
            return req.status(400).json({error:"incorrect password"});
        }
        //jwt_secret is a secret token
        const token=jwt.sign({userId:exists._id}, process.env.JWT_SECRET);
        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
module.exports={
    signupUser,
    loginUser
}