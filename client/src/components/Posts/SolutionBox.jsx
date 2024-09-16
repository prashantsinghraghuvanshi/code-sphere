import PropTypes from "prop-types";
import moment from "moment";
import { useState } from "react";
import { useFetchSolutions } from "../../hooks/useFetchSolutions"; // Import the custom hook

export default function SolutionBox({ queryId }) {
  const { solutions, loading } = useFetchSolutions(queryId);  // Use the custom hook to fetch solutions
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        username: "Anonymous",  // Replace with actual username if available
        content: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-2">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <>
          <ul>
            {solutions.length > 0 ? (
              solutions.map((solution, index) => (
                <li key={index} className="mb-2">
                  <p className="text-gray-700">{solution.content}</p>
                  <p className="text-gray-500">
                    By {solution.username} - {moment(solution.created_at).startOf("hour").fromNow()}
                  </p>
                </li>
              ))
            ) : (
              <p>No solutions yet.</p>
            )}
          </ul>

          {/* Form to submit a new comment */}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="w-full p-2 border rounded-md"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
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
