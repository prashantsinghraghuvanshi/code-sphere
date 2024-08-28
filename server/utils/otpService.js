const db=require('../config/db');

function generateOtp(){
    return Math.floor(1000+Math.random()*9000).toString();
}

const sendOTP=async(user_id)=>{
    const otp=generateOtp();

    const query=`INSERT INTO otpRecord(user_id, otp) VALUES(?, ?)`;

    await db.execute(query, [user_id, otp]);

    console.log(`OTP Generated : ${otp}`);

    return otp;
}

module.exports={
    sendOTP
}