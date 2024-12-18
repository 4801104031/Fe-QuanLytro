import { useState } from "react";
import axios from "axios";

const useFetchInvoices = () => {
  const [invoices, setInvoices] = useState([]); // State lưu dữ liệu hóa đơn
  const [isLoading, setIsLoading] = useState(false); // State loading
  const [fetchError, setFetchError] = useState(null); // State lỗi nếu có

  const fetchInvoices = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      // Lấy CSRF token nếu sử dụng Laravel Sanctum
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Gọi API lấy dữ liệu hóa đơn
      const response = await axios.get("http://127.0.0.1:8000/api/hoadon", {
        withCredentials: true, // Truyền credentials nếu cần xác thực
      });

      // Cập nhật state chỉ với dữ liệu hóa đơn
      setInvoices(response.data.data); // Chỉ lấy phần data
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setFetchError("Không thể tải dữ liệu hóa đơn. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return { invoices, isLoading, fetchError, fetchInvoices };
};

export default useFetchInvoices;
