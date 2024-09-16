const express=require('express');
const router=express.Router();
const {postQuestion, postSolution}=require('../controllers/postController.js');
// const {protectRoute}=require('../middlewares/protectRoutes.js');

// removed protect route for now 
router.post('/question', postQuestion);
router.post('/solution', postSolution);

module.exports=router;