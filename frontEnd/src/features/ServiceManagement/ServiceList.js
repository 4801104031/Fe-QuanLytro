import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import ServiceForm from './ServiceForm';
import useFetchServices from '../../api/useFetchServices';
import useDeleteService from '../../api/useDeleteService'; // Import API xóa dịch vụ

function ServiceList() {
  const { services, isLoading, fetchError, fetchServices } = useFetchServices();
  const { deleteService } = useDeleteService(); // Hàm xóa dịch vụ từ API

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices(); // Fetch dữ liệu từ API khi component mount
  }, []);

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      try {
        await deleteService(id); // Gọi API xóa dịch vụ
        fetchServices(); // Refresh danh sách sau khi xóa
      } catch (error) {
        console.error('Lỗi khi xóa dịch vụ:', error.message);
      }
    }
  };

  const handleSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    // TODO: Thêm API thêm hoặc cập nhật dịch vụ
    setIsModalOpen(false);
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách dịch vụ</h1>
        <button className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800" onClick={handleAdd}>
          + Thêm mới
        </button>
      </div>

      {/* Hiển thị trạng thái loading và lỗi */}
      {isLoading && <p>Đang tải dữ liệu...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

      {/* Bảng dữ liệu dịch vụ */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên dịch vụ</th>
              <th>Giá (VNĐ)</th>
              <th>Đơn vị tính</th>
              <th>Loại dịch vụ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service, index) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.price ? service.price.toLocaleString() : '0'}</td>
                  <td>{service.unit}</td>
                  <td>{service.type}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="action-button text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="action-button text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(service.id)} // Gọi hàm xóa động
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Không có dịch vụ nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal thêm/sửa dịch vụ */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}
      >
        <ServiceForm
          service={editingService}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default ServiceList;
