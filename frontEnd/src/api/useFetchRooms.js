import { useState } from "react";
import axios from "axios";

const useFetchRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchRooms = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      // Lấy CSRF cookie trước khi gọi API
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // Gọi API lấy danh sách phòng
      const response = await axios.get(
        "http://127.0.0.1:8000/api/phongs",
        { withCredentials: true }
      );

      // Cập nhật state với dữ liệu phòng
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setFetchError("Không thể lấy danh sách phòng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRooms, rooms, isLoading, fetchError };
};

export default useFetchRooms;
