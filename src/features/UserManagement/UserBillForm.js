import React, { useState } from 'react';
import Modal from '../../components/Modal';

function UserBillForm({ bill, onClose }) {
  const [formData, setFormData] = useState({
    paymentMethod: '',
    amount: bill.total,
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic thanh toán ở đây
    console.log('Payment submitted:', formData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Thanh toán hóa đơn">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Phương thức thanh toán
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value="">Chọn phương thức thanh toán</option>
            <option value="creditCard">Thẻ tín dụng</option>
            <option value="bankTransfer">Chuyển khoản ngân hàng</option>
            <option value="cash">Tiền mặt</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Số tiền
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Ghi chú
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Thanh toán
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UserBillForm;
