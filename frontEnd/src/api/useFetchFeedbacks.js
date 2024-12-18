import { useState } from "react";
import axios from "axios";

const useFetchFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]); // State lưu dữ liệu phản hồi
  const [isLoading, setIsLoading] = useState(false); // State loading
  const [fetchError, setFetchError] = useState(null); // State lỗi nếu có

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      // Gọi API lấy dữ liệu phản hồi
      const response = await axios.get("http://127.0.0.1:8000/api/phanhoi", {
        withCredentials: true, // Truyền credentials nếu cần xác thực
      });

      // Cập nhật state với dữ liệu từ API
      setFeedbacks(response.data.data || response.data); // Kiểm tra response
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setFetchError("Không thể tải dữ liệu phản hồi. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return { feedbacks, isLoading, fetchError, fetchFeedbacks };
};

export default useFetchFeedbacks;
