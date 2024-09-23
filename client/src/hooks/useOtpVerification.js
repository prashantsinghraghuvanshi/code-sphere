import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

export const useOtpVerification=()=>{
    const [loading, setLoading]=useState(false);

    const otpVerification=async(user_id, otp)=>{
        const success=handleInputError({otp});
        if(!success)    return;

        setLoading(true);

        try {
            const result=await axios.get('http://localhost:5001/api/auth/verifyOtp', {
              params: { user_id: user_id, otp: otp }
            });
            console.log(result);

            toast.success('otp verified');
            return result
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