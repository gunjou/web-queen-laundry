import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ belum login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ role tidak sesuai
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // redirect sesuai role
    if (user.role === "admin") return <Navigate to="/dashboard" replace />;
    if (user.role === "staff")
      return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
