const db=require('../config/db');
const bcrypt=require('bcrypt');

const signUpUser = async (body) => {
    let response = {
        success: false,
        message: null,
        errorMessage: null
    };

    try {
        const hashPassword = await bcrypt.hash(body.password, 8);
        const iconTemplate='https://api.multiavatar.com/'+body.username+'.svg';
        const [result] = await db.execute(`CALL signUp_user(?,?,?,?)`, [body.username, body.email, hashPassword, iconTemplate]);

        if (result.affectedRows>0) {
            response.success = true;
            response.message = "User added successfully";
        } else {
            response.message = 'Duplicate Data';
        }

    } catch (error) {
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            response.message = error.sqlMessage || 'An error occurred in the sign-up process(database)';
        } else {
            response.message = error.message || 'Unexpected error during sign-up.';
        }
    }
    
    return response;
};

const findById=async(user_id)=>{
    let response={
        success: false
    }
    try {
        const [result]=await db.execute(`CALL find_role_by_userId(?)`,[user_id]);

        const rolename=result[0][0].role_name;

        if(!rolename){
            response.errorMessage='Error in stored procedure for findById';
        }
        
        response.success=true;
        response.rolename=rolename;
    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.errorMessage=error.sqlMessage||'An error occurred in finding user data.';
        } else {
            response.errorMessage=error.message|| 'unexpected error during finding user data.';
        }
    }
    return response;
}

module.exports={
    signUpUser,
    findById
}