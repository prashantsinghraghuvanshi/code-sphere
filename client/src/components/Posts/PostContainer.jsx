import { useGetQueries } from "../../hooks/useGetQueries";
import QueryBox from "./QueryBox";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetQueriesById } from "../../hooks/useGetQueriesById"; // Assuming this is your hook

export default function PostContainer() {
  const [displayedQueries, setDisplayedQueries] = useState([]);

  const { queries: allQueries = [], loading: dataLoading } = useGetQueries(); // Fetch all queries
  const userId = useSelector((state) => state.auth.user_id); // Assuming userId comes from Redux state
  const { queries: userQueries = [], loading: userLoading } = useGetQueriesById(userId); // Fetch user's specific queries

  const postContainer = useSelector((state) => state.auth.postContainer);

  useEffect(() => {
    switch (postContainer) {
      case 0:
        setDisplayedQueries(allQueries);
        break;
      case 1:
        setDisplayedQueries(userQueries);
        break;
      case 2:
        setDisplayedQueries([]);
        break;
      default:
        setDisplayedQueries([]);
    }
  }, [postContainer, allQueries, userQueries]);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-2">Posts</h2>

      <div className="space-y-4 justify-center items-center">
        {/* Displaying queries conditionally */}
        {displayedQueries.map((query) => (
          <QueryBox
            key={query.query_id}
            queryId={query.query_id}
            username={query.username}
            icon={query.icon}
            updatedAt={query.updated_at}
            title={query.title}
            content={query.content}
          />
        ))}

        {/* Loading spinner */}
        {(dataLoading || userLoading) && (
          <span className="loading loading-spinner mx-auto"></span>
        )}
      </div>
    </div>
  );
}
