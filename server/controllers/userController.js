const validator=require('email-validator');
const {ErrorHandler}=require('../utils/errorHandler');
const userModel=require('../models/userModel');

const signUp=async(body)=>{
    try {
        const {username, email, password}=body;
        if(!email){
            const missingEmailError=ErrorHandler.createError(
                'please provide email address',
                400
            )
            return missingEmailError;
        }
        const emailIsValid=validator.validate(email);
        if(!emailIsValid){
            const validEmailError=ErrorHandler.createError(
                'please provide valid email',
                400
            )
            return validEmailError;
        }
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

        const signUpUser=await userModel.signUpUser(body);
        if(!signUpUser.isSuccessful){
            const failedToAddUserError=ErrorHandler.createError(
                addUser.errorMessage,
                200
            )
            return failedToAddUserError;
        }

        // const data=userModel.signUpUser;
        // return data;
        return signUpUser;
    } catch (error) {
        const failedToSignUp=ErrorHandler.createError(
            'Failed to sign-up user',
            200
        )
        return failedToSignUp;
    }
}

module.exports={
    signUp
}