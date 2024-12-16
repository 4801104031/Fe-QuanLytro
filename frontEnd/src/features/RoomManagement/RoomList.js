import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import RoomForm from './RoomForm';
import useFetchRooms from '../../api/useFetchRooms';

function RoomList() {
  const { fetchRooms, rooms, isLoading, fetchError } = useFetchRooms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu phòng khi component được mount
    fetchRooms();
  }, []);

  const openModal = (room = null) => {
    setEditingRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
      console.log(`Xóa phòng với ID: ${id}`);
      // Thêm logic xóa API sau
    }
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách phòng</h1>
        <button
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          onClick={() => openModal()}
        >
          + Thêm mới
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Số phòng</th>
              <th>Loại phòng</th>
              <th>Trạng thái</th>
              <th>Số giường</th>
              <th>Số tủ lạnh</th>
              <th>Số điều hòa</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.id}>
                <td>{index + 1}</td>
                <td>{room.so_phong}</td>
                <td>{room.loai_phong}</td>
                <td>
                  <span className={`status-badge ${room.trang_thai === 'Trống' ? 'empty' : 'occupied'}`}>
                    {room.trang_thai}
                  </span>
                </td>
                <td>{room.so_giuong}</td>
                <td>{room.so_tu_lanh}</td>
                <td>{room.so_dieu_hoa}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="action-button text-blue-500 hover:text-blue-700"
                      onClick={() => openModal(room)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="action-button text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(room.id)}
                    >
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
        title={editingRoom ? 'Sửa phòng' : 'Thêm phòng mới'}
      >
        <RoomForm room={editingRoom} onSubmit={() => {}} onCancel={closeModal} />
      </Modal>
    </div>
  );
}

export default RoomList;
