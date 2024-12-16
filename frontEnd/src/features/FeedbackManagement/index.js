import React, { useState } from 'react';
import { Trash2, Check, Eye, MessageCircle } from 'react-feather';
import Modal from '../../components/Modal';

function FeedbackManagement() {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      date: '2024-01-16',
      sender: 'Nguyễn Thắng',
      room: '101',
      subject: 'Vấn đề về điều hòa',
      content: 'Điều hòa trong phòng không hoạt động, cần sửa chữa gấp.',
      status: 'Chưa xử lý',
      response: ''
    },
    {
      id: 2,
      date: '2024-01-16',
      sender: 'Trần Minh',
      room: '202',
      subject: 'Yêu cầu thay bóng đèn',
      content: 'Bóng đèn trong phòng tắm đã hỏng, cần thay mới.',
      status: 'Chưa xử lý',
      response: ''
    }
  ]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
      setFeedback(feedback.filter(item => item.id !== id));
    }
  };

  const handleApprove = (id) => {
    setFeedback(feedback.map(item => 
      item.id === id ? { ...item, status: 'Đã xử lý' } : item
    ));
  };

  const handleView = (item) => {
    setSelectedFeedback(item);
    setIsViewModalOpen(true);
  };

  const handleRespond = (item) => {
    setSelectedFeedback(item);
    setResponse(item.response);
    setIsRespondModalOpen(true);
  };

  const submitResponse = () => {
    setFeedback(feedback.map(item => 
      item.id === selectedFeedback.id 
        ? { ...item, response, status: 'Đã xử lý' } 
        : item
    ));
    setIsRespondModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Danh sách phản hồi của cư dân</h1>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">STT</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Ngày tạo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Người gửi</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tiêu đề</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Trạng thái</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {feedback.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{item.date}</td>
                <td className="px-4 py-3 text-sm">{item.sender}</td>
                <td className="px-4 py-3 text-sm">{item.room}</td>
                <td className="px-4 py-3 text-sm">{item.subject}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'Chưa xử lý' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(item)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleRespond(item)}
                      className="text-green-600 hover:text-green-800"
                      title="Phản hồi"
                    >
                      <MessageCircle size={16} />
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Đánh dấu đã xử lý"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)}
        title="Chi tiết phản hồi"
      >
        {selectedFeedback && (
          <div className="space-y-4">
            <p><strong>Người gửi:</strong> {selectedFeedback.sender}</p>
            <p><strong>Phòng:</strong> {selectedFeedback.room}</p>
            <p><strong>Ngày gửi:</strong> {selectedFeedback.date}</p>
            <p><strong>Tiêu đề:</strong> {selectedFeedback.subject}</p>
            <p><strong>Nội dung:</strong> {selectedFeedback.content}</p>
            <p><strong>Trạng thái:</strong> {selectedFeedback.status}</p>
            {selectedFeedback.response && (
              <p><strong>Phản hồi:</strong> {selectedFeedback.response}</p>
            )}
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={isRespondModalOpen} 
        onClose={() => setIsRespondModalOpen(false)}
        title="Phản hồi"
      >
        {selectedFeedback && (
          <div className="space-y-4">
            <p><strong>Người gửi:</strong> {selectedFeedback.sender}</p>
            <p><strong>Phòng:</strong> {selectedFeedback.room}</p>
            <p><strong>Tiêu đề:</strong> {selectedFeedback.subject}</p>
            <p><strong>Nội dung:</strong> {selectedFeedback.content}</p>
            <div>
              <label htmlFor="response" className="block text-sm font-medium text-gray-700">
                Phản hồi của bạn
              </label>
              <textarea
                id="response"
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsRespondModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Hủy
              </button>
              <button
                onClick={submitResponse}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Gửi phản hồi
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FeedbackManagement;

