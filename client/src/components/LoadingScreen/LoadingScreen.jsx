const LoadingScreen = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-gray-500">Please wait while we load the content.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
