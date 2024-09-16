import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useFetchSolutions = (queryId) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:5001/api/data/solutions", {
          params: { query_id: queryId }
        });
        setSolutions(result.data.data || []);
      } catch (error) {
        console.log(error.message);
        toast.error("Error fetching solutions.");
      } finally {
        setLoading(false);
      }
    };

    if (queryId) {
      fetchSolutions();
    }
  }, [queryId]);

  return { solutions, loading };
};
