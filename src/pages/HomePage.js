import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button'; // Import component Button

const HomePage = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">Chào mừng đến với IT MOTEL!</h1>
      <p className="text-gray-700 mb-6">Ứng dụng quản lý cư dân và hóa đơn cho khách hàng. Trải nghiệm các tính năng dễ sử dụng và hiệu quả.</p>
      <div className="flex space-x-4">
        <Link to="/login">
          <Button variant="primary" className="m-2 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-300">Đăng nhập</Button>
        </Link>
        <Link to="/register">
          <Button variant="default" className="m-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-300">Đăng ký</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
