import React, { useEffect, useState } from "react";
import { Trash2, Check, Eye, MessageCircle } from "react-feather";
import Modal from "../../components/Modal";
import useFetchFeedbacks from "../../api/useFetchFeedbacks"; // Import custom hook
import { format } from "date-fns"; // Import thư viện format từ date-fns

function FeedbackManagement() {
  const { feedbacks, isLoading, fetchError, fetchFeedbacks } = useFetchFeedbacks(); // Dữ liệu từ API
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchFeedbacks(); // Fetch dữ liệu khi component mount
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phản hồi này?")) {
      console.log(`Xóa phản hồi với ID: ${id}`);
      // TODO: Gọi API xóa phản hồi tại đây
    }
  };

  const handleApprove = (id) => {
    console.log(`Đánh dấu đã xử lý phản hồi với ID: ${id}`);
    // TODO: Gọi API để cập nhật trạng thái phản hồi
  };

  const handleView = (item) => {
    setSelectedFeedback(item);
    setIsViewModalOpen(true);
  };

  const handleRespond = (item) => {
    setSelectedFeedback(item);
    setResponse(item.response || "");
    setIsRespondModalOpen(true);
  };

  const submitResponse = () => {
    console.log("Gửi phản hồi:", response);
    // TODO: Gọi API để gửi phản hồi
    setIsRespondModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Danh sách phản hồi của cư dân</h1>
      </div>

      {isLoading && <p>Đang tải dữ liệu...</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

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
            {feedbacks.length > 0 ? (
              feedbacks.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">
                    {item.created_at
                      ? format(new Date(item.created_at), "dd/MM/yyyy HH:mm:ss")
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm">{item.NguoiGui}</td>
                  <td className="px-4 py-3 text-sm">{item.Phong_id}</td>
                  <td className="px-4 py-3 text-sm">{item.TieuDe}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.TrangThai === "Chưa xử lý"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.TrangThai}
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
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Không có phản hồi nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Xem chi tiết */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Chi tiết phản hồi">
        {selectedFeedback && (
          <div className="space-y-4">
            <p><strong>Người gửi:</strong> {selectedFeedback.NguoiGui}</p>
            <p><strong>Phòng:</strong> {selectedFeedback.Phong_id}</p>
            <p><strong>Ngày gửi:</strong> {selectedFeedback.created_at
              ? format(new Date(selectedFeedback.created_at), "dd/MM/yyyy HH:mm:ss")
              : "N/A"}</p>
            <p><strong>Tiêu đề:</strong> {selectedFeedback.TieuDe}</p>
            <p><strong>Nội dung:</strong> {selectedFeedback.NoiDung}</p>
            <p><strong>Trạng thái:</strong> {selectedFeedback.TrangThai}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FeedbackManagement;
