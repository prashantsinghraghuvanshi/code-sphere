import { useGetUserStats } from './../../hooks/useGetUserStats';
import { useSelector } from 'react-redux';

export default function UserStats() {
    const authState = useSelector((state) => state.auth); 
    const { user_id } = authState;
    
    // console.log(user_id); 
    const { queryCnt, solutionCnt, loading } = useGetUserStats(user_id); // Correct destructuring

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-2">
                <span className="text-gray-700 font-medium">Queries Posted</span>
                <span className="text-gray-500">{queryCnt}</span> {/* Display the correct data */}
            </div>
            <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-2">
                <span className="text-gray-700 font-medium">Queries Answered</span>
                <span className="text-gray-500">{solutionCnt}</span> {/* Display the correct data */}
            </div>
        </div>
    );
}
