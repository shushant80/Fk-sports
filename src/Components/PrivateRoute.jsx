import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../Config/authService";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Track the current page

  useEffect(() => {
    const checkAuth = async () => {
      const loggedInUser = await getCurrentUser();
      setUser(loggedInUser);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  // 🔹 Redirect to login if no user is found, preserving the original path
  if (!user) {
    return <Navigate to={`/auth?redirect=${location.pathname}`} replace />;
  }

  return children;
};

export default PrivateRoute;
