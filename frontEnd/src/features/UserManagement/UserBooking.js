import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import useFetchRooms from '../../api/useFetchRooms'; // Hook lấy danh sách phòng
import useBookRoom from '../../api/useBookRoom'; // Hook gọi API đặt phòng

const UserBooking = () => {
  const { rooms, isLoading, fetchError, fetchRooms } = useFetchRooms(); // Lấy dữ liệu động từ API
  const { bookRoom } = useBookRoom(); // Gọi API đặt phòng
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    Ho: '',
    Ten: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
  });

  useEffect(() => {
    fetchRooms(); // Fetch dữ liệu phòng khi component được mount
  }, []);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    setFormData({ Ho: '', Ten: '', phone: '', checkInDate: '', checkOutDate: '' }); // Reset form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const bookingData = {
        Phong_id: selectedRoom.ID_Phong,
        Ho: formData.Ho,          // Họ
        Ten: formData.Ten,        // Tên
        Ngay_bat_dau: formData.checkInDate,  // Ngày đến
        Ngay_ket_thuc: formData.checkOutDate // Ngày đi
      };
  
      await bookRoom(bookingData); // Gọi API
      alert('Đặt phòng thành công!');
      closeModal();
      fetchRooms(); // Làm mới danh sách phòng
    } catch (error) {
      console.error('Lỗi khi đặt phòng:', error.response?.data || error.message);
      alert('Lỗi khi đặt phòng: ' + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách phòng</h1>
      </div>

      {/* Hiển thị loading hoặc lỗi */}
      {isLoading && <p>Đang tải dữ liệu...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

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
              <tr key={room.ID_Phong}>
                <td>{index + 1}</td>
                <td>{room.So_phong}</td>
                <td>{room.Loai_phong_id === 1 ? 'VIP' : 'Standard'}</td>
                <td>
                  <span
                    className={`status-badge ${
                      room.Trang_thai === 'Trống' ? 'empty' : 'occupied'
                    }`}
                  >
                    {room.Trang_thai === 'Trống' ? 'Trống' : 'Đã thuê'}
                  </span>
                </td>
                <td>{room.So_giuong}</td>
                <td>{room.So_tu_lanh}</td>
                <td>{room.So_dieu_hoa}</td>
                <td>
                  {room.Trang_thai === 'Trống' && (
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

      {/* Modal Đặt Phòng */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Đặt phòng ${selectedRoom?.So_phong}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="Ho" className="block text-sm font-medium text-gray-700">
              Họ
            </label>
            <input
              type="text"
              id="Ho"
              name="Ho"
              value={formData.Ho}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="Ten" className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <input
              type="text"
              id="Ten"
              name="Ten"
              value={formData.Ten}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">
              Ngày đến
            </label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">
              Ngày đi
            </label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 border rounded-md">
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
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
