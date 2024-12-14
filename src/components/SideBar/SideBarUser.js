import React, { useState } from 'react';
import { FileText, MessageSquare, Settings, Calendar,Home } from 'react-feather'; // Thêm biểu tượng Calendar
import './SidebarUser.css';

function SidebarUser({ onNavigate }) {
  const [activeItem, setActiveItem] = useState('welcome');

  const menuItems = [
    { id: 'booking', label: 'Đặt phòng', icon: Calendar }, // Đưa mục đặt phòng lên đầu tiên
    { id: 'roomDetails', label: 'Phòng của bạn', icon: Home }, // Thêm mục Phòng của bạn
    { id: 'bills', label: 'Hóa đơn', icon: FileText },
    { id: 'feedback', label: 'Phản hồi', icon: MessageSquare },
    { id: 'settings', label: 'Cài đặt', icon: Settings }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    onNavigate(itemId);
  };

  return (
    <div className="sidebar bg-teal-600 text-white h-screen p-4 w-64 fixed">
      <div className="logo-container mb-6">
        <h1 className="text-2xl font-semibold">IT MOTEL</h1>
      </div>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item mb-2 py-2 px-4 rounded-md cursor-pointer ${activeItem === item.id ? 'bg-teal-800' : 'hover:bg-teal-700'}`}
            onClick={() => handleItemClick(item.id)}
          >
            <div className="flex items-center">
              <item.icon size={20} className="mr-2" />
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default SidebarUser;
