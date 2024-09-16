import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const usePostSolution = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(false);

  const postSolution = async (query_id, content, user_id) => {
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:5001/api/post/solution", {
        query_id,
        content,
        user_id
      });
      
      // Assuming result.data contains an array of the latest solutions
      setSolutions(result.data.data);
      toast.success("Solution posted successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Error posting solution.");
    } finally {
      setLoading(false);
    }
  };

  return { postSolution, loading, solutions };
};
