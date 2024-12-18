import React, { useEffect, useState } from 'react';
import { Trash2, Eye, Check } from 'react-feather';
import Modal from '../../components/Modal';
import useFetchInvoices from '../../api/useFetchInvoices'; // Import custom hook fetch hóa đơn
import useDeleteInvoice from '../../api/useDeleteInvoice'; // Import hook xóa hóa đơn

function BillList() {
  const { invoices, isLoading, fetchError, fetchInvoices } = useFetchInvoices();
  const { deleteInvoice } = useDeleteInvoice(); // Gọi hàm xóa hóa đơn
  const [selectedMonth, setSelectedMonth] = useState('2024-01'); // Lọc theo tháng
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoices(); // Fetch dữ liệu hóa đơn khi component mount
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      try {
        setLoading(true);
        await deleteInvoice(id); // Gọi API xóa hóa đơn
        alert('Xóa hóa đơn thành công!');
        fetchInvoices(); // Reload danh sách hóa đơn sau khi xóa
      } catch (error) {
        alert('Lỗi khi xóa hóa đơn: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleApprove = (id) => {
    console.log(`Duyệt hóa đơn với ID: ${id}`);
    // TODO: Gọi API để cập nhật trạng thái hóa đơn
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    console.log('Selected month:', e.target.value);
    // TODO: Thêm logic để fetch dữ liệu theo tháng nếu API hỗ trợ
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

      {isLoading && <p>Đang tải dữ liệu...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

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
            {invoices.length > 0 ? (
              invoices.map((bill, index) => (
                <tr key={bill.ID_HoaDon}>
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">{bill.Ten_hoa_don}</td>
                  <td className="px-4 py-3 text-sm">{bill.phong_id}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        bill.TrangThai === 'Mới'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {bill.TrangThai}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {parseFloat(bill.TongCong).toLocaleString()} VNĐ
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(bill.ID_HoaDon)}
                        className="text-red-600 hover:text-red-800"
                        title="Xóa"
                        disabled={loading}
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
                        onClick={() => handleApprove(bill.ID_HoaDon)}
                        className="text-green-600 hover:text-green-800"
                        disabled={bill.TrangThai === 'Đã duyệt'}
                        title="Duyệt"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-sm">
                  Không có hóa đơn nào.
                </td>
              </tr>
            )}
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
            <p>
              <strong>Tên hóa đơn:</strong> {selectedBill.Ten_hoa_don}
            </p>
            <p>
              <strong>Phòng:</strong> {selectedBill.phong_id}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedBill.TrangThai}
            </p>
            <p>
              <strong>Tổng cộng:</strong> {parseFloat(selectedBill.TongCong).toLocaleString()} VNĐ
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default BillList;
