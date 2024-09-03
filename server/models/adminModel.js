const db=require('../config/db');

const updateUserRole=async(user_id, role_id, admin_id)=>{
    let response={
        isSuccessful: false,
        errorMessage: null
    }
    try {
        const [result]=await db.execute(`CALL update_user_role(?,?,?)`,[role_id, admin_id, user_id]);
        if(result.length===0){
            response.errorMessage='cant update user role!';
            return response;
        } else {
            response.isSuccessful=true;
        }
    } catch (error) {
        response.errorMessage=error.message;
    }
    return response;
}

module.exports={
    updateUserRole
}