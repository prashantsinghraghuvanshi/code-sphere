import PropTypes from "prop-types";
import moment from "moment";

export default function QueryBox({username, icon, updatedAt, title, content}) {
  const formattedDate=moment(updatedAt).startOf('hour').fromNow() ;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={icon} // Replace with actual URL
            alt="User Profile Photo"
            className="w-10 h-10 rounded-full"
          />
        <div className="ml-2">
          <h3 className="text-lg font-bold">{username}</h3>
          <p className="text-gray-500">Updated at : {formattedDate}</p>
        </div>
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-700">{content}</p>
  </div>
  )
}

QueryBox.propTypes = {
  username: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
