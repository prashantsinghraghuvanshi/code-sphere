const db=require('../config/db');

const updateUserRole=async(user_id, role_id, admin_id)=>{
    let response={
        isSuccessful: false,
        errorMessage: null
    }
    try {
        const [result]=await db.execute(`CALL update_user_role(?,?,?)`,[role_id, admin_id, user_id]);

        if(result.affectedRows===0){
            response.errorMessage='cant update user role!';
        } else {
            response.isSuccessful=true;
        }

    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.errorMessage=error.sqlMessage || 'An error occured in updating user role table';
        } else {
            response.errorMessage=error.message || 'Unexpected error occured while updating user role';
        }
    }
    return response;
}

module.exports={
    updateUserRole
}