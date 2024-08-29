const db=require('../config/db');
const bcrypt=require('bcrypt');
const {generateOtp}=require('../utils/otpService');

const signInUser=async(body)=>{
    let response={
        isSuccessful: false,
        otp: null,
        errorMessage: null,
    }

    try {
        const [result]=await db.query(`SELECT user_id, password FROM users WHERE username=?`,[body.username]);
        const user_id=result[0].user_id;

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
        const otp=generateOtp();
        const [query]=`UPDATE otpRecord SET otp=? WHERE user_id=?`;

        await db.execute(query, [otp, user_id]);
        if(query.affectedRows===0){
            response.errorMessage='OTP generation failed';
            return response;
        }
        console.log(`OTP Generated : ${otp}`);
        response.isSuccessful=true;
        response.otp=otp;

    } catch (error) {
        response.errorMessage=errorMessage;
    }

    return response;
}

const verifyOTP=async(user_id,otp)=>{
    let response={
        isSuccessful: false,
        errorMessage: null
    }
    
    try {
        const query=`SELECT otp_id, expired_at FROM otpRecord WHERE user_id=? AND otp=? ORDER BY created_at DESC LIMIT 1`;

        const [rows]=await db.execute(query, [user_id, otp]);

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

        const [logIn] = await db.execute(`UPDATE users SET isLoggedIn = true WHERE user_id = ?`,[user_id]);

        if(logIn.affectedRows<0){
            response.errorMessage='cant log in user';
            return response;
        }

    } catch (error) {
        response.errorMessage=error.message;
    }
    return response;
}

const signOutUser=async(user_id)=>{
    let response={
        isSuccessful: false,
        errorMessage: null
    }

    try {
        const [result]=await db.execute(`UPDATE users SET isLoggedIn = false WHERE user_id = ?`,[user_id])
        if(result.affectedRows<0){
            response.errorMessage='cant logout user';
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
    verifyOTP,
    signOutUser
}