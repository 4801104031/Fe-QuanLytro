import React, { useState, useEffect } from "react";
import useAddService from "../../api/useAddService";
import useEditService from "../../api/useEditService";

function ServiceForm({ service, onSubmit, onCancel }) {
  const { addService } = useAddService(); // API thêm dịch vụ
  const { editService } = useEditService(); // API chỉnh sửa dịch vụ

  const [formData, setFormData] = useState({
    Ten_dich_vu: "",
    Gia: "",
    Don_vi: "",
    Loai_dich_vu: "Mặc định",
  });

  const [isEdit, setIsEdit] = useState(false); // Trạng thái thêm mới hoặc chỉnh sửa

  // Load dữ liệu vào form khi nhận props "service"
  useEffect(() => {
    if (service) {
      setFormData({
        Ten_dich_vu: service.Ten_dich_vu || "",
        Gia: service.Gia !== undefined ? service.Gia : "",
        Don_vi: service.Don_vi || "",
        Loai_dich_vu: service.Loai_dich_vu || "Mặc định",
      });
      setIsEdit(true);
    } else {
      setFormData({
        Ten_dich_vu: "",
        Gia: "",
        Don_vi: "",
        Loai_dich_vu: "Mặc định",
      });
      setIsEdit(false);
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "Gia" ? parseFloat(value) || "" : value, // Chuyển đổi giá trị của Giá sang số
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedServiceData = {
        Ten_dich_vu: formData.Ten_dich_vu,
        Gia: Number(formData.Gia),
        Don_vi: formData.Don_vi,
        Loai_dich_vu: formData.Loai_dich_vu,
      };

      if (isEdit && service?.ID_DichVu) {
        // Gọi API chỉnh sửa dịch vụ
        await editService(service.ID_DichVu, updatedServiceData);
      } else {
        // Gọi API thêm mới dịch vụ
        await addService(updatedServiceData);
      }

      onSubmit(); // Gọi callback để cập nhật danh sách
    } catch (error) {
      console.error("Lỗi khi lưu dịch vụ:", error.message);
      alert("Lỗi khi lưu dịch vụ: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div className="form-group">
        <label htmlFor="Ten_dich_vu" className="block text-sm font-medium text-gray-700">
          Tên dịch vụ:
        </label>
        <input
          type="text"
          id="Ten_dich_vu"
          name="Ten_dich_vu"
          value={formData.Ten_dich_vu}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="Gia" className="block text-sm font-medium text-gray-700">
          Giá (VNĐ):
        </label>
        <input
          type="number"
          id="Gia"
          name="Gia"
          value={formData.Gia}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="Don_vi" className="block text-sm font-medium text-gray-700">
          Đơn vị tính:
        </label>
        <input
          type="text"
          id="Don_vi"
          name="Don_vi"
          value={formData.Don_vi}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="Loai_dich_vu" className="block text-sm font-medium text-gray-700">
          Loại dịch vụ:
        </label>
        <select
          id="Loai_dich_vu"
          name="Loai_dich_vu"
          value={formData.Loai_dich_vu}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        >
          <option value="Mặc định">Mặc định</option>
          <option value="Tùy chọn">Tùy chọn</option>
        </select>
      </div>

      <div className="form-actions flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
        >
          {isEdit ? "Cập nhật" : "Thêm mới"}
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

export default ServiceForm;
