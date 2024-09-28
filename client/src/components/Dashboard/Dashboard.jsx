import { useSelector } from "react-redux";
import UserStats from "./UserStats";
import Buttons from "./Buttons";

export default function Dashboard() {
  const { firstname, rolename, icon}=useSelector((state)=>state.auth);

  return (
    <div className="w-1/4 h-[calc(100vh-64px)] bg-gray-100 p-6 fixed left-0 top-[64px] flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center mb-8">
        <img
          className="w-20 h-20 rounded-full object-cover mb-2"
          src={icon} // Replace with actual profile image URL
          alt="Profile Picture"
        />
        <h3 className="text-xl font-medium">hello {firstname} !</h3>
        <span className="mt-3 p-1 text-black bg-lime-300 rounded-md">Current Status : {rolename?rolename:'user'}</span>
      </div>
      <UserStats />
      <Buttons />
    </div>
  );
}