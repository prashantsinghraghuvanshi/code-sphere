const db=require('../config/db');

const postQues=async(title, content, user_id)=>{
    let response={
        isSuccessful: false
    }

    try {
        const [postQues]=await db.query('INSERT INTO queries(title, content, created_by) VALUES (?,?,?)',
            [title, content, user_id]
        );
        if(postQues.affectedRows>0){
            response.isSuccessful=true;
            response.message='query posted successfully';
        }
    } catch (error) {
        response.errorMessage=error.message;
    }

    return response;
}

const postSol=async(query_id, content, user_id)=>{
    let response={
        isSuccessful: false
    }

    try {
        const [postSol]=await db.query('INSERT INTO solutions(query_id, created_by, content) VALUES(?,?,?)',
            [query_id, user_id, content]
        )
        if(postSol.affectedRows>0){
            response.isSuccessful=true;
            response.message='solution posted successfully';
        }
    } catch (error) {
        const failedToPostError=ErrorHandler.createError(
            'Failed to post solution',
            400
        )
        return failedToPostError;
    }
    return response;
}

module.exports={
    postQues,
    postSol
}