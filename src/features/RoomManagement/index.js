import React, { useState } from 'react';
import RoomList from './RoomList';
import RoomTypeList from './RoomTypeList';

function RoomManagement() {
  const [activeTab, setActiveTab] = useState('rooms');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b">
        <div className="flex gap-4 px-6">
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'rooms'
                ? 'border-teal-700 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('rooms')}
          >
            Phòng
          </button>
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'roomTypes'
                ? 'border-teal-700 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('roomTypes')}
          >
            Loại Phòng
          </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-50">
        {activeTab === 'rooms' ? <RoomList /> : <RoomTypeList />}
      </div>
    </div>
  );
}

export default RoomManagement;

