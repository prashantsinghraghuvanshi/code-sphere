const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel');

const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "unauthorized - no token provided"});
        }
        
        const data=jwt.verify(token, process.env.JWT_SECRET);
        if(!data){
            return res.status(401).json({error: "unauthorized - invalid token"});
        }

        const user=await userModel.findById(data.user_id);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        req.roleUser=user.role;
        next();
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports={
    protectRoute
};