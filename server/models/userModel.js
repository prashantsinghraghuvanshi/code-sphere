const db=require('../config/db');
const bcrypt=require('bcrypt');

const signUpUser=async(body)=>{
    let response={
        isSuccessful: false,
        message: null,
    };

    try {
        const hashPassword=await bcrypt.hash(body.password, 8);
        const [result]=await db.execute(`CALL signUp_user(?,?,?)`,[body.username, body.email, hashPassword]);

        if(result.affectedRows>0){
            response.isSuccessful=true;
            response.message="user added successfully";
        } else {
            response.errorMessage='error in stored procedure for signUp';
        }
    } catch (error) {
        response.errorMessage=error.message;
    }
    return response;
}

const findById=async(user_id)=>{
    let response={
        isSuccessful: false
    }
    try {
        const [result]=await db.execute(`CALL find_role_by_userId(?)`,[user_id]);

        const rolename=result[0][0].role_name;
        if(!rolename){
            return response;
        }

        response.rolename=rolename;
    } catch (error) {
        return response.errorMessage=error.message;
    }
    return response;
}

module.exports={
    signUpUser,
    findById
}