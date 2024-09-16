const express=require('express');
const router=express.Router();

const {userByIdController, getQueriesController, getUserStatsController, getSolutionsController}=require('../controllers/dataController');

router.get('/userById', userByIdController);
router.get('/queries', getQueriesController);
router.get('/stats', getUserStatsController);
router.get('/solutions', getSolutionsController);

module.exports=router;   