import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';

const UserSettings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý logic đăng xuất ở đây (nếu có)
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Cài đặt</h2>
      <Button
        onClick={handleLogout}
        variant="primary"
        className="w-full py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
      >
        Đăng xuất
      </Button>
    </div>
  );
};

export default UserSettings;
