const express=require('express');
const router=express.Router();
const {updateRole}=require('../controllers/adminController');
const {protectRoute}=require('../middlewares/protectRoutes');

// testing
router.post('/updateRole', updateRole)

// deployment 
// router.post('/updateRole', protectRoute, updateRole);

module.exports=router;