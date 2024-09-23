const db=require('../config/db');
const bcrypt=require('bcrypt');
const {generateOtp}=require('../utils/otpService');

const signInUser=async(user_id, password)=>{
    let response={
        success: false
    }

    try {
        const otp=generateOtp();

        const [data]=await db.query(`CALL get_password(?)`,[user_id]);

        if(data.length===0){
            response.message='Invalid username or password';
            return response;
        }

        const isMatch = await bcrypt.compare(password, data[0][0].password);

        if(!isMatch){
            response.message("invalid username or password");
            return response;
        }

        const [result]=await db.query(`CALL post_otp(?,?)`,[user_id, otp]);

        if(result.affectedRows===0){
            response.message='Failed to generate otp'
            return response;
        }

        console.log(`OTP Generated : ${otp}`);
        response.success=true;
        response.otp=otp;
    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.message=error.sqlMessage||'An error occurred in finding user data in database.';
        } else {
            response.message=error.message|| 'unexpected error during finding user data at logic.';
        }
    } finally {
        return response;
    }
}

const verifyOTP=async(user_id,otp)=>{
    let response={
        success: false
    }
    
    try {
        const [data]=await db.execute(`CALL verify_otp(?)`,[user_id]);

        if(data.affectedRows===0 || !data[0][0].otp){
            response.message='No otp record found';
            response.statusCode=404;
            return response;
        }

        const otpRecord=data[0][0];
        const currTime=new Date();

        if(currTime>otpRecord.expired_at){
            response.errorMessage='OTP expired';

            return response;
        }
        if(otp!=otpRecord.otp){
            response.message='Invalid OTP'
            response.statusCode=400;
            return response;
        }

        const [logIn] = await db.execute(`CALL login_user(?)`,[user_id]);

        if(logIn.affectedRows<0){
            response.errorMessage='cant log in user';
            return response;
        }

        // generateTokenAndSetCookie(user_id, res);
        response.success=true;
        response.data=logIn[0];
    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.message=error.sqlMessage||'An error occurred in finding user data in database.';
        } else {
            response.message=error.message|| 'unexpected error during finding user data at logic.';
        }
    }
    return response;
}

const signOutUser=async(user_id)=>{
    let response={
        success: false,
        message: null
    }

    try {
        const [result]=await db.execute(`CALL set_user_loggedIn(?)`,[user_id])

        if(result.length===0){
            response.message='cant logout user';
            return response;
        }

        response.success=true;  
        response.message='user logged out';      
    } catch (error) {
        response.message=error.message;
    }

    return response;
}

const getUserId=async(username)=>{
    let user_id=null;

    try {
        const [query]=await db.execute(`SELECT user_id FROM users WHERE username=?`,[username]);
        
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