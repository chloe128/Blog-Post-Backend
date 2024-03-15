//post.js
//import mongoose
const mongoose=require('mongoose');
//create a schema model
const postSchema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    description:{type:String, required:true},
    likes:{type:Number,required:true},
    comments:[{body:String}]
});

const Post=mongoose.model("Post",postSchema);
//export the post model
module.exports=Post;
