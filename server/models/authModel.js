const db=require('../config/db');
const bcrypt=require('bcrypt');
const {generateOtp}=require('../utils/otpService');

const signInUser = async (user_id, password) => {
    let response = {
        success: false
    }

    try {
        const otp = generateOtp();

        // Use `SELECT` for PostgreSQL instead of `CALL`
        const { rows: data } = await db.query(`SELECT get_password($1)`, [user_id]);

        if (data.length === 0) {
            response.message = 'Invalid username or password';
            return response;
        }

        const isMatch = await bcrypt.compare(password, data[0].password);

        if (!isMatch) {
            response.message = 'Invalid username or password';
            return response;
        }

        // Insert OTP into the database
        const result = await db.query(`SELECT post_otp($1, $2)`, [user_id, otp]);

        if (result.rowCount === 0) {
            response.message = 'Failed to generate OTP';
            return response;
        }

        console.log(`OTP Generated: ${otp}`);
        response.success = true;
        response.otp = otp;

    } catch (error) {
        response.message = error.message || 'An unexpected error occurred during the sign-in process.';
    } finally {
        return response;
    }
}

const verifyOTP = async (user_id, otp) => {
    let response = {
        success: false
    }

    try {
        // Get OTP record
        const { rows: data } = await db.query(`SELECT verify_otp($1)`, [user_id]);

        if (data.length === 0 || !data[0].otp) {
            response.message = 'No OTP record found';
            response.statusCode = 404;
            return response;
        }

        const otpRecord = data[0];
        const currTime = new Date();

        // Check if OTP has expired
        if (currTime > otpRecord.expired_at) {
            response.message = 'OTP expired';
            return response;
        }

        // Check if OTP matches
        if (otp !== otpRecord.otp) {
            response.message = 'Invalid OTP';
            response.statusCode = 400;
            return response;
        }

        // Log in the user
        const { rowCount } = await db.query(`SELECT login_user($1)`, [user_id]);

        if (rowCount === 0) {
            response.message = 'Cannot log in user';
            return response;
        }

        response.success = true;
    } catch (error) {
        response.message = error.message || 'An unexpected error occurred during OTP verification.';
    }

    return response;
}


const signOutUser=async(user_id)=>{
    let response={
        success: false,
        message: null
    }

    try {
        const [result]=await db.execute(`SELECT logout_user($1)`,[user_id])
        if(result.length===0){
            response.message='cant logout user';
            return response;
        }
        response.success=true;  
        response.message='user logged out';      
    } catch (error) {
        response.message=error.message;
    } finally {
        return response;
    }

    
}

const getUserId=async(username)=>{
    let user_id=null;

    try {
        const [query]=await db.execute(`SELECT user_id FROM users WHERE username=($1)`,[username]);
        if(query[0]){
            user_id=query[0].user_id;
            return user_id;
        }
    } catch (error) {
        if(error.code==='P0001'){
            response.message=error.message || 'An error occured in db while finding user_id';
        } else {
            response.message=error.message || 'Unexpected error occured while finding user id';
        }
    } finally {
        return user_id;
    }
}

module.exports={
    signInUser,
    verifyOTP,
    signOutUser,
    getUserId
}