const {ErrorHandler}=require('../utils/errorHandler');
const authModel=require('../models/authModel');

const signIn=async(body)=>{
    try {
        const {username, password}=body;
        if(!username){
            const missingUsernameError=ErrorHandler.createError(
                'please provide an username'
            )
            return missingUsernameError;
        }
        if(!password){
            const missingPasswordError=ErrorHandler.createError(
                'please provide password',
                400
            )
            return missingPasswordError;
        }
        const data=await authModel.signInUser(body);
        if(!data.isSuccessful){
            const missingPasswordError=ErrorHandler.createError(
                data.errorMessage,
                400
            )
            return missingPasswordError;
        }
        return data;
    } catch (error) {
        const failedToSignIn=ErrorHandler.createError(
            'Failed to sign-in',
            200
        )
        return failedToSignIn;
    }
}

const otpController=async(req,res)=>{
    const {username, otp}=req.body;

    if(!username || !otp){
        return res.status(400).json({success: false, error:'User ID and OTP are required'});
    }

    const response=await authModel.verifyOTP(username, otp);
    res.status(response.isSuccessful?200:401).json(response);
}

module.exports={
    signIn,
    otpController
}