import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PostQuestionBox from './PostQuestionBox';  // Import PostModal component

const Navbar = () => {
  const { icon } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to toggle modal

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white border-b-2 border-gray-200 px-4 py-2 flex justify-between">
        {/* Left side */}
        <div className="flex items-center">
          {/* Home icon */}
          <FontAwesomeIcon icon={faHome} className="h-6 w-6 ml-4 mr-5" />
          <h1 className="text-xl font-bold mr-16">Code Sphere</h1>
          {/* Answer icon */}
          <FontAwesomeIcon icon={faPlus} className="h-6 w-6 ml-4" />
        </div>

        {/* Right side */}
        <div className="flex items-center">
          {/* Search bar */}
          <input type="text" className="border border-gray-300 rounded-md px-3 py-2 mr-10" placeholder="Search" />
          {/* User profile icon */}
          <img src={icon} alt="user" className="h-6 w-6 ml-4 mr-5" />
          {/* Add question button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
            onClick={handleOpenModal}  // Open the modal
          >
            Add Question
          </button>
        </div>
      </nav>

      {/* Render the PostModal component when isModalOpen is true */}
      {isModalOpen && <PostQuestionBox onClose={handleCloseModal} />}
    </>
  );
};

export default Navbar;
