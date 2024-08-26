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
            400
        )
        return failedToSignUp;
    }
}

const postQuestion=async(title, content, createdBy)=>{
    try {
        if(title.length===0 || content.length===0){
            const invalidQuestionError=ErrorHandler.createError(
                'title or question section cant be empty!',
                400
            )
            return invalidQuestionError;
        }
        const postQues=await userModel.postQuestion(title, content, createdBy);
        return postQues;
    } catch (error) {
        const failedToPostQues=ErrorHandler.createError(
            'Failed to post question',
            400
        )
        return failedToPostQues;
    }
}

module.exports={
    signUp,
    postQuestion
}