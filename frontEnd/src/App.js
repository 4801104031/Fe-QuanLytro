// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import LoginPage from './pages/LoginPage'; // Import trang đăng nhập
import RegisterPage from './pages/RegisterPage';
import UserRoomList from './features/UserManagement/UserRoomList';
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />  {/* Định nghĩa tuyến đường cho trang đăng nhập */}
      <Route path="/admin" element={<AdminLayout />} />
      <Route path="/user" element={<UserLayout />} />
      <Route path="/rooms" element={<UserRoomList />} /> {/* Thêm route */}
    </Routes>
  </Router>
);

export default App;
