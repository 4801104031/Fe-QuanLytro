import React from 'react';
import pt1 from '../../assets/Image/pt1.jpg';
import pt2 from '../../assets/Image/pt2.jpg';
import pt3 from '../../assets/Image/pt3.jpg';
import pt4 from '../../assets/Image/pt4.jpg';
import pt5 from '../../assets/Image/pt5.jpg';
import pt6 from '../../assets/Image/pt6.jpg';
const UserRoomList = () => {
    const rooms = [
        { id: 1, name: 'Phòng 101', image: pt1, description: 'Phòng rộng rãi, thoáng mát.', details: '2 giường, 1 tủ lạnh, 1 điều hòa' },
        { id: 2, name: 'Phòng 102', image: pt2, description: 'Phòng có ban công, nhiều ánh sáng.', details: '1 giường, 1 tủ lạnh, 1 điều hòa' },
        { id: 3, name: 'Phòng 103', image: pt3, description: 'Phòng rộng rãi, thoáng mát.', details: '1 giường, 1 tủ lạnh, 1 điều hòa' },
        { id: 4, name: 'Phòng 104', image: pt4, description: 'Phòng rộng rãi, thoáng mát.', details: '1 giường, 1 tủ lạnh, 1 điều hòa' },
        { id: 5, name: 'Phòng 105', image: pt5, description: 'Phòng rộng rãi, thoáng mát.', details: '1 giường, 1 tủ lạnh, 1 điều hòa' },
        { id: 6, name: 'Phòng 106', image: pt6, description: 'Phòng có ban công, nhiều ánh sáng.', details: '1 giường, 1 tủ lạnh, 1 điều hòa' },
      ];
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">Danh sách phòng trọ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={room.image} alt={room.name} className="w-full h-32 object-cover" /> {/* Giảm kích thước ảnh */}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{room.name}</h2>
              <p className="text-gray-700 mb-2">{room.description}</p>
              <p className="text-gray-600 text-sm">{room.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoomList;
