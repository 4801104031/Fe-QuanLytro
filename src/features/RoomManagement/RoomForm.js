import React, { useState, useEffect } from 'react';

function RoomForm({ room, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    status: 'Trống',
    bedCount: 0,
    fridgeCount: 0,
    acCount: 0
  });

  useEffect(() => {
    if (room) {
      setFormData(room);
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Số phòng:</label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">Loại phòng:</label>
        <select
          id="roomType"
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="">Chọn loại phòng</option>
          <option value="VIP">VIP</option>
          <option value="LUX">LUX</option>
          <option value="STA">STA</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="Trống">Trống</option>
          <option value="Đã thuê">Đã thuê</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bedCount" className="block text-sm font-medium text-gray-700">Số giường:</label>
        <input
          type="number"
          id="bedCount"
          name="bedCount"
          value={formData.bedCount}
          onChange={handleChange}
          min="0"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="fridgeCount" className="block text-sm font-medium text-gray-700">Số tủ lạnh:</label>
        <input
          type="number"
          id="fridgeCount"
          name="fridgeCount"
          value={formData.fridgeCount}
          onChange={handleChange}
          min="0"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="acCount" className="block text-sm font-medium text-gray-700">Số điều hòa:</label>
        <input
          type="number"
          id="acCount"
          name="acCount"
          value={formData.acCount}
          onChange={handleChange}
          min="0"
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-actions flex justify-end space-x-2">
        <button type="submit" className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800">
          {room ? 'Cập nhật' : 'Thêm mới'}
        </button>
        <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
}

export default RoomForm;
