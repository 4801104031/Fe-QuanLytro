import { useState } from "react";
import axios from "axios";

const useFetchServices = () => {
  const [services, setServices] = useState([]); // State lưu dữ liệu dịch vụ
  const [isLoading, setIsLoading] = useState(false); // State loading
  const [fetchError, setFetchError] = useState(null); // State lỗi nếu có

  const fetchServices = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      // Lấy CSRF token nếu sử dụng Laravel Sanctum
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Gọi API lấy dữ liệu dịch vụ
      const response = await axios.get("http://127.0.0.1:8000/api/dichvus", {
        withCredentials: true, // Truyền credentials nếu cần xác thực
      });

      // Cập nhật state với dữ liệu từ API (chuyển Gia thành số)
      const formattedData = response.data.map(service => ({
        id: service.ID_DichVu,
        name: service.Ten_dich_vu,
        price: parseFloat(service.Gia), // Chuyển Gia thành số
        unit: service.Don_vi,
        type: service.Loai_dich_vu,
      }));

      setServices(formattedData);
    } catch (error) {
      console.error("Error fetching services:", error);
      setFetchError("Không thể tải dữ liệu dịch vụ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return { services, isLoading, fetchError, fetchServices };
};

export default useFetchServices;
