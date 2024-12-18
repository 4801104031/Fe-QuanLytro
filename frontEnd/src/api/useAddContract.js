import axios from "axios";

/**
 * Hook API thêm mới hợp đồng.
 * @returns {Object} addContract hàm để thêm mới hợp đồng.
 */
const useAddContract = () => {
  const addContract = async (contractData) => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      const response = await axios.post(
        "http://127.0.0.1:8000/api/hop-dong", // Endpoint thêm mới hợp đồng
        contractData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gắn token xác thực
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Hợp đồng mới đã được thêm:", response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error(
        "Lỗi khi thêm hợp đồng:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Không thể thêm hợp đồng mới."
      );
    }
  };

  return { addContract };
};

export default useAddContract;
