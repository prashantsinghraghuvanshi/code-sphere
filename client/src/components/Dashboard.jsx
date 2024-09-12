import { useSelector } from "react-redux";

export default function Dashboard() {
  const {name, rolename}=useSelector((state)=>state.auth);
  return (
    <div className="w-1/4 h-[calc(100vh-64px)] bg-gray-100 p-6 fixed left-0 top-[64px] flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center mb-8">
        <img
          className="w-20 h-20 rounded-full object-cover mb-2"
          src="https://placehold.it/200x200" // Replace with actual profile image URL
          alt="Profile Picture"
        />
        <h3 className="text-xl font-medium">hello {name}</h3>
        <span className="text-gray-500">status : {rolename}</span>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-2">
          <span className="text-gray-700 font-medium">Queries Posted</span>
          <span className="text-gray-500">queriesPosted</span>
        </div>
        <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-2">
          <span className="text-gray-700 font-medium">Queries Answered</span>
          <span className="text-gray-500">queriesAnswered</span>
        </div>
      </div>
      <button className="mt-8 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
        Logout
      </button>
    </div>
  );
}