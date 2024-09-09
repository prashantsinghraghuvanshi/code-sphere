const authModel=require('../models/authModel');

const signInController=async(req, res, next)=>{
    try {
        const {username, password}=req.body;
        if(!username || !password){
            return res.status(400).json({error:'missing username or password'})
        }

        const user_id=await authModel.getUserId(username);
        if(!user_id){
            return res.status(500).json({error:'not able fetch user id'})
        }

        const data = await authModel.signInUser(user_id, password);

        if (!data.isSuccessful) {
            const statusCode = data.errorCode ? data.errorCode : 500;
            return res.status(statusCode).json({
            error: data.errorMessage || "An error occurred during login.",
        });
}

        // return res.status(202).json({isAccepted: data.isSuccessful, otp: data.otp, username: username});
        req.otp=data.otp;
        req.username=username;
        next();
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
        const result=await authModel.verifyOTP(user_id, otp, res);
        if(!result.isSuccessful){
            return res.status(500).json(result);
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
        if(!data.isSuccessful){
            return res.status(500).json({error: 'internal server error'})
        }

        return res.status(200).json({message: 'user logged out'});

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports={
    signInController,
    otpController,
    signOut
}