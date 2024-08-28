const ErrorHandler=require('../utils/errorHandler');
const postModel=require('../models/postModel');

const postQuestion=async(body)=>{
    try {
        const {title, content, user_id}=body;
        if(!title || !content || !user_id){
            const missingDataError=ErrorHandler.createError(
                'missing entry',
                401
            )
            return missingDataError;
        }

        const data=await postModel.postQues(title, content, user_id);
        if(!data.isSuccessful){
            const failedToPost=ErrorHandler.createError(
                data.errorMessage,
                400
            )
            return failedToPost;
        }
    } catch (error) {
        const failedToPost=ErrorHandler.createError(
            'Failed to post question',
            400
        )
        return failedToPost;
    }
}

const postSolution=async(body)=>{
    try {
        const {query_id, content, user_id}=body;
        if(!query_id || !content || !user_id){
            const missingDataError=ErrorHandler.createError(
                'missing data entry',
                401
            )
            return missingDataError;
        }
        const data=await postModel.postSol(query_id, content, user_id);
        if(!data.isSuccessful){
            const failedToPost=ErrorHandler.createError(
                data.errorMessage,
                400
            )
            return failedToPost;
        }
    } catch (error) {
        const failedToPost=ErrorHandler.createError(
            'Failed to post solution',
            400
        )
        return failedToPost;
    }
}

module.exports={
    postQuestion,
    postSolution
}