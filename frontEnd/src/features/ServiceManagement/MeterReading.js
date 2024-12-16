import React, { useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import Modal from '../../components/Modal';
import MeterReadingForm from './MeterReadingForm';

function MeterReading({ type = 'electric' }) {
  const [readings, setReadings] = useState([
    {
      id: 1,
      roomNumber: '1',
      reading: 100,
      date: '2024-01-12'
    }
  ]);

  const [selectedRoom, setSelectedRoom] = useState('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReading, setEditingReading] = useState(null);
  const [activeTab, setActiveTab] = useState(type);

  const rooms = [
    { id: 1, number: '1' },
    { id: 2, number: '22' }
  ];

  const handleEdit = (reading) => {
    setEditingReading(reading);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chỉ số này?')) {
      setReadings(readings.filter(reading => reading.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingReading) {
      setReadings(readings.map(reading => 
        reading.id === editingReading.id ? { ...formData, id: reading.id } : reading
      ));
    } else {
      setReadings([...readings, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Danh sách chỉ số {activeTab === 'electric' ? 'điện' : 'nước'}</h1>
        <div className="flex gap-4">
          <select 
            className="room-select"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            {rooms.map(room => (
              <option key={room.id} value={room.number}>
                Phòng {room.number}
              </option>
            ))}
          </select>
          <button className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800" onClick={() => setIsModalOpen(true)}>
            + Thêm mới
          </button>
        </div>
      </div>
      <div className="meter-tabs flex gap-4 mb-6">
        <button 
          className={`meter-tab py-2 px-4 rounded-md ${activeTab === 'electric' ? 'bg-teal-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('electric')}
        >
          Điện
        </button>
        <button 
          className={`meter-tab py-2 px-4 rounded-md ${activeTab === 'water' ? 'bg-teal-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('water')}
        >
          Nước
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Phòng số</th>
              <th>Chỉ số</th>
              <th>Ngày ghi nhận</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {readings
              .filter(reading => reading.roomNumber === selectedRoom)
              .map((reading, index) => (
                <tr key={reading.id}>
                  <td>{index + 1}</td>
                  <td>{reading.roomNumber}</td>
                  <td>{reading.reading}</td>
                  <td>{reading.date}</td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="action-button text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(reading)}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="action-button text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(reading.id)}
                      >
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
        title={editingReading ? 'Sửa chỉ số' : 'Thêm chỉ số mới'}
      >
        <MeterReadingForm
          reading={editingReading}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          type={activeTab}
        />
      </Modal>
    </div>
  );
}

export default MeterReading;
