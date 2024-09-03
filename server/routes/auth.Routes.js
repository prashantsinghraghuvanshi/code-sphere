const express=require('express');
const router=express.Router();
const {signIn, signOut, otpController}=require('../controllers/authController');

router.post('/signIn', signIn)
router.post('/verifyOtp', otpController)
router.post('/signOut', signOut)

module.exports=router;