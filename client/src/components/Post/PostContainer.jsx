import { useGetQueries } from "../../hooks/useGetQueries";
import QueryBox from "./QueryBox";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetQueriesById } from "../../hooks/useGetQueriesById"; // Assuming this is your hook
import ChatBot from "../Bot/ChatBot";

export default function PostContainer() {
  const [displayedQueries, setDisplayedQueries] = useState([]);
  const { user_id, firstname } = useSelector((state) => state.auth);

  // Pagination
  const [curPage, setCurPage] = useState(1);
  const recordsPerPage = 4;

  const { queries: allQueries = [], loading: dataLoading } = useGetQueries(); // Fetch all queries
  const { queries: userQueries = [], loading: userLoading } = useGetQueriesById(user_id); // Fetch user's specific queries

  const postContainer = useSelector((state) => state.auth.postContainer);

  useEffect(() => {
    let selectedQueries = [];
    
    switch (postContainer) {
      case 0:
        selectedQueries = allQueries;
        break;
      case 1:
        selectedQueries = userQueries;
        break;
      case 2:
        selectedQueries = [];
        break;
      default:
        selectedQueries = [];
    }

    // Apply pagination based on the current page
    const lastIndex = curPage * recordsPerPage;
    const paginatedQueries = selectedQueries.slice(0, lastIndex);

    setDisplayedQueries(paginatedQueries);
  }, [postContainer, allQueries, userQueries, curPage]);

  // Handler to load more queries
  const handleShowMore = () => {
    setCurPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-2">
        {postContainer === 0 && "Global Queries"}
        {postContainer === 1 && `${firstname}'s Queries `}
        {postContainer === 2 && (
          <>
            <span>Ask your doubts from AI</span>
            <ChatBot />
          </>
        )}
      </h2>

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

        {/* "Show More" button */}
        {postContainer!==2 && displayedQueries.length < allQueries.length && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleShowMore}
          >
            Show More Queries
          </button>
        )}
      </div>
    </div>
  );
}
