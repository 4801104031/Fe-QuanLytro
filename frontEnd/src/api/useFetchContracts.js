import { useState } from "react";
import axios from "axios";

const useFetchContracts = () => {
  const [contracts, setContracts] = useState([]); // State lưu dữ liệu hợp đồng
  const [isLoading, setIsLoading] = useState(false); // State loading
  const [fetchError, setFetchError] = useState(null); // State lỗi nếu có

  const fetchContracts = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      // Lấy CSRF token nếu sử dụng Laravel Sanctum
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Gọi API lấy dữ liệu hợp đồng
      const response = await axios.get("http://127.0.0.1:8000/api/hop-dongs", {
        withCredentials: true, // Truyền credentials nếu cần xác thực
      });

      // Cập nhật state với dữ liệu từ API
      setContracts(response.data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
      setFetchError("Không thể tải dữ liệu hợp đồng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return { contracts, isLoading, fetchError, fetchContracts };
};

export default useFetchContracts;
