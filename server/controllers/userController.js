const validator=require('email-validator');
const {ErrorHandler}=require('../utils/errorHandler');
const userModel=require('../models/userModel');

const signUp=async(body)=>{
    try {
        console.log(body);
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

        const addUser=await userModel.addUser(body);
        if(!addUser.isSuccessful){
            const failedToAddUserError=ErrorHandler.createError(
                addUser.errorMessage,
                200
            )
            return failedToAddUserError;
        }

        const data=addUser.userAdded;
        return data;
    } catch (error) {
        const failedToRegisterUser=ErrorHandler.createError(
            'Failed to register user',
            200
        )
        console.log(`failedToRegisterUser`,error);
        return failedToRegisterUser;
    }
}

module.exports={
    signUp
}