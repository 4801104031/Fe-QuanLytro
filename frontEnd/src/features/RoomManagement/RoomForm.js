import React, { useState, useEffect } from "react";
import useAddRoom from "../../api/useAddRoom";
import useEditRoom from "../../api/useEditRoom";

function RoomForm({ room, onSubmit, onCancel }) {
  const { addRoom, isAdding: isAddingRoom, addError, addSuccess } = useAddRoom(); // API thêm phòng
  const { editRoom, isEditing: isEditingRoom, editError, editSuccess } = useEditRoom(); // API chỉnh sửa phòng

  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    status: "Trống",
    bedCount: 0,
    fridgeCount: 0,
    acCount: 0,
  });

  // Mapping loại phòng từ tên sang ID và ngược lại
  const roomTypeMapping = {
    VIP: 1,
    LUX: 2,
    STA: 3,
  };

  const reverseRoomTypeMapping = {
    1: "VIP",
    2: "LUX",
    3: "STA",
  };

  // Load dữ liệu vào form khi có phòng truyền vào (chỉnh sửa)
  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.So_phong || "",
        roomType: reverseRoomTypeMapping[room.Loai_phong_id] || "",
        status: room.Trang_thai || "Trống",
        bedCount: room.So_giuong || 0,
        fridgeCount: room.So_tu_lanh || 0,
        acCount: room.So_dieu_hoa || 0,
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu gửi API
    const newRoomData = {
      So_phong: Number(formData.roomNumber),
      Loai_phong_id: roomTypeMapping[formData.roomType],
      Trang_thai: formData.status,
      So_giuong: Number(formData.bedCount),
      So_tu_lanh: Number(formData.fridgeCount),
      So_dieu_hoa: Number(formData.acCount),
    };

    try {
      if (room?.ID_Phong) {
        // Nếu có ID, chỉnh sửa phòng
        await editRoom(room.ID_Phong, newRoomData);
      } else {
        // Thêm mới phòng
        await addRoom(newRoomData);
      }
      onSubmit(); // Gọi callback để cập nhật danh sách phòng
    } catch (error) {
      console.error("Lỗi khi lưu phòng:", error.message);
    }
  };

  const isSubmitting = isAddingRoom || isEditingRoom;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="form-group">
        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">
          Số phòng:
        </label>
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
        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
          Loại phòng:
        </label>
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
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Trạng thái:
        </label>
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
        <label htmlFor="bedCount" className="block text-sm font-medium text-gray-700">
          Số giường:
        </label>
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
        <label htmlFor="fridgeCount" className="block text-sm font-medium text-gray-700">
          Số tủ lạnh:
        </label>
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
        <label htmlFor="acCount" className="block text-sm font-medium text-gray-700">
          Số điều hòa:
        </label>
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
        >
          {isSubmitting ? "Đang xử lý..." : room ? "Cập nhật" : "Thêm mới"}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          onClick={onCancel}
        >
          Hủy
        </button>
      </div>

      {/* Thông báo lỗi */}
      {(addError || editError) && <p className="text-red-600">{addError || editError}</p>}
      {(addSuccess || editSuccess) && (
        <p className="text-green-600">{addSuccess || editSuccess}</p>
      )}
    </form>
  );
}

export default RoomForm;
