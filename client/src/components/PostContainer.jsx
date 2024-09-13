import { useGetQueries } from "../hooks/useGetQueries";
import QueryBox from "./QueryBox";

export default function PostContainer() {
  const { queries, loading } = useGetQueries();

  return (
    <div className="w-3/4 mt-12 ml-[25%] p-4"> {/* ml-[25%] to account for the dashboard's width */}
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="space-y-4">
        {queries.map((query) => (
          <QueryBox
            key={query.query_id}
            username={query.username}
            icon={query.icon}
            updatedAt={query.updated_at}
            title={query.title}
            content={query.content}
          />
        ))}
        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : null}
      </div>
    </div>
  );
}

