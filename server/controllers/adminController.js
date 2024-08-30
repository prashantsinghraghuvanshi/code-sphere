const adminModel=require('../models/adminModel');

const updateRole=async(req, res)=>{
    try {
        const role=req.roleUser;
        if(role!=='admin'){
            return res.status(401).json({error : "unauthorized user"});
        }
        const {user_id, role_id, admin_id}=req.body;
        if(!user_id || !role_id || !admin_id){
            return res.status(400).json({error : "missing data in request"})
        }
        const data=await adminModel.updateUserRole(user_id, role_id, admin_id);
        if(!data.isSuccessful){
            return res.status(500).json({error: "internal server error"})
        }

        res.status(202).json({message : "user role updated successfully"})
    } catch (error) {
        return res.status(500).json({error: "internal server error"});
    }
}

module.exports={
    updateRole
}