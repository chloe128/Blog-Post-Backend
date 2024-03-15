//import post schema
const Post =require('../models/post');

//creatingba create postbcontroller
const createPost= async(req, res)=>{
    //destructing the body of req
    const {title,author,description,likes,comments}=req.body;

    try {
        const post=await Post.create({
            title,
            author,
            description,
            likes,
            comments,
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};
//get all the post /R of crud
const getAllPosts= async(req,res)=>{
    try {
        const posts =await Post.find();
        res.status(200).json({
            count: posts.length,
            posts,
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

}

//get a single post
const getPost=async(req,res)=>{
    const {id}= req.params;
    try {
        const post= await Post.findById({_id:id});
        if(!post) return res.status(404).json({
            error:"No post found."
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({
            error:error.message
        });
    }
}

//update a post /u of CRUD
const updatePost= async(req,res)=>{
    const {id}=req.params;
    try {
        const post= await Post.findByIdAndUpdate(
            {_id:id},
            { ...req.body},
            { new: true, runValidators:true}
        );
        if(!post){
            return res.status(404).json({
                error:"No matching post found!"
            });
        };
        res.status(200).json({
            message:"the post has been successfully updated.",
            post
        })
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

///Delete a single post
const deletePost = async(req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findByIdAndDelete({_id : id});
        if (!post) {
            return res.status(404).json({
                error: "No matching post found!"
            });
        }
        res.status(200).json({
            message: "The post has been successfully deleted!"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
};
