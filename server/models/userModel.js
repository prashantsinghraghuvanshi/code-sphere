const db=require('../config/db');
const bcrypt=require('bcrypt');
const { ErrorHandler } = require('../utils/errorHandler');

const signUpUser=async(body)=>{
    let response={
        isSuccessful: false,
        message: null,
    };

    try {
        const hashPassword=await bcrypt.hash(body.password, 8);
        const [UserResult] = await db.query(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [body.username, body.email, hashPassword]
          );
        const [roleResult]=await db.query(
            'INSERT INTO user_roles(user_id) VALUES (?)',
            [UserResult.insertId]
        )

        if(UserResult.affectedRows>0 && roleResult.affectedRows>0){
            response.isSuccessful=true;
            response.message="user added successfully";
        }
    } catch (error) {
        response.errorMessage=error.message;
    }
    return response;
}

const postQuestion=async(title, content, createdBy)=>{
    let response={
        isSuccessful: false,
        questionPosted: null,
    };
    try {
        const [result]=await db.query(
            `INSERT INTO queries (title, content, created_by) VALUES (?, ?, ?)`,
            [title, content, createdBy]
        )
        if(result.affectedRows>0){
            response.isSuccessful= true;
            response.questionPosted= title;
        }
    } catch (error) {
        const postQuesError=ErrorHandler.createError(
            'Error in inserting the question into database',
            500
        )
        return postQuesError;
    }
    return response;
}

module.exports={
    signUpUser,
    postQuestion
}