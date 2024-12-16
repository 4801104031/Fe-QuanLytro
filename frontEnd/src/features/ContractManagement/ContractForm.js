import React, { useState, useEffect } from 'react';

function ContractForm({ contract, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    roomNumber: '',
    tenant: '',
    contractType: '',
    startDate: '',
    endDate: '',
    isActive: true,
    depositAmount: '',
    monthlyRent: ''
  });

  useEffect(() => {
    if (contract) {
      setFormData(contract);
    }
  }, [contract]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Phòng số:</label>
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
        <label htmlFor="tenant" className="block text-sm font-medium text-gray-700">Người thuê:</label>
        <input
          type="text"
          id="tenant"
          name="tenant"
          value={formData.tenant}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="contractType" className="block text-sm font-medium text-gray-700">Loại hợp đồng:</label>
        <select
          id="contractType"
          name="contractType"
          value={formData.contractType}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="">Chọn loại hợp đồng</option>
          <option value="Cá nhân">Cá nhân</option>
          <option value="Công ty">Công ty</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Ngày bắt đầu:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Ngày kết thúc:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700">Tiền đặt cọc (VNĐ):</label>
        <input
          type="number"
          id="depositAmount"
          name="depositAmount"
          value={formData.depositAmount}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">Tiền thuê hàng tháng (VNĐ):</label>
        <input
          type="number"
          id="monthlyRent"
          name="monthlyRent"
          value={formData.monthlyRent}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Hiệu lực</label>
      </div>
      <div className="form-actions flex justify-end space-x-2">
        <button type="submit" className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800">
          {contract ? 'Cập nhật' : 'Thêm mới'}
        </button>
        <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
}

export default ContractForm;
