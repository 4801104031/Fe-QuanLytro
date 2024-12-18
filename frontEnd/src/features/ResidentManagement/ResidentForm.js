import React, { useState, useEffect } from 'react';
import useAddResident from '../../api/useAddResident'; // Import hook gọi API thêm mới
import useEditResident from '../../api/useEditResident'; // Import hook gọi API sửa

function ResidentForm({ resident, onSubmit, onCancel }) {
  const { addResident } = useAddResident(); // Gọi hàm addResident từ hook
  const { editResident } = useEditResident(); // Gọi hàm editResident từ hook

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    idNumber: '',
    phone: '',
    room: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái submit

  useEffect(() => {
    if (resident) {
      setFormData({
        firstName: resident.Ho || '',
        lastName: resident.Ten || '',
        dateOfBirth: resident.Ngay_sinh || '',
        idNumber: resident.CMND_CCCD || '',
        phone: resident.So_dien_thoai || '',
        room: resident.phong_id || ''
      });
    }
  }, [resident]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Chuyển đổi dữ liệu form thành key phù hợp với backend
    const formattedData = {
      Ho: formData.firstName,
      Ten: formData.lastName,
      Ngay_sinh: formData.dateOfBirth,
      CMND_CCCD: formData.idNumber,
      So_dien_thoai: formData.phone,
      phong_id: formData.room
    };

    try {
      if (resident && resident.ID_CuDan) {
        // Nếu có ID_CuDan => gọi API sửa
        await editResident(resident.ID_CuDan, formattedData);
      } else {
        // Nếu không có ID_CuDan => gọi API thêm mới
        await addResident(formattedData);
      }
      onSubmit(); // Callback khi thành công (ví dụ: cập nhật danh sách)
    } catch (error) {
      console.error("Lỗi khi lưu cư dân:", error.message);
      alert("Lỗi khi lưu cư dân: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Tên:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Họ:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Ngày sinh:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">CMND/CCCD:</label>
        <input
          type="text"
          id="idNumber"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-group">
        <label htmlFor="room" className="block text-sm font-medium text-gray-700">Phòng:</label>
        <input
          type="text"
          id="room"
          name="room"
          value={formData.room}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="form-actions flex justify-end space-x-2">
        <button 
          type="submit" 
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang xử lý...' : (resident ? 'Cập nhật' : 'Thêm mới')}
        </button>
        <button 
          type="button" 
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600" 
          onClick={onCancel}
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

export default ResidentForm;
