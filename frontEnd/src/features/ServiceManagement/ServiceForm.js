import React, { useState, useEffect } from 'react';

function ServiceForm({ service, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: '',
    type: 'Mặc định'
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên dịch vụ:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá (VNĐ):</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Đơn vị tính:</label>
        <input
          type="text"
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Loại dịch vụ:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="Mặc định">Mặc định</option>
          <option value="Tùy chọn">Tùy chọn</option>
        </select>
      </div>
      <div className="form-actions flex justify-end space-x-2">
        <button type="submit" className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800">
          {service ? 'Cập nhật' : 'Thêm mới'}
        </button>
        <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
}

export default ServiceForm;
