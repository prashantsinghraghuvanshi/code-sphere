import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/Navbar";
import PostContainer from "../../components/PostContainer";

const HomePage = () => {
  return (
    <div className="ml-20 mr-20">
    <Navbar />
    <div className="flex h-screen">
      <Dashboard />
      <PostContainer />
    </div>
    </div>
  );
};

export default HomePage;