const express=require('express');
const router=express.Router();

const {userByIdController, getQueriesController, getUserStatsController}=require('../controllers/dataController');

router.get('/userById', userByIdController);
router.get('/queries', getQueriesController);
router.get('/stats', getUserStatsController);

module.exports=router;   