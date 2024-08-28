const ErrorHandler=require('../utils/errorHandler');
const adminModel=require('../models/adminModel');

const updateRole=async(body)=>{
    try {
        const {user_id, role_id, admin_id}=body;
        if(!user_id || !role_id || !admin_id){
            const missingDataError=ErrorHandler.createError(
                'missing entry',
                401
            )
            return missingDataError;
        }
        const data=await adminModel.updateUserRole(user_id, role_id, admin_id);
        if(!data.isSuccessful){
            const failedUpdation=ErrorHandler.createError(
                data.errorMessage,
                401
            )
            return failedUpdation;
        }
    } catch (error) {
        const failedToUpdate=ErrorHandler.createError(
            'Failed to update user role',
            400
        )
        return failedToUpdate;
    }
}

module.exports={
    updateRole
}