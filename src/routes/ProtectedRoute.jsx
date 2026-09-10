import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  // Ambil data dari localStorage atau sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const savedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // 1. Jika belum login, lempar ke /login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Cek apakah role sesuai
  if (allowedRoles && !allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  // 3. Lolos verifikasi
  return <Outlet />;
};

export default ProtectedRoute;