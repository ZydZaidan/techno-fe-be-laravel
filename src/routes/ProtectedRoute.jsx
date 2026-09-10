import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const savedUser = sessionStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // 1. Jika belum login (tidak ada token/user), tendang ke /login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Jika ada pembatasan role & role user tidak sesuai, lempar ke home /
  if (allowedRoles && !allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  // 3. Jika lolos verifikasi, tampilkan halaman yang diminta
  return <Outlet />;
};

export default ProtectedRoute;