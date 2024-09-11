const handleError = (status, data) => {
    switch (status) {
      case 400: // Bad request
        return data.error || "Invalid login credentials.";
      case 404: // Not Found
        return data.error || "User not found.";
      case 409: // Conflict
        return data.error || "Username or email already in use.";
      case 500: // Internal server error
        return "An unexpected error occurred. Please try again later.";
      default:
        return "Login failed. Please check the response for details.";
    }
};

export default handleError;