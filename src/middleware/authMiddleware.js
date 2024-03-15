//use token
const jwt=require("jsonwebtoken");

const authMiddleware =async (req,res,next)=>{
    const token=req.header("Authorization");
    if(! token) return res.status(403).json({error:"Access denied"});
    try {
        const decoded=jwt.verify(
            //without bearer prefix
            token. substring (7),
            process.env.JWT_SECRET
        );
        req.user={userID:decoded.id};
        next();
    } catch (error) {
        res.status(403).json({error:"Access denied"})
    }
}
module.exports={
    authMiddleware
};
