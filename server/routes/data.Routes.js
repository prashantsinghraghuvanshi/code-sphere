const express=require('express');
const router=express.Router();

const {userByIdController, getQueriesController, getUserStatsController, getSolutionsController, getQueriesByIdController}=require('../controllers/dataController');

router.get('/userById', userByIdController);
router.get('/queries', getQueriesController);
router.get('/stats', getUserStatsController);
router.get('/solutions', getSolutionsController);
router.get('/queryById', getQueriesByIdController);

module.exports=router;   