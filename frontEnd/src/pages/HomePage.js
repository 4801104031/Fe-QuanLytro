import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button'; // Import component Button
import banner from '../assets/banner.jpg';

const HomePage = () => (
  <div className="min-h-screen flex flex-col justify-between bg-gray-100">
    <header className="bg-teal-600 text-white py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">IT MOTEL</h1>
        <nav>
          <Link to="/login" className="text-white mx-2 hover:text-gray-300">Đăng nhập</Link>
          <Link to="/register" className="text-white mx-2 hover:text-gray-300">Đăng ký</Link>
          <Link to="/rooms" className="text-white mx-2 hover:text-gray-300">Phòng</Link> {/* Thêm liên kết */}
        </nav>
      </div>
    </header>
    <main className="flex-grow container mx-auto px-6 py-12 flex flex-col justify-center items-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-teal-600 mb-4">Chào mừng đến với IT MOTEL!</h2>
        <p className="text-gray-700 mb-6">Ứng dụng quản lý cư dân và hóa đơn cho khách hàng. Trải nghiệm các tính năng dễ sử dụng và hiệu quả.</p>
        <img src={banner} alt="Banner" className="mb-6 rounded-lg shadow-md" />
        <div className="flex space-x-4 justify-center">
          
        </div>
      </div>
    </main>
    <footer className="bg-teal-600 text-white py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Thông tin liên hệ</h3>
          <p>Email: info@itmotel.com</p>
          <p>Điện thoại: 0123-456-789</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Liên kết</h3>
          <nav>
            <Link to="/" className="block text-white hover:text-gray-300">Trang chủ</Link>
            <Link to="/about" className="block text-white hover:text-gray-300">Giới thiệu</Link>
            <Link to="/contact" className="block text-white hover:text-gray-300">Liên hệ</Link>
          </nav>
        </div>
      </div>
    </footer>
  </div>
);

export default HomePage;
