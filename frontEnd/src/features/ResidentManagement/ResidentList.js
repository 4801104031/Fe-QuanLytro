import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import ResidentForm from './ResidentForm';
import useFetchResidents from '../../api/useFetchResidents'; // Import hook fetch dữ liệu
import useDeleteResident from '../../api/useDeleteResident'; // Import hook xóa cư dân

function ResidentList() {
  const { residents, isLoading, fetchError, fetchResidents } = useFetchResidents(); // Fetch danh sách cư dân
  const { deleteResident } = useDeleteResident(); // Hook xóa cư dân
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState(null);

  useEffect(() => {
    fetchResidents(); // Fetch dữ liệu khi component mount
  }, []);

  const openModal = (resident = null) => {
    setEditingResident(resident);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingResident(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cư dân này?')) {
      try {
        await deleteResident(id); // Gọi API xóa cư dân
        fetchResidents(); // Reload danh sách cư dân sau khi xóa thành công
      } catch (error) {
        alert("Lỗi khi xóa cư dân: " + error.message);
      }
    }
  };

  const handleSubmit = (formData) => {
    console.log("Form data submitted:", formData);
    setIsModalOpen(false);
    fetchResidents(); // Reload danh sách sau khi thêm/sửa thành công
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách cư dân</h1>
        <button className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800" onClick={() => openModal()}>
          + Thêm mới
        </button>
      </div>

      {/* Trạng thái loading và lỗi */}
      {isLoading && <p>Đang tải dữ liệu...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Họ</th>
              <th>Ngày sinh</th>
              <th>CMND/CCCD</th>
              <th>Số điện thoại</th>
              <th>Phòng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {residents.length > 0 ? (
              residents.map((resident, index) => (
                <tr key={resident.id}>
                  <td>{index + 1}</td>
                  <td>{resident.firstName}</td>
                  <td>{resident.lastName}</td>
                  <td>{resident.dateOfBirth}</td>
                  <td>{resident.identityCard}</td>
                  <td>{resident.phoneNumber}</td>
                  <td>{resident.roomId}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="action-button text-blue-500 hover:text-blue-700"
                        onClick={() => openModal(resident)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="action-button text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(resident.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Không có cư dân nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingResident ? 'Sửa thông tin cư dân' : 'Thêm cư dân mới'}>
        <ResidentForm resident={editingResident} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  );
}

export default ResidentList;
