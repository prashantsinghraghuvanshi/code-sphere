import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const useGetUserStats = (userId) => {
    const [queryCnt, setQueryCnt] = useState(0);
    const [solutionCnt, setSolutionCnt] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserStats = async () => {
            setLoading(true);

            try {
                const result = await axios.get('http://localhost:5001/api/data/stats', {
                    params: { userId } // Use params to send query params properly
                });
                setQueryCnt(result.data.queries_posted);
                setSolutionCnt(result.data.queries_solved);
            } catch (error) {
                if (error.response && error.response.data) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 404:
                            toast.error(data.error || "No query record found in database");
                            break;
                        case 500:
                            toast.error("An unexpected error occurred during fetching stats. Please try again later.");
                            break;
                        default:
                            toast.error("Fetching user stats failed.");
                    }
                } else {
                    toast.error(error.message || "An error occurred during fetching user stats.");
                }
            } finally {
                setLoading(false);
            }
        };

        getUserStats();
    }, []); 

    return { queryCnt, solutionCnt, loading };
};
