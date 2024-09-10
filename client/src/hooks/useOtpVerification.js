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

            toast.success('otp verified');
        } catch (error) {
            if (error.response && error.response.data) {
                const { status, data } = error.response;
        
                switch (status) {
                  case 400: // Bad request (e.g., invalid email format)
                    toast.error(data.error || "Incorrect otp.");
                    break;
                  case 404: // Not Found
                    toast.error(data.error || "no otp record found");
                    break;
                  case 500: // Internal server error
                    toast.error(
                      "An unexpected error occurred during otp verification. Please try again later."
                    );
                    break;
                  default:
                    toast.error(
                      "Registration failed. Please check the response for details."
                    );
                }
              } else {
                toast.error(error.message || "An error occurred during registration.");
              }
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