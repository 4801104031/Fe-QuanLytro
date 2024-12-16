import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pt1 from '../../assets/Image/pt1.jpg';
import pt2 from '../../assets/Image/pt2.jpg';
import pt3 from '../../assets/Image/pt3.jpg';
import pt4 from '../../assets/Image/pt4.jpg';
import pt5 from '../../assets/Image/pt5.jpg';
import pt6 from '../../assets/Image/pt6.jpg';
import RoomDetailsModal from './RoomDetailsModal'; // Import RoomDetailsModal

const UserRoomList = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rooms = [
    { id: 1, name: 'Phòng 101', image: pt1, roomType: 'VIP', description: 'Phòng rộng rãi, thoáng mát.', details: '2 giường, 1 tủ lạnh, 1 điều hòa', price: '1.000.000 VND' },
    { id: 2, name: 'Phòng 102', image: pt2, roomType: 'Standard', description: 'Phòng có ban công, nhiều ánh sáng.', details: '1 giường, 1 tủ lạnh, 1 điều hòa', price: '800.000 VND' },
    { id: 3, name: 'Phòng 103', image: pt3, roomType: 'Standard', description: 'Phòng rộng rãi, thoáng mát.', details: '1 giường, 1 tủ lạnh, 1 điều hòa', price: '800.000 VND' },
    { id: 4, name: 'Phòng 104', image: pt4, roomType: 'Standard', description: 'Phòng rộng rãi, thoáng mát.', details: '1 giường, 1 tủ lạnh, 1 điều hòa', price: '800.000 VND' },
    { id: 5, name: 'Phòng 105', image: pt5, roomType: 'Standard', description: 'Phòng rộng rãi, thoáng mát.', details: '1 giường, 1 tủ lạnh, 1 điều hòa', price: '800.000 VND' },
    { id: 6, name: 'Phòng 106', image: pt6, roomType: 'Deluxe', description: 'Phòng có ban công, nhiều ánh sáng.', details: '1 giường, 1 tủ lạnh, 1 điều hòa', price: '900.000 VND' },
  ];

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-600">Danh sách phòng trọ</h1>
        <Link to="/" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">
          Trở lại
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => handleRoomClick(room)}>
            <img src={room.image} alt={room.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{room.name}</h2>
              <p className="text-gray-700 mb-2">{room.description}</p>
              <p className="text-gray-600 text-sm">{room.details}</p>
            </div>
          </div>
        ))}
      </div>
      <RoomDetailsModal isOpen={isModalOpen} onClose={closeModal} room={selectedRoom} />
    </div>
  );
};

export default UserRoomList;
