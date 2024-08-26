const db=require('../config/db');
const crypto=require('crypto');

function generateOtp(){
    return Math.floor(1000+Math.random()*9000).toString();
}

const sendOTP=async(username)=>{
    const otp=generateOtp();

    const query=`INSERT INTO otpRecord(username, otp) VALUES(?, ?)`;

    await db.execute(query, [username, otp]);

    console.log(`OTP Generated : ${otp}`);

    return otp;
}

module.exports={
    sendOTP
}