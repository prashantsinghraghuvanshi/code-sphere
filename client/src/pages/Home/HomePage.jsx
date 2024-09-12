import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/Navbar";
import PostContainer from "../../components/PostContainer";

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div>
      <Dashboard />
      <PostContainer />
    </div>
    </>
  );
};

export default HomePage;