import Dashboard from "../../components/Dashboard/Dashboard";
import Navbar from "../../components/Navbar";
import PostContainer from "../../components/Posts/PostContainer";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex mt-16"> 
        <div className="w-1/4 h-screen bg-gray-100 border-r-2 border-gray-200">
          <Dashboard />
        </div>
        <div className="w-3/4 p-6">
          <PostContainer />
        </div>
      </div>
    </>
  );
};

export default AppLayout;