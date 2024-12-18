import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus } from "react-feather";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import useLogout from "../../api/useLogout";
import useFetchAccounts from "../../api/useFetchAccount";

function AccountManagement() {
  const [accounts, setAccounts] = useState([]); // State dữ liệu từ API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    type: "resident",
    username: "",
    password: "",
    resident: "",
  });

  const navigate = useNavigate();
  const { logout, isLoggingOut, logoutError } = useLogout();
  const { fetchAccounts } = useFetchAccounts();

  // Fetch API khi component mount
  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchAccounts();
        setAccounts(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu tài khoản:", error.message);
      }
    };

    loadAccounts();
  }, []);

  const handleLogout = async () => {
    const isSuccess = await logout();
    if (isSuccess) {
      navigate("/");
    }
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setFormData({
      type: account.LoaiTaiKhoan,
      username: account.Username,
      password: "******", // Không hiển thị mật khẩu thật
      resident: account.resident || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      setAccounts(accounts.filter((account) => account.id !== id));
    }
  };

  const handleAddNew = () => {
    setEditingAccount(null);
    setFormData({ type: "resident", username: "", password: "", resident: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Danh sách tài khoản hệ thống</h1>
        <div className="space-x-2">
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Thông tin tài khoản
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên tài khoản</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mật khẩu</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Cư dân</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <tr key={account.id}>
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">{account.LoaiTaiKhoan}</td>
                  <td className="px-4 py-3 text-sm">{account.Username}</td>
                  <td className="px-4 py-3 text-sm">••••••••</td>
                  <td className="px-4 py-3 text-sm">{account.resident || "-"}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => handleEdit(account)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    {account.LoaiTaiKhoan !== "admin" && (
                      <button
                        onClick={() => handleDelete(account.id)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Không có tài khoản nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountManagement;
