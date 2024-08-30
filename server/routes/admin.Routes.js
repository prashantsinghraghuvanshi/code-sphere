const express=require('express');
const router=express.Router();
const {updateRole}=require('../controllers/adminController');
const {ErrorHandler}=require('../utils/errorHandler');
const constant=require('../utils/constant');
const {protectRoute}=require('../middlewares/protectRoutes');

router.post('/updateRole', protectRoute, async(req,res)=>{
    try {
        const response=await updateRole(req.body);
        if(response instanceof Error){
            ErrorHandler.sendError(res,response);
        } else{
            res.status(200).send({
                success: true, 
                message: "user role updated successfully"      
            })
        }
    } catch (error) {
        const roleUpdateError=ErrorHandler.createError(constant.INTERNAL_SERVER_ERROR, 500);
        ErrorHandler.sendError(res,roleUpdateError);
    }
})

module.exports=router;