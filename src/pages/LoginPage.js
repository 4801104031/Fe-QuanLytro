import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button'; // Import component Button

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [role, setRole] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">Đăng nhập</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Vai trò</label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={(e) => setRole(e.target.value)}
                className="form-radio h-4 w-4 text-teal-600"
              />
              <span className="ml-2">Admin</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                onChange={(e) => setRole(e.target.value)}
                className="form-radio h-4 w-4 text-teal-600"
              />
              <span className="ml-2">User</span>
            </label>
          </div>
        </div>
        <Button
          onClick={handleLogin}
          variant="primary"
          className="w-full py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
        >
          Đăng nhập
        </Button>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link to="./RegisterPage.js" className="text-teal-600 hover:text-teal-700">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
