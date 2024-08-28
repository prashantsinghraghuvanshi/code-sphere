const express=require('express');
const router=express.Router();
const {signUp, postQuestion}=require('../controllers/userController');
const {ErrorHandler}=require('../utils/errorHandler');
const constant=require('../utils/constant');

router.post('/signUp', async(req,res)=>{
    try{
        const response=await signUp(req.body);
        if(response instanceof Error){
            ErrorHandler.sendError(res, response);
        } else{
            res.status(200).send({
                success: true,
                message: response.data,
            })
        }
    } catch(error){   
        const signUpError=ErrorHandler.createError(constant.INTERNAL_SERVER_ERROR, 500);
        ErrorHandler.sendError(res, signUpError);
    }
})

module.exports= router;