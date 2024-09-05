const express=require('express');
const router=express.Router();
const {sendmailController}=require('../controllers/mailController.js');

router.post('/sendmail', sendmailController);

module.exports=router;