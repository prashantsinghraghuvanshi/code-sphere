const express=require('express');
const router=express.Router();

router.post('/userById', userByIdController);

module.exports=router;