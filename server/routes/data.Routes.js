const express=require('express');
const router=express.Router();

const {userByIdController, getQueriesController}=require('../controllers/dataController');

router.get('/userById', userByIdController);
router.get('/queries', getQueriesController);

module.exports=router;   