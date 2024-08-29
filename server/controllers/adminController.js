const ErrorHandler=require('../utils/errorHandler');
const adminModel=require('../models/adminModel');

const updateRole=async(body)=>{
    try {
        const verifier=await verifyUserStatus(body);
        if(verifier instanceof Error){
            ErrorHandler.sendError(res,verifier)
        }

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

const verifyUserStatus=async(body)=>{
    try {
        const {admin_id}=body;
        if(!admin_id){
            const missingDataError=ErrorHandler.createError(
                "admin_id field is required",
                400
            )
            return missingDataError;
        }
        const data= await adminModel.verifyUserRole(admin_id);
        if(!data.verified){
            const unauthorizedError=ErrorHandler.sendError(
                "Unauthorized User",
                401
            )
            return unauthorizedError;
        }
    } catch (error) {
        const failedToVerify=ErrorHandler.createError(
            "failed to verify the role of user",
            500
        )
    }
}

module.exports={
    updateRole
}