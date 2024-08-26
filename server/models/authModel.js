const db=require('../config/db');
const bcrypt=require('bcrypt');
const {sendOTP}=require('./otpService');

const signInUser=async(body)=>{
    let response={
        isSuccessful: false,
        otp: null,
        errorMessage: null,
    }

    try {
        const [result]=await db.query(`SELECT user_id, password FROM users WHERE username=?`,[body.username]);

        if(result.length===0){
            response.errorMessage='Invalid username or password';
            return response;
        }

        const isMatch = await bcrypt.compare(body.password, result[0].password);

        if(!isMatch){
            response.errorMessage='Invalid username or password';
            return response;
        }

        // otp
        const otp=await sendOTP(body.username);
        response.isSuccessful=true;
        response.message='OTP is sent...';
        response.otp=otp;

    } catch (error) {
        response.errorMessage=errorMessage;
    }

    return response;
}

const verifyOTP=async(username,otp)=>{
    let response={
        isSuccessful: false,
        errorMessage: null
    }
    
    try {
        const query=`SELECT otp_id, expired_at FROM otpRecord WHERE username=? AND otp=? ORDER BY created_at DESC LIMIT 1`;

        const [rows]=await db.execute(query, [username, otp]);

        if(rows.length===0){
            response.errorMessage='Invalid OTP';
            return response;
        }

        const otpRecord=rows[0];
        const currTime=new Date();

        if(currTime>otpRecord.expired_at){
            response.errorMessage='OTP expired';
            return response;
        }

        response.isSuccessful=true;

    } catch (error) {
        response.errorMessage=error.message;
    }

    return response;
}

module.exports={
    signInUser,
    verifyOTP
}