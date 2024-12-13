import React, { useState } from 'react';

function BillCreationForm() {
  const [formData, setFormData] = useState({
    selectedDate: '2024-01', // Default value for the month input
    batchName: '',
    selectedContracts: []
  });

  const [contracts] = useState([
    { id: 1, roomNumber: '101', tenant: 'Nguyễn Văn A' },
    { id: 2, roomNumber: '102', tenant: 'Trần Thị B' },
    // Add more sample contracts as needed
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating bills for:', formData);
    // Handle bill creation logic here
  };

  return (
    <div className="content">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Trình tạo hóa đơn</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Thời gian <span className="text-red-500">*</span>
            </label>
            <input
              type="month"
              value={formData.selectedDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  selectedDate: e.target.value
                }))
              }
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Tên tập hóa đơn <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="batchName"
              value={formData.batchName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  batchName: e.target.value
                }))
              }
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Hợp đồng làm hóa đơn <span className="text-red-500">*</span>
            </label>
            <select
              name="selectedContracts"
              multiple
              value={formData.selectedContracts}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, (option) => option.value);
                setFormData((prev) => ({
                  ...prev,
                  selectedContracts: values
                }));
              }}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            >
              {contracts.map((contract) => (
                <option key={contract.id} value={contract.id}>
                  Phòng {contract.roomNumber} - {contract.tenant}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              ({formData.selectedContracts.length} đã chọn)
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Hoàn tất tạo hóa đơn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BillCreationForm;
