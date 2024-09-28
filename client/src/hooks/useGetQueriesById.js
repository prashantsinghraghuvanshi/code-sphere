import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const useGetQueriesById = (userId) => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQueriesById = async () => {
      setLoading(true);

      try {
        const result = await axios.get(
          "http://localhost:5001/api/data/queryById",
          {
            params: { userId: userId },
          }
        );
        const data = result.data.data;
        setQueries(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.response && error.response.data) {
          const { status, data } = error.response;
          switch (status) {
            case 404: // Not Found
              toast.error(data.error || "No query record found in database");
              break;
            case 500: // Internal server error
              toast.error(
                "An unexpected error occurred during fetching questions. Please try again later."
              );
              break;
            default:
              toast.error("Fetching queries failed.");
          }
        } else {
          toast.error(
            error.message || "An error occurred during fetching questions."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getQueriesById(); // Only fetch when userId is provided
    }
    
  }, [userId]); // Add userId as a dependency to refetch when it changes

  return { queries, loading };
};
