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

            if (!res.data.success) {
                toast.error(res.data.error);
            }

            toast.success(res.data.message);
            
        } catch (error) {
            toast.error(error.message);
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