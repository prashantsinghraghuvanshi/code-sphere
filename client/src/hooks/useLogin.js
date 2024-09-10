import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

export const useLogin=()=>{
    const [loading, setLoading]=useState(false);

    const login=async(username, password)=>{
        const success=handleInputErrors({username, password});
        if(!success)    return;

        setLoading(true);

        try {
            const res= await axios.post('http://localhost:5001/api/auth/signIn', {
                username,
                password
            });
            console.log(res);

            // not working
            if (!res.data.success) {
                toast.error(res.data.error);
            }

            toast.success(res.data.message);
            
        } catch (error) {
            if (error.response && error.response.data) {
                const { status, data } = error.response;
        
                switch (status) {
                  case 400: // Bad request (e.g., invalid email format)
                    toast.error(data.error || "Invalid registration data provided.");
                    break;
                  case 409: // Conflict (e.g., username or email already exists)
                    toast.error(data.error || "Username or email already in use.");
                    break;
                  case 500: // Internal server error
                    toast.error(
                      "An unexpected error occurred during registration. Please try again later."
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

    return {login, loading};
}

function handleInputErrors({username, password}) {
    console.log(username, password);
    if(!username || !password){
        toast.error("Please fill out all the entries");
        return false;
    }

    return true;
}