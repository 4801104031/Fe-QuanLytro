import React, { useState, useEffect } from 'react';

function MeterReadingForm({ reading, onSubmit, onCancel, type }) {
  const [formData, setFormData] = useState({
    roomNumber: '',
    reading: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (reading) {
      setFormData(reading);
    }
  }, [reading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'reading' ? parseFloat(value) || '' : value
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
        <label htmlFor="reading" className="block text-sm font-medium text-gray-700">Chỉ số {type === 'electric' ? 'điện' : 'nước'}:</label>
        <input
          type="number"
          id="reading"
          name="reading"
          value={formData.reading}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Ngày ghi nhận:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-actions flex justify-end space-x-2">
        <button type="submit" className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800">
          {reading ? 'Cập nhật' : 'Thêm mới'}
        </button>
        <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
}

export default MeterReadingForm;
