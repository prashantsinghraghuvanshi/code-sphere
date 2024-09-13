import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useLogout=()=>{
    const [loading, setLoading]=useState(false);

    const logout=async(user_id)=>{
        setLoading(true);

        try {
            const result=await axios.post('http://localhost:5001/api/auth/signOut',{
                user_id
            })
            toast.success(result.data.message);
            return result;
        } catch (error) {
            if (error.response && error.response.data) {
                const { status, data } = error.response;
        
                switch (status) {
                  case 400: // Bad request (e.g., invalid email format)
                    toast.error(data.error || "Invalid data, no user id.");
                    break;
                  case 404: // Not Found
                    toast.error(data.error || "no user record found in database");
                    break;
                  case 500: // Internal server error
                    toast.error(
                      "An unexpected error occurred during logout. Please try again later."
                    );
                    break;
                  default:
                    toast.error(
                      "Logout failed. Please check the response for details."
                    );
                }
              } else {
                toast.error(error.message || "An error occurred during registration.");
              } 
        } finally {
            setLoading(false);
        }
    }
    return {logout, loading}
}