export default function Post() {
  return (
    <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <div className="space-y-4">
          {/* Post 1 */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-bold mb-2">Post Title 1</h3>
            <p className="text-gray-700">Post content 1</p>
          </div>
          {/* Add more posts here */}
        </div>
      </div>
  )
}
