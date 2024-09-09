import Navbar from "../../components/Navbar";

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="flex h-screen">
      {/* Left side dashboard */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0-4l-3-3m3 0l3-3m-6 6V9" />
            </svg>
            <a href="#" className="ml-2 text-gray-700 hover:text-gray-900">Home</a>
          </li>
          {/* Add more dashboard items here */}
        </ul>
      </div>

      {/* Center area for posts */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <div className="space-y-4">
          {/* Post 1 */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-bold mb-2">Post Title 1</h3>
            <p className="text-gray-700">Post content 1</p>
          </div>
          {/* Add more posts here */}
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;