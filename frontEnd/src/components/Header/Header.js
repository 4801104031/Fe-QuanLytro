import React from 'react';
import { User } from 'react-feather';

const Header = () => (
  <header className="bg-teal-700 text-white p-4 flex justify-between items-center shadow-md">
    <div className="flex items-center">
      <img src="/path-to-your-logo.png" alt="Logo" className="w-10 h-10 mr-3" />
      <h1 className="text-xl font-bold">IT MOTEL</h1>
    </div>
    <nav className="hidden md:flex space-x-4">
      <a href="/dashboard" className="hover:underline">Dashboard</a>
      <a href="/profile" className="hover:underline">Profile</a>
      <a href="/settings" className="hover:underline">Settings</a>
    </nav>
    <div className="relative">
      <User className="w-6 h-6" />
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
        <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đăng xuất</a>
      </div>
    </div>
  </header>
);

export default Header;
