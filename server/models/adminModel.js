const db=require('../config/db');

const updateUserRole=async(user_id, role_id, admin_id)=>{
    let response={
        success: false,
        message: null
    }
    try {
        const result = await db.query(`SELECT update_user_role($1, $2, $3)`, [role_id,admin_id, user_id]);

        response.success=true;
    } catch (error) {
        if(error.code==='P0001'){
            response.message=error.message || 'An error occured in updating user role table';
        } else {
            response.message=error.message || 'Unexpected error occured while updating user role';
        }
    } finally {
        return response;
    }
    
}

module.exports={
    updateUserRole
}