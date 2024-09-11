export default function QueryBox() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center">
      <img
        src="https://example.com/user_profile_photo.jpg" // Replace with actual URL
        alt="User Profile Photo"
        className="w-10 h-10 rounded-full"
      />
      <div className="ml-2">
        <h3 className="text-lg font-bold">Username</h3>
        <p className="text-gray-500">Created at: 2023-01-01</p>
      </div>
    </div>
  </div>
  <h3 className="text-xl font-bold mb-2">Post Title 1</h3>
  <p className="text-gray-700">Post content 1</p>
</div>
  )
}
