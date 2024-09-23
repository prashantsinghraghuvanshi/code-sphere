const express=require('express');
const router=express.Router();
const {signInController, signOut, otpController}=require('../controllers/authController');
const { sendmailController } = require('../controllers/mailController');

router.post('/signIn', signInController, sendmailController);
router.get('/verifyOtp', otpController)
router.post('/signOut', signOut)

module.exports=router;