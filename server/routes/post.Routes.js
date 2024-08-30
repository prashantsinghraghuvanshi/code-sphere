const express=require('express');
const router=express.Router();
const {postQuestion, postSolution}=require('../controllers/postController.js');
const {ErrorHandler}=require('../utils/errorHandler.js');
const constant=require('../utils/constant.js');

router.post('/question', async(req,res)=>{
    try {
        const response=await postQuestion(req.body);
        if(response instanceof Error){
            ErrorHandler.sendError(res, response);
        } else {
            res.status(200).send({
                success: true,
                message: "question posted successfully"
            })
        }
    } catch (error) {
        const postQuestionError=ErrorHandler.createError(constant.INTERNAL_SERVER_ERROR, 500);
        ErrorHandler.sendError(res, postQuestionError);
    }
})

router.post('/solution', async(req,res)=>{
    try {
        const response=await postSolution(req.body);
        if(response instanceof Error){
            ErrorHandler.sendError(res, response);
        } else {
            res.status(200).send({
                success: true,
                message: "solution posted successfully"
            })
        }
    } catch (error) {
        const postSolutionError=ErrorHandler.createError(constant.INTERNAL_SERVER_ERROR, 500);
        ErrorHandler.sendError(res, postSolutionError);
    }
})

module.exports=router;