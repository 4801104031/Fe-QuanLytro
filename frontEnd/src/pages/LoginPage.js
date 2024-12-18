import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/Button";
import useLogin from "../api/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn, loginError } = useLogin();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const role = await login(credentials); // Lấy role sau khi login
    if (role) {
      if (role === "admin") {
        navigate("/admin"); // Điều hướng đến trang admin
      } else if (role === "resident") {
        navigate("/user"); // Điều hướng đến trang user
      } else {
        console.error("Vai trò không xác định.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Đăng nhập</h1>
        {loginError && <p className="text-red-500 text-center mb-4">{loginError}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Tên đăng nhập
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
        <Button
          onClick={handleLogin}
          variant="primary"
          className="w-full py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link to="/register" className="text-teal-600 hover:text-teal-700">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
