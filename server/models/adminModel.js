const db=require('../config/db');

const updateUserRole=async(user_id, role_id, admin_id)=>{
    let response={
        isSuccessful: false,
        errorMessage: null
    }
    try {
        const [query]=await db.execute(`UPDATE user_roles SET role_id=?, updated_by=? WHERE user_id=?`,[role_id, admin_id, user_id]);
        if(query.affectedRows<0){
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

const verifyUserRole=async(admin_id)=>{
    let response={
        verified: false
    }
    try {
        const [check]=await db.execute(`SELECT role_name FROM roles WHERE role_id=
            (SELECT role_id FROM user_roles WHERE user_id=?)`
            ,[admin_id]);
        if(check[0].role_name!=="admin" || check.affectedRows===0){
            return response;
        } 
        response.verified=true;
    } catch (error) {
        response.errorMessage=error.message;
    }
    return response;
}

module.exports={
    updateUserRole,
    verifyUserRole
}