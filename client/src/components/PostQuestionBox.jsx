import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { usePostQuestion } from "../hooks/usePostQuestion";
import toast from "react-hot-toast";

const PostModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { postQuestion, loading } = usePostQuestion();
  const { user_id } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePost = async () => {
    const result = await postQuestion(title, description, user_id);

    if (result.status === 201) {
      navigate("/home");
      window.location.reload();
    } else {
      toast.error("Failed to post question");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Post a Question</h2>
          <button onClick={onClose} className="text-gray-500">
            X
          </button>
        </div>

        {/* Title Input */}
        <div className="mt-4">
          <label className="block text-gray-700">Question Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter the question title"
          />
        </div>

        {/* Description Input */}
        <div className="mt-4">
          <label className="block text-gray-700">Question Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="5"
            placeholder="Enter the question description"
          />
        </div>

        {/* Post Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handlePost}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

PostModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PostModal;
