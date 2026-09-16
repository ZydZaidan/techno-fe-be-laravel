import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const savedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

  let user = null;
  if (savedUser) {
    try {
      user = JSON.parse(savedUser);
    } catch {
      // Jika JSON error / corrupt, bersihkan storage & lempar ke login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }
  }

  // 1. Belum login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Cek Role Access
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role?.toLowerCase();
    const isAllowed = allowedRoles.some((role) => role.toLowerCase() === userRole);

    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
  }

  // 3. Lolos Guard
  return <Outlet />;
};

export default ProtectedRoute;