import axios from 'axios';

/**
 * Hook API để đặt phòng.
 * @returns {Object} bookRoom - Hàm để gọi API đặt phòng.
 */
const useBookRoom = () => {
  const bookRoom = async (bookingData) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage (nếu cần)

      const response = await axios.post(
        'http://127.0.0.1:8000/api/phong/dat-phong', // Endpoint đặt phòng
        bookingData, // Dữ liệu đặt phòng
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token xác thực
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Đặt phòng thành công:', response.data);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Lỗi khi đặt phòng:', error.response?.data?.message || error.message);
      throw error; // Ném lỗi để xử lý ở component gọi
    }
  };

  return { bookRoom };
};

export default useBookRoom;
