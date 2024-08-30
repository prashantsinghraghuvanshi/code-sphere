const express=require('express');
const router=express.Router();
const {postQuestion, postSolution}=require('../controllers/postController.js');
const {protectRoute}=require('../middlewares/protectRoutes.js');

router.post('/question', protectRoute, postQuestion);
router.post('/solution', protectRoute, postSolution);

module.exports=router;