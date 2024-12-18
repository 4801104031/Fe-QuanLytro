import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Eye } from 'react-feather';
import Modal from '../../components/Modal';
import ContractForm from './ContractForm';
import useFetchContracts from '../../api/useFetchContracts'; // Import custom hook
import useDeleteContract from '../../api/useDeleteContract'; // Import API xóa hợp đồng

function ContractList() {
  const { contracts, isLoading, fetchError, fetchContracts } = useFetchContracts();
  const { deleteContract } = useDeleteContract(); // Gọi API xóa hợp đồng
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [viewingContract, setViewingContract] = useState(null);

  useEffect(() => {
    fetchContracts(); // Fetch dữ liệu hợp đồng khi component mount
  }, []);

  const openModal = (contract = null, isViewing = false) => {
    if (isViewing) {
      setViewingContract(contract);
    } else {
      setEditingContract(contract);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContract(null);
    setViewingContract(null);
  };

  const handleSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này?')) {
      try {
        await deleteContract(id); // Gọi API xóa hợp đồng
        alert('Hợp đồng đã được xóa thành công.');
        fetchContracts(); // Fetch lại danh sách hợp đồng
      } catch (error) {
        alert('Lỗi khi xóa hợp đồng: ' + error.message);
      }
    }
  };

  const handleToggleStatus = (id) => {
    console.log(`Toggle status for contract ID: ${id}`);
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách hợp đồng</h1>
        <button
          className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800"
          onClick={() => openModal()}
        >
          + Thêm mới
        </button>
      </div>

      {isLoading && <p>Đang tải dữ liệu...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Phòng số</th>
              <th>Người thuê</th>
              <th>Loại hợp đồng</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Tiền thuê hàng tháng</th>
              <th>Hiệu lực</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {contracts.length > 0 ? (
              contracts.map((contract, index) => (
                <tr key={contract.ID_HopDong}>
                  <td>{index + 1}</td>
                  <td>{contract.phong_id}</td>
                  <td>{contract.cu_dan_id || 'N/A'}</td>
                  <td>{contract.Loai_hop_dong}</td>
                  <td>{contract.Ngay_bat_dau}</td>
                  <td>{contract.Ngay_ket_thuc}</td>
                  <td>{parseInt(contract.Tien_thue_hang_thang || 0).toLocaleString()} VNĐ</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={contract.Hieu_luc === 1}
                          onChange={() => handleToggleStatus(contract.ID_HopDong)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="action-button text-green-500 hover:text-green-700"
                        onClick={() => openModal(contract, true)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="action-button text-blue-500 hover:text-blue-700"
                        onClick={() => openModal(contract)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="action-button text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(contract.ID_HopDong)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Không có hợp đồng nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          viewingContract
            ? 'Chi tiết hợp đồng'
            : editingContract
            ? 'Sửa hợp đồng'
            : 'Thêm hợp đồng mới'
        }
      >
        {viewingContract ? (
          <div className="contract-details">
            <p><strong>Phòng số:</strong> {viewingContract.phong_id}</p>
            <p><strong>Người thuê:</strong> {viewingContract.cu_dan_id || 'N/A'}</p>
            <p><strong>Loại hợp đồng:</strong> {viewingContract.Loai_hop_dong}</p>
            <p><strong>Ngày bắt đầu:</strong> {viewingContract.Ngay_bat_dau}</p>
            <p><strong>Ngày kết thúc:</strong> {viewingContract.Ngay_ket_thuc}</p>
            <p><strong>Hiệu lực:</strong> {viewingContract.Hieu_luc ? 'Có' : 'Không'}</p>
          </div>
        ) : (
          <ContractForm contract={editingContract} onSubmit={handleSubmit} onCancel={closeModal} />
        )}
      </Modal>
    </div>
  );
}

export default ContractList;
