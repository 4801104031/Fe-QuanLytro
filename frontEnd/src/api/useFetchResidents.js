import { useState } from "react";
import axios from "axios";

const useFetchResidents = () => {
  const [residents, setResidents] = useState([]); // State lưu danh sách cư dân
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [fetchError, setFetchError] = useState(null); // Lỗi khi gọi API

  const fetchResidents = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      // Lấy CSRF token nếu sử dụng Laravel Sanctum
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Gọi API lấy thông tin cư dân
      const response = await axios.get("http://127.0.0.1:8000/api/cu-dan", {
        withCredentials: true, // Truyền credentials nếu cần xác thực
      });

      // Chuyển đổi dữ liệu trước khi lưu
      const formattedData = response.data.map((resident) => ({
        id: resident.ID_CuDan,
        firstName: resident.Ten,
        lastName: resident.Ho,
        dateOfBirth: resident.Ngay_sinh,
        identityCard: resident.CMND_CCCD,
        phoneNumber: resident.So_dien_thoai,
        roomId: resident.phong_id,
      }));

      // Cập nhật state
      setResidents(formattedData);
    } catch (error) {
      console.error("Error fetching residents:", error);
      setFetchError("Không thể tải danh sách cư dân. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return { residents, isLoading, fetchError, fetchResidents };
};

export default useFetchResidents;
