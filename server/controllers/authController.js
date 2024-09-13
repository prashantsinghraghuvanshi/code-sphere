const authModel=require('../models/authModel');
const { generateTokenAndSetCookie } = require('../utils/generateToken');

const signInController=async(req, res)=>{
    try {
        const {username, password}=req.body;
        if(!username || !password){
            return res.status(400).json({error:'missing username or password'})
        }

        const user_id=await authModel.getUserId(username);
        if(!user_id){
            return res.status(404).json({error:'no user record found'})
        }

        const data = await authModel.signInUser(user_id, password);

        if (!data.isSuccessful) {
            const statusCode = data.errorCode ? data.errorCode : 500;
            return res.status(statusCode).json({
                error: data.errorMessage || "An error occurred during login.",
            });
        }
        
        req.otp=data.otp;
        req.username=username;
        req.user_id=user_id;
        generateTokenAndSetCookie(user_id, res);
        // next();
        res.status(200).json({
            user_id: user_id 
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const otpController=async(req,res)=>{
    try {
        const {user_id, otp}=req.body;
        if(!user_id || !otp){
            return res.status(400).json({success: false, error:'User ID and OTP are required'});
        }
        const result=await authModel.verifyOTP(user_id, otp);
        // 
        if(!result.success){
            return res.status(400).json(result);
        } else{
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const signOut=async(req,res)=>{
    try {
        const {user_id}=req.body;

        if (!user_id) {
            return res.status(400).json({ error: 'no active user found' });
        }

        const data=await authModel.signOutUser(user_id);
        if(!data.success){
            return res.status(500).json({error: 'internal server error'})
        }

        return res.status(200).json({success: data.success, 
                                    message: 'user logged out'
                                    });

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports={
    signInController,
    otpController,
    signOut
}