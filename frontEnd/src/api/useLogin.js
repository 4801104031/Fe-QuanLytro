import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const login = async (credentials) => {
    setIsLoggingIn(true);
    setLoginError(null);

    // Xóa token cũ trước khi thử đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    try {
      // Lấy CSRF cookie trước khi gọi API
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        Username: credentials.username,
        Password: credentials.password,
      });

      // Kiểm tra nếu API trả về thành công
      if (response.status === 200 && response.data.success) {
        const { token, token_type, user } = response.data;

        // Lưu token và role vào localStorage
        localStorage.setItem("token", `${token_type} ${token}`);
        localStorage.setItem("role", user.role);

        return user.role; // Trả về vai trò của user
      } else {
        // Đăng nhập không thành công (success = false)
        setLoginError(response.data.message || "Tài khoản hoặc mật khẩu không đúng.");
        return null;
      }
    } catch (error) {
      // Xử lý lỗi từ server hoặc network
      console.error("Đăng nhập thất bại:", error.response?.data?.message || error.message);
      setLoginError(error.response?.data?.message || "Tài khoản hoặc mật khẩu không đúng.");
      return null;
    } finally {
      setIsLoggingIn(false);
    }
  };

  return { login, isLoggingIn, loginError };
};

export default useLogin;
