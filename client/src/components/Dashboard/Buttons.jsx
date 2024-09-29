import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "../../hooks/useLogout";
import { useDispatch } from "react-redux";
import { clearUser, setPostContainer } from "../../Store/authSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Buttons() {
  const { user_id, rolename, postContainer } = useSelector(
    (state) => state.auth
  );
  const { logout } = useLogout();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const result = await logout(user_id);

    if (result.data.success) {
      // removing user data from REDUX and session storage
      dispatch(clearUser());
      sessionStorage.clear();
      navigate("/login");
    } else {
      toast.error("Login failed. Please try again.");
    }
  };

  // have to add async here after adding an appropriate hook
  const handleStatusChangeRequest = (e) => {
    e.preventDefault();
    toast("Status Change request sent to admin, please wait...", {
      icon: "⏰",
      position: "top-left",
    });
  };

  const handleFetchUserQueries = (e) => {
    e.preventDefault();
    {
      postContainer === 0
        ? dispatch(setPostContainer(1))
        : dispatch(setPostContainer(0));
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={handleFetchUserQueries}
        className="mt-4 py-2 px-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 focus:outline-none"
      >
        {postContainer === 0 ? "View your queries" : "View all queries"}
      </button>
      <button
        onClick={handleStatusChangeRequest}
        className=" py-2 bg-blue-500 text-white rounded-md hover:bg-blue-900 focus:outline-none"
      >
        Request Status change to {rolename == "user" ? "mentor" : "user"}
      </button>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-900 focus:outline-none flex justify-between items-center w-full"
      >
        <span className="flex-grow text-center">Logout</span>
        <FontAwesomeIcon icon={faRightFromBracket} className="ml-1" />
      </button>
    </div>
  );
}
