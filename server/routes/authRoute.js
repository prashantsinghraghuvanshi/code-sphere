const express=require('express');
const router=express.Router();
const {signIn}=require('../controllers/authController');
const {ErrorHandler}=require('../utils/errorHandler');
const constant=require('../utils/constant');
const { verifyOTP } = require('../models/authModel');

router.post('/signIn', async(req,res)=>{
    try {
        const response=await signIn(req.body);
        if(response instanceof Error){
            ErrorHandler.sendError(res, response);
        } else{
            res.status(200).send({
                success: true,
                message: response.message,
                otp: response.otp
            })
        }
    } catch (error) {
        const signInError=ErrorHandler.createError(constant.INTERNAL_SERVER_ERROR, 500);
        ErrorHandler.sendError(res, signInError);
    }
})

router.post('/verifyOtp', async(req,res)=>{
    try {
        const {user_id, otp}=req.body;
        const response=await verifyOTP(user_id, otp);
        if(response instanceof Error){
            ErrorHandler.sendError(res, response);
        } else{
            res.status(200).send({
                success: true,
                message: response.message,
            })
        }
    } catch (error) {
        const verifyOtpError=ErrorHandler.createError(constant.INTERNAL_SERVER_ERROR, 500);
        ErrorHandler.sendError(res, verifyOtpError);
    }
})

module.exports=router;