const express=require('express');
const router=express.Router();

const {userByIdController}=require('../controllers/dataController');

router.get('/userById', userByIdController);

module.exports=router;   