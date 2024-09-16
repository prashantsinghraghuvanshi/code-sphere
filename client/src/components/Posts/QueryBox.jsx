import PropTypes from "prop-types";
import moment from "moment";
import { useState } from "react";
import SolutionBox from "./SolutionBox";

export default function QueryBox({ username, queryId, icon, updatedAt, title, content }) {
  const formattedDate = moment(updatedAt).format('ll');
  const [isOpen, setIsOpen] = useState(false);  // State to toggle solution visibility

  const handleOnClick = () => {
    setIsOpen(!isOpen);  // Toggle open/close of the solution box
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={icon}
            alt="User Profile Photo"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2">
            <h3 className="text-lg font-bold">{username}</h3>
            <p className="text-gray-500">Updated at: {formattedDate}</p>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{content}</p>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleOnClick}
        >
          {isOpen ? "Hide Answers" : "Show Answers"}
        </button>
        {isOpen && (
          <SolutionBox queryId={queryId} />
        )}
      </div>
    </div>
  );
}

QueryBox.propTypes = {
  username: PropTypes.string.isRequired,
  queryId: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
