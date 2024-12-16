import React, { useState } from 'react';
import Modal from '../../components/Modal';

const UserBooking = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: '101',
      roomType: 'VIP',
      status: 'Trống',
      bedCount: 2,
      fridgeCount: 1,
      acCount: 1
    },
    {
      id: 2,
      roomNumber: '102',
      roomType: 'Standard',
      status: 'Đã thuê',
      bedCount: 1,
      fridgeCount: 1,
      acCount: 1
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đặt phòng ở đây
    console.log('Booking data:', selectedRoom);
    closeModal();
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách phòng</h1>
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
                <td>{room.roomNumber}</td>
                <td>{room.roomType}</td>
                <td>
                  <span className={`status-badge ${room.status === 'Trống' ? 'empty' : 'occupied'}`}>
                    {room.status}
                  </span>
                </td>
                <td>{room.bedCount}</td>
                <td>{room.fridgeCount}</td>
                <td>{room.acCount}</td>
                <td>
                  {room.status === 'Trống' && (
                    <button 
                      className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
                      onClick={() => openModal(room)}
                    >
                      Đặt phòng
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={`Đặt ${selectedRoom?.roomNumber}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Ngày đến nhận phòng</label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Đặt phòng
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserBooking;
