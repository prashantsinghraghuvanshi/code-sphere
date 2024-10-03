import Dashboard from "../../components/Dashboard/Dashboard";
import Navbar from "../../components/Navbar";
import PostContainer from "../../components/Post/PostContainer";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Store/authSlice";

const AppLayout = () => {
  const dispatch=useDispatch();
  const data=JSON.parse(sessionStorage.getItem('user'));
  dispatch(setUserData({ 
        user_id : data.user_id,
        username: data.username,
        firstname: data.firstname,
        icon: data.icon,
        rolename: data.rolename
  }));

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