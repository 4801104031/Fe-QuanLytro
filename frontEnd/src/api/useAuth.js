import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Trả về token và role
  return { token, role };
};

// Bảo vệ các route không dành cho người dùng đã đăng nhập
export const GuestRoute = () => {
  const { token, role } = useAuth();

  if (token) {
    // Nếu đã có token, điều hướng đến trang phù hợp với vai trò
    return <Navigate to={role === "admin" ? "/admin" : "/user"} replace />;
  }

  return <Outlet />;
};

// Bảo vệ các route dành cho người dùng đã đăng nhập
export const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = useAuth();
  const location = useLocation();

  if (!token) {
    // Không có token -> quay về trang chủ
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Vai trò không hợp lệ -> quay về trang chủ
    return <Navigate to="/" replace />;
  }

  // Nếu hợp lệ, cho phép truy cập trang
  return <Outlet />;
};

export default useAuth;
