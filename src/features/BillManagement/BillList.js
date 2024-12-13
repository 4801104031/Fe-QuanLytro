import React, { useState } from 'react';
import { Trash2, Eye, Check } from 'react-feather';
import Modal from '../../components/Modal';

function BillList() {
  const [bills, setBills] = useState([
    {
      id: 1,
      name: 'Hóa đơn tháng 01 - 2024',
      room: '1',
      status: 'Mới',
      total: '5,000,000'
    },
    {
      id: 2,
      name: 'Hóa đơn tháng 01 - 2024',
      room: '2',
      status: 'Mới',
      total: '4,500,000'
    }
  ]);

  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      setBills(bills.filter(bill => bill.id !== id));
    }
  };

  const handleView = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleApprove = (id) => {
    setBills(bills.map(bill => 
      bill.id === id ? { ...bill, status: 'Đã duyệt' } : bill
    ));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    // Here you would typically fetch bills for the selected month
    // For now, we'll just log the selected month
    console.log('Selected month:', e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Hóa đơn</h2>
        <div className="relative">
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">STT</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên hóa đơn</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Trạng thái</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">TC</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bills.map((bill, index) => (
              <tr key={bill.id}>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{bill.name}</td>
                <td className="px-4 py-3 text-sm">{bill.room}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    bill.status === 'Mới' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{bill.total}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(bill.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => handleView(bill)}
                      className="text-gray-600 hover:text-gray-800"
                      title="Xem"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleApprove(bill.id)}
                      className="text-green-600 hover:text-green-800"
                      disabled={bill.status === 'Đã duyệt'}
                      title="Duyệt"
                    >
                      <Check size={16} />
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
        onClose={() => setIsModalOpen(false)}
        title="Chi tiết hóa đơn"
      >
        {selectedBill && (
          <div className="space-y-4">
            <p><strong>Tên hóa đơn:</strong> {selectedBill.name}</p>
            <p><strong>Phòng:</strong> {selectedBill.room}</p>
            <p><strong>Trạng thái:</strong> {selectedBill.status}</p>
            <p><strong>Tổng cộng:</strong> {selectedBill.total} VNĐ</p>
            {/* Add more details as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default BillList;

