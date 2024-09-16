import PropTypes from "prop-types";
import moment from "moment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchSolutions } from "../../hooks/useFetchSolutions";  // Custom hook to fetch solutions
import { usePostSolution } from "../../hooks/usePostSolution";     // Custom hook to post solution

export default function SolutionBox({ queryId }) {
  const { user_id } = useSelector((state) => state.auth);  // Get logged-in user's ID from Redux
  const { solutions: fetchedSolutions, loading: fetchLoading } = useFetchSolutions(queryId);  // Fetch existing solutions using custom hook
  const { postSolution, loading: postLoading, solutions: newSolutions } = usePostSolution();  // Post a new solution using custom hook
  const [solutions, setSolutions] = useState([]);  // Local state to manage all solutions (fetched + new)
  const [newComment, setNewComment] = useState("");

  // Sync fetched solutions with the local state initially
  useEffect(() => {
    if (fetchedSolutions.length > 0) {
      setSolutions(fetchedSolutions);
    }
  }, [fetchedSolutions]);

  // Sync new solutions (after posting) with the local state
  useEffect(() => {
    if (newSolutions.length > 0) {
      setSolutions(newSolutions);  // Replace the local state with the latest solutions from the server
    }
  }, [newSolutions]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      // Post the new solution to the backend
      postSolution(queryId, newComment, user_id);
      setNewComment("");  // Clear the input field after submission
    }
  };

  return (
    <div className="mt-2">
      {(fetchLoading || postLoading) ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <>
          <ul>
            {solutions.length > 0 ? (
              solutions.map((solution, index) => (
                <li key={index} className="mb-2">
                  <p className="text-gray-700">{solution.content}</p>
                  <p className="text-gray-500">
                    By {solution.username || "Anonymous"} - {moment(solution.updated_at).format('MMMM Do YYYY, h:mm:ss a')};
                  </p>
                </li>
              ))
            ) : (
              <p>No solutions yet.</p>
            )}
          </ul>

          {/* Form to submit a new solution */}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="w-full p-2 border rounded-md"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a solution..."
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}

SolutionBox.propTypes = {
  queryId: PropTypes.number.isRequired,
};
