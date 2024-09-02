const validator=require('email-validator');
const {ErrorHandler}=require('../utils/errorHandler');
const userModel=require('../models/userModel');

const signUp=async(req, res)=>{
    try {
        const {username, email, password}=req.body;
        if(!email || !username || !password){
            return res.status(400).json({error:'missing required fields in request'})
        }
        const emailIsValid=validator.validate(email);
        if(!emailIsValid){
            return res.status(400).json({error:'email is not valid'})
        }

        const signUpUser=await userModel.signUpUser(body);
        if(!signUpUser.isSuccessful){
            return res.status(500).json({error:'internal server error'})
        }

        return res.status(201).json({message:'user created successfully'});

    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports={
    signUp
}