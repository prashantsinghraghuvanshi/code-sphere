import QueryBox from "./QueryBox";

export default function PostContainer() {
  return (
    <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <div className="space-y-4">
          {/* Post 1 */}
          <QueryBox />
          <QueryBox />
          {/* Add more posts here */}
        </div>
      </div>
  )
}
