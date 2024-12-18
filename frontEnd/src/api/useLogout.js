import { useState } from "react";
import axios from "axios";

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  const logout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      // Lấy CSRF cookie trước khi gửi yêu cầu logout
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Lấy token từ localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Không tìm thấy token, người dùng chưa đăng nhập.");
      }

      // Gửi yêu cầu logout đến API
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: token, // Gửi token trong header
          },
        }
      );

      // Xóa token và role khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      return true; // Thành công
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error.response?.data?.message || error.message);
      setLogoutError(error.response?.data?.message || "Đăng xuất thất bại.");
      return false;
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut, logoutError };
};

export default useLogout;
