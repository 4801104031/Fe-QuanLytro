import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'react-feather';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';

function AccountManagement() {
  const [accounts, setAccounts] = useState([
    { id: 1, type: 'admin', username: 'admin', password: 'admin', resident: null },
    { id: 2, type: 'resident', username: 'user', password: 'user', resident: 'Nguyễn Thắng' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    type: 'resident',
    username: '',
    password: '',
    resident: ''
  });
  const navigate = useNavigate();

  const handleEdit = (account) => {
    setEditingAccount(account);
    setFormData({
      type: account.type,
      username: account.username,
      password: account.password,
      resident: account.resident || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      setAccounts(accounts.filter(account => account.id !== id));
    }
  };

  const handleAddNew = () => {
    setEditingAccount(null);
    setFormData({ type: 'resident', username: '', password: '', resident: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAccount) {
      setAccounts(accounts.map(account =>
        account.id === editingAccount.id ? { ...account, ...formData } : account
      ));
    } else {
      setAccounts([...accounts, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleViewInfo = () => {
    setIsInfoModalOpen(true);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Danh sách tài khoản hệ thống</h1>
        <div className="space-x-2">
          <button
            onClick={handleViewInfo}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Thông tin tài khoản
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Đăng xuất
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Plus size={16} className="inline-block mr-1" />
            Thêm mới
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">STT</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Loại tài khoản</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên tài khoản (username)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mật khẩu (password)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Cư dân</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {accounts.map((account, index) => (
              <tr key={account.id}>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{account.type}</td>
                <td className="px-4 py-3 text-sm">{account.username}</td>
                <td className="px-4 py-3 text-sm">{'•'.repeat(account.password.length)}</td>
                <td className="px-4 py-3 text-sm">{account.resident || '-'}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(account)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    {account.type !== 'admin' && (
                      <button
                        onClick={() => handleDelete(account.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAccount ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Loại tài khoản
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
            >
              <option value="admin">Admin</option>
              <option value="resident">Cư dân</option>
            </select>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Tên tài khoản
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          {formData.type === 'resident' && (
            <div>
              <label htmlFor="resident" className="block text-sm font-medium text-gray-700">
                Cư dân
              </label>
              <input
                type="text"
                id="resident"
                name="resident"
                value={formData.resident}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {editingAccount ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Thông tin tài khoản"
      >
        <div className="space-y-4">
          <p><strong>Tên tài khoản:</strong> admin</p>
          <p><strong>Loại tài khoản:</strong> Admin</p>
          <p><strong>Ngày tạo:</strong> 01/01/2023</p>
          <button
            onClick={() => setIsInfoModalOpen(false)}
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Đóng
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AccountManagement;

