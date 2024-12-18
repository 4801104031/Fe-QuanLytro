import { useState } from "react";
import axios from "axios";

const useFetchRoomType = () => {
  const [roomTypes, setRoomTypes] = useState([]); // State lưu trữ dữ liệu loại phòng
  const [isLoading, setIsLoading] = useState(false); // State hiển thị trạng thái loading
  const [fetchError, setFetchError] = useState(null); // State lưu thông báo lỗi nếu có

  const fetchRoomTypes = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      // Gọi Laravel Sanctum CSRF Cookie trước
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Fetch dữ liệu loại phòng từ API backend
      const response = await axios.get("http://127.0.0.1:8000/api/loaiphongs", {
        withCredentials: true, // Đảm bảo gửi cookie xác thực
      });

      // Cập nhật state với dữ liệu loại phòng
      setRoomTypes(response.data);
    } catch (error) {
      console.error("Error fetching room types:", error);
      setFetchError("Không thể tải dữ liệu loại phòng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return { roomTypes, isLoading, fetchError, fetchRoomTypes };
};

export default useFetchRoomType;
