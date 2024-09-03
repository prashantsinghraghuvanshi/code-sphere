const db=require('../config/db');
const bcrypt=require('bcrypt');
const {generateOtp}=require('../utils/otpService');
const {generateTokenAndSetCookie}=require('../utils/generateToken');

const signInUser=async(user_id, password)=>{
    let response={
        isSuccessful: false,
        otp: null,
        errorMessage: null,
    }

    try {
        const [result]=await db.query(`SELECT password FROM users WHERE user_id=?`,[user_id]);

        if(result.length===0){
            response.errorMessage='Invalid username or password';
            return response;
        }

        const isMatch = await bcrypt.compare(password, result[0].password);

        if(!isMatch){
            response.errorMessage='Invalid username or password';
            return response;
        }

        // otp
        const otp=generateOtp();
        const query=`UPDATE otpRecord SET otp=? WHERE user_id=?`;

        await db.execute(query, [otp, user_id]);
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
        const [query]=await db.execute(`SELECT otp, expired_at FROM otpRecord WHERE user_id=?`,[user_id]);

        if(query.length===0){
            response.errorMessage='No otp record found';
            return response;
        }

        const otpRecord=query[0];
        const currTime=new Date();

        if(currTime>otpRecord.expired_at){
            response.errorMessage='OTP expired';
            return response;
        }
        if(otp!=otpRecord.otp){
            response.errorMessage='Invalid OTP'
            return response;
        }
        const [logIn] = await db.execute(`UPDATE users SET isLoggedIn = true WHERE user_id = ?`,[user_id]);

        if(logIn.affectedRows<0){
            response.errorMessage='cant log in user';
            return response;
        }
        response.isSuccessful=true;
        generateTokenAndSetCookie(user_id,res);
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
        if(result.affectedRows===0){
            response.errorMessage='cant logout user';
            return response;
        }

        response.isSuccessful=true;        
    } catch (error) {
        response.errorMessage=error.message;
    }

    return response;
}

const getUserId=async(username)=>{
    let user_id=null;

    try {
        const [query]=await db.execute(`SELECT user_id FROM users WHERE username=?`,[username])
        if(query[0]){
            user_id=query[0].user_id;
            return user_id;
        }
        return user_id;
    } catch (error) {
        return user_id;
    }
}

module.exports={
    signInUser,
    verifyOTP,
    signOutUser,
    getUserId
}