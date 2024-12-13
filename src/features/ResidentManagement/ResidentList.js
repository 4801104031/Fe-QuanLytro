import React, { useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import ResidentForm from './ResidentForm';

function ResidentList() {
  const [residents, setResidents] = useState([
    {
      id: 1,
      firstName: 'Thắng',
      lastName: 'Nguyễn',
      dateOfBirth: '2024-01-02',
      idNumber: '000000000',
      phone: '0818358449',
      room: '0'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState(null);

  const openModal = (resident = null) => {
    setEditingResident(resident);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingResident(null);
  };

  const handleSubmit = (formData) => {
    if (editingResident) {
      // Update existing resident
      setResidents(residents.map(resident => 
        resident.id === editingResident.id ? { ...formData, id: resident.id } : resident
      ));
    } else {
      // Add new resident
      setResidents([...residents, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cư dân này?')) {
      setResidents(residents.filter(resident => resident.id !== id));
    }
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách cư dân</h1>
        <button className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800" onClick={() => openModal()}>
          + Thêm mới
        </button>
      </div>
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
            {residents.map((resident, index) => (
              <tr key={resident.id}>
                <td>{index + 1}</td>
                <td>{resident.firstName}</td>
                <td>{resident.lastName}</td>
                <td>{resident.dateOfBirth}</td>
                <td>{resident.idNumber}</td>
                <td>{resident.phone}</td>
                <td>{resident.room}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="action-button text-blue-500 hover:text-blue-700" onClick={() => openModal(resident)}>
                      <Edit size={18} />
                    </button>
                    <button className="action-button text-red-500 hover:text-red-700" onClick={() => handleDelete(resident.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
