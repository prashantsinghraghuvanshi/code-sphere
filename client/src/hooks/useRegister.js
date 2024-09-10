import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (username, email, password) => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/user/signUp", {
        username,
        email,
        password,
      });

      if (response.status !== 201) {
        throw new Error("Registration failed. Please check the response for details.");
      }

      toast.success(response.data.message); 
      return response;
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

  return { register, loading };
};