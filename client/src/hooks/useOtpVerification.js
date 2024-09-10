import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

export const useOtpVerification=()=>{
    const [loading, setLoading]=useState(false);

    const otpVerification=async(otp)=>{
        // need to fetch userId too here
        // fn, i've hardcoded this to check
        const user_id=1;
        const success=handleInputError({otp});
        if(!success)    return;

        setLoading(true);

        try {
            const res=await axios.post('http://localhost:5001/api/auth/verifyOtp', {
                user_id,
                otp
            });
            console.log(res);

            // not working
            if(!res.data.success)   {
                toast.error(res.data.error);
            }

            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return {otpVerification, loading};
}


function handleInputError({otp}){
    console.log(otp);
    if(!otp){
        toast.error("Please enter the otp");
        return false;
    }
    if(otp.length!=4){
        toast.error("please enter the correct otp");
        return false;
    }
    return true;
}