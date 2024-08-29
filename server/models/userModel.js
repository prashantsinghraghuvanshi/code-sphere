const db=require('../config/db');
const bcrypt=require('bcrypt');

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
        const [otpResult]=await db.query(
            `INSERT INTO otpRecord(user_id) VALUES (?)`,
            [UserResult.insertId]
        )

        if(UserResult.affectedRows>0 && roleResult.affectedRows>0 && otpResult.affectedRows>0){
            response.isSuccessful=true;
            response.message="user added successfully";
        } else {
            response.errorMessage='error in query section in signUp';
        }
    } catch (error) {
        response.errorMessage=error.message;
    }
    return response;
}

module.exports={
    signUpUser
}