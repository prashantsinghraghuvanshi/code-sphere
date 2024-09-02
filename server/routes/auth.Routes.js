const express=require('express');
const router=express.Router();
const {signIn, signOut}=require('../controllers/authController');
const { verifyOTP } = require('../models/authModel');

router.post('/signIn', signIn)

router.post('/verifyOtp', verifyOTP)

router.post('/signOut', signOut)

module.exports=router;