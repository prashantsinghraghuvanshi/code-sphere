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
        return data;
    } catch (error) {
        const failedToSignIn=ErrorHandler.createError(
            'Failed to sign-in',
            200
        )
        return failedToSignIn;
    }
}

module.exports={
    signIn
}