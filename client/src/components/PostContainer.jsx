import { useGetQueries } from "../hooks/useGetQueries";
import QueryBox from "./QueryBox";

export default function PostContainer() {
  const {queries, loading}=useGetQueries();
  return (
    <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <div className="space-y-4">
          {queries.map((query)=>(
            <QueryBox
              key={query.query_id}
              username={query.username}
              updatedAt={query.updated_at}
              title={query.title}
              content={query.content}
            />
          ))}
          {loading? (
            <span className="loading loading-spinner mx-auto"></span>
          ): null}
        </div>
      </div>
  )
}
