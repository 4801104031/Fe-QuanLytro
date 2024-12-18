import axios from "axios";

const useFetchAccounts = () => {
  const fetchAccounts = async () => {
    try {
      // 1. Lấy CSRF Token
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true, // Gửi kèm cookie
      });

      // 2. Gọi API lấy dữ liệu tài khoản
      const response = await axios.get("http://127.0.0.1:8000/api/tai-khoan", {
        withCredentials: true, // Gửi cookie kèm request
      });

      console.log("Danh sách tài khoản:", response.data);

      // Chỉ trả về mảng 'data'
      if (response.data && response.data.success) {
        return response.data.data; // Trả về đúng mảng data
      } else {
        throw new Error("Dữ liệu API không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi fetch tài khoản:", error);
      throw new Error("Không thể tải dữ liệu tài khoản.");
    }
  };

  return { fetchAccounts };
};

export default useFetchAccounts;
