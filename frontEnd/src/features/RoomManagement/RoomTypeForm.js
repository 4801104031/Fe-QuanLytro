import React, { useState, useEffect } from "react";
import useAddRoom from "../../api/useAddRoom"; // Import custom hook để gọi API

function RoomTypeForm({ roomType, onSubmitSuccess, onCancel }) {
  const { addRoom } = useAddRoom(); // Hàm gọi API thêm phòng
  const [loading, setLoading] = useState(false); // State loading
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    price: "",
    bedCount: "",
    fridgeCount: "",
    acCount: "",
  });

  // Cập nhật dữ liệu khi chỉnh sửa phòng
  useEffect(() => {
    if (roomType) {
      setFormData(roomType);
    }
  }, [roomType]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "name" ? value : parseFloat(value) || "",
    }));
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading
    try {
      await addRoom({
        SoPhong: formData.name,
        LoaiPhong: "Standard", // Bạn có thể thay đổi loại phòng nếu cần
        TrangThai: "Trống",
        SoGiuong: formData.bedCount,
        SoTuLanh: formData.fridgeCount,
        SoDieuHoa: formData.acCount,
      });

      alert("Phòng mới đã được thêm thành công!");
      onSubmitSuccess(); // Callback cập nhật lại danh sách phòng
    } catch (error) {
      alert("Lỗi khi thêm phòng mới: " + error.message);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Tên loại phòng:
        </label>
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
        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
          Diện tích (m²):
        </label>
        <input
          type="number"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Giá thuê mặc định (VNĐ):
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="bedCount" className="block text-sm font-medium text-gray-700">
          Số giường mặc định:
        </label>
        <input
          type="number"
          id="bedCount"
          name="bedCount"
          value={formData.bedCount}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="fridgeCount" className="block text-sm font-medium text-gray-700">
          Số tủ lạnh mặc định:
        </label>
        <input
          type="number"
          id="fridgeCount"
          name="fridgeCount"
          value={formData.fridgeCount}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="acCount" className="block text-sm font-medium text-gray-700">
          Số điều hòa mặc định:
        </label>
        <input
          type="number"
          id="acCount"
          name="acCount"
          value={formData.acCount}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-actions flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : roomType ? "Cập nhật" : "Thêm mới"}
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

export default RoomTypeForm;
