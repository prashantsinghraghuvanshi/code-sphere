const dataModel=require('../models/dataModel');

const userByIdController=async(req,res)=>{
    try {
        const {userId}=req.body;
        if(!userId){
            return res.status(400).json({error:'userId not found'});
        }

        const data=await dataModel.userByIdModel(userId);

        if(!data.success){
            return res.status(500).json({success: data.success, error:data.errorMessage});
        }

        return res.status(200).json({
            success: data.success,
            message: data.message
        })

    } catch (error) {
        return res.status(500).json({success: false, error: error.message});
    }
}

module.exports={
    userByIdController
}