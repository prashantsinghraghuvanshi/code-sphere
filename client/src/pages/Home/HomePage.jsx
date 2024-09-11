import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/Navbar";
import Post from "../../components/PostContainer";

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="flex h-screen">
      <Dashboard />
      <Post />
    </div>
    </>
  );
};

export default HomePage;