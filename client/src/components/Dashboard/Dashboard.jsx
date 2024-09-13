import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogout } from "../../hooks/useLogout";
import UserStats from "./UserStats";

export default function Dashboard() {
  const {user_id, name, rolename, icon}=useSelector((state)=>state.auth);
  const {logout}=useLogout();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async(e)=>{
    e.preventDefault();
    const result=await logout(user_id);

    if(result.status===200){
      console.log(result.data);
      dispatch(clearUser());
      navigate('/login');
    } else {
      toast.error('Login failed. Please try again.');
    }
  }
  return (
    <div className="w-1/4 h-[calc(100vh-64px)] bg-gray-100 p-6 fixed left-0 top-[64px] flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center mb-8">
        <img
          className="w-20 h-20 rounded-full object-cover mb-2"
          src={icon} // Replace with actual profile image URL
          alt="Profile Picture"
        />
        <h3 className="text-xl font-medium">hello {name} !</h3>
        <span className="text-gray-500">Current Status : {rolename?rolename:'user'}</span>
      </div>
      <UserStats />
      <button
      onClick={handleLogout} 
      className="mt-8 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
        Logout
      </button>
    </div>
  );
}