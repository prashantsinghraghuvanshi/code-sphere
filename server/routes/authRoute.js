const express=require('express');
const router=express.Router();
const {signIn}=require('../controllers/authController');
const {ErrorHandler}=require('../utils/errorHandler');
const constant=require('../utils/constant');

router.post('/signIn', async(req,res)=>{
    try {
        const response=await signIn(req.body);
        if(response instanceof Error){
            ErrorHandler.sendError(res, response);
        } else{
            res.status(200).send({
                success: true,
                message: response
            })
        }
    } catch (error) {
        const signInError=ErrorHandler.createError(constant.INTERNAL_SERVER_ERROR, 500);
        ErrorHandler.sendError(res, signInError);
    }
})

module.exports=router;