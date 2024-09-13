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
        // convert this into single stored procedure
        const otp=generateOtp();

        const [data]=await db.query(`CALL get_user_data_by_id(?)`,[user_id]);

        if(data.length===0){
            response.errorMessage='Invalid username or password';
            return response;
        }

        const isMatch = await bcrypt.compare(password, data[0][0].password);

        console.log(isMatch)
        if(!isMatch){
            // response.errorCode=400,
            // response.errorMessage='Invalid username or password';
            // return response;
            response.message("invalid username or password")
        }

        const [result]=await db.query(`CALL post_otp(?,?)`,[user_id, otp]);

        if(result.affectedRows===0){
            response.errorMessage='Failed to generate otp'
            return response;
        }

        console.log(`OTP Generated : ${otp}`);
        response.isSuccessful=true;
        response.otp=otp;

    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.errorMessage=error.sqlMessage||'An error occurred in finding user data in database.';
        } else {
            response.errorMessage=error.message|| 'unexpected error during finding user data at logic.';
        }
    }

    return response;
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
        const [logIn] = await db.execute(`CALL set_user_loggedIn(?)`,[user_id]);

        if(logIn.affectedRows<0){
            response.errorMessage='cant log in user';
            return response;
        }

        // generateTokenAndSetCookie(user_id, res);
        response.data=logIn[0];
        response.success=true;
    } catch (error) {
        response.message=error.message;
    }
    return response;
}

const signOutUser=async(user_id)=>{
    let response={
        isSuccessful: false,
        errorMessage: null
    }

    try {
        const [result]=await db.execute(`CALL set_user_loggedIn(?)`,[user_id])

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