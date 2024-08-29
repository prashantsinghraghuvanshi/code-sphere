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

        const user_id=await authModel.getUserId(username);
        if(!user_id){
            const missingUserIdError=ErrorHandler.createError(
                'no user with particular username is found',
                400
            )
            return missingUserIdError;
        }

        const data=await authModel.signInUser(user_id, password);
        if(!data.isSuccessful){
            const missingDataError=ErrorHandler.createError(
                data.errorMessage,
                400
            )
            return missingDataError;
        }
        return data;
    } catch (error) {
        const failedToSignIn=ErrorHandler.createError(
            'Failed to sign-in',
            400
        )
        return failedToSignIn;
    }
}

const otpController=async(req,res)=>{
    try {
        const {user_id, otp}=req.body;
        if(!user_id || !otp){
            return res.status(400).json({success: false, error:'User ID and OTP are required'});
        }

        const response=await authModel.verifyOTP(user_id, otp);
        if(!response.isSuccessful){
            const otpFailedError=ErrorHandler.createError(
                'Failed to generate otp',
                401
            )
            return otpFailedError;
        } else{
            res.status(200).json(response);
        }
    } catch (error) {
        const otpFailError=ErrorHandler.createError(
            'Error in otp generation',
            401
        )
        return otpFailError;
    }
    // res.status(response.isSuccessful?200:401).json(response);
}

const signOut=async(req,res)=>{
    try {
        const user_id=req;

        if (!user_id) {
            const missingUserError = ErrorHandler.createError(
                'No user found',
                404
            );
            return res.status(404).json({ error: missingUserError.message });
        }

        const data=await authModel.signOutUser(user_id);
        if(!data.isSuccessful){
            const missingDataError=ErrorHandler.createError(
                data.errorMessage,
                400
            )
            return missingDataError;
        }
        return data;

    } catch (error) {
        const failedToSignOut=ErrorHandler.createError(
            'Failed to sign-out',
            200
        )
        return failedToSignOut;
    }
}

module.exports={
    signIn,
    otpController,
    signOut
}