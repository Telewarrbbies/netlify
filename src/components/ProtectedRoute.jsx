import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("adminToken")
      : null;

  if (!token) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default ProtectedRoute;
