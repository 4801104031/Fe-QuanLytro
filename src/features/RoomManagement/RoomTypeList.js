import React, { useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import RoomTypeForm from './RoomTypeForm';

function RoomTypeList() {
  const [roomTypes, setRoomTypes] = useState([
    {
      id: 1,
      name: 'VIP',
      area: 40,
      price: 7000000,
      bedCount: 2,
      fridgeCount: 2,
      acCount: 2
    },
    {
      id: 2,
      name: 'Luxury',
      area: 30,
      price: 5000000,
      bedCount: 2,
      fridgeCount: 1,
      acCount: 2
    },
    {
      id: 3,
      name: 'Standard',
      area: 30,
      price: 3000000,
      bedCount: 1,
      fridgeCount: 1,
      acCount: 1
    },
   
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState(null);

  const openModal = (roomType = null) => {
    setEditingRoomType(roomType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoomType(null);
  };

  const handleSubmit = (formData) => {
    if (editingRoomType) {
      // Update existing room type
      setRoomTypes(roomTypes.map(roomType => 
        roomType.id === editingRoomType.id ? { ...formData, id: roomType.id } : roomType
      ));
    } else {
      // Add new room type
      setRoomTypes([...roomTypes, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa loại phòng này?')) {
      setRoomTypes(roomTypes.filter(roomType => roomType.id !== id));
    }
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách loại phòng</h1>
        <button className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800" onClick={() => openModal()}>+ Thêm mới</button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên loại phòng</th>
              <th>Diện tích (m²)</th>
              <th>Giá thuê mặc định (VNĐ)</th>
              <th>Số giường mặc định</th>
              <th>Số tủ lạnh mặc định</th>
              <th>Số điều hòa mặc định</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((roomType, index) => (
              <tr key={roomType.id}>
                <td>{index + 1}</td>
                <td>{roomType.name}</td>
                <td>{roomType.area}</td>
                <td>{roomType.price.toLocaleString()}</td>
                <td>{roomType.bedCount}</td>
                <td>{roomType.fridgeCount}</td>
                <td>{roomType.acCount}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="action-button text-blue-500 hover:text-blue-700" onClick={() => openModal(roomType)}>
                      <Edit size={18} />
                    </button>
                    <button className="action-button text-red-500 hover:text-red-700" onClick={() => handleDelete(roomType.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingRoomType ? 'Sửa loại phòng' : 'Thêm loại phòng mới'}
      >
        <RoomTypeForm roomType={editingRoomType} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>
    </div>
  );
}

export default RoomTypeList;
