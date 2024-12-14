import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';

const UserSettings = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý logic đăng xuất ở đây (nếu có)
    navigate('/login');
  };

  const handleOpenInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Cài đặt</h2>
      <Button
        onClick={handleOpenInfoModal}
        variant="primary"
        className="w-full py-2 px-4 mb-4 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
      >
        Thông tin tài khoản
      </Button>
      <Button
        onClick={handleOpenChangePasswordModal}
        variant="primary"
        className="w-full py-2 px-4 mb-4 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
      >
        Đổi mật khẩu
      </Button>
      <Button
        onClick={handleLogout}
        variant="primary"
        className="w-full py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
      >
        Đăng xuất
      </Button>

      {/* Thông tin tài khoản Modal */}
      <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} title="Thông tin tài khoản">
        <div>
          <p><strong>Tên tài khoản:</strong> admin</p>
          <p><strong>Email:</strong> admin@itmotel.com</p>
        </div>
      </Modal>

      {/* Đổi mật khẩu Modal */}
      <Modal isOpen={isChangePasswordModalOpen} onClose={handleCloseChangePasswordModal} title="Đổi mật khẩu">
        <form>
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={handleCloseChangePasswordModal}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Lưu
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserSettings;
