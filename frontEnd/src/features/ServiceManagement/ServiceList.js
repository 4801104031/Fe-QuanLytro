import React, { useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import ServiceForm from './ServiceForm';

function ServiceList() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Điện',
      price: 3500,
      unit: 'kilowatt-hour (kWh)',
      type: 'Mặc định'
    },
    {
      id: 2,
      name: 'Vệ sinh riêng',
      price: 100000,
      unit: 'phòng/tháng',
      type: 'Tùy chọn'
    },
    {
      id: 3,
      name: 'Rác thải',
      price: 20000,
      unit: 'người/tháng',
      type: 'Mặc định'
    },
    {
      id: 4,
      name: 'Nước',
      price: 20000,
      unit: 'mét khối',
      type: 'Mặc định'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingService) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingService.id ? { ...formData, id: service.id } : service
      ));
    } else {
      // Add new service
      setServices([...services, { ...formData, id: Date.now() }]);
    }
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
            {services.map((service, index) => (
              <tr key={service.id}>
                <td>{index + 1}</td>
                <td>{service.name}</td>
                <td>{service.price.toLocaleString()}</td>
                <td>{service.unit}</td>
                <td>{service.type}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="action-button text-blue-500 hover:text-blue-700" onClick={() => handleEdit(service)}>
                      <Edit size={18} />
                    </button>
                    <button className="action-button text-red-500 hover:text-red-700" onClick={() => handleDelete(service.id)}>
                      <Trash2 size={18} />
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
