import React, { useState } from 'react';
import OverallReport from './OverallReport';
import RoomRevenueReport from './RoomRevenueReport';
import ServiceRevenueReport from './ServiceRevenueReport';

function ReportsManagement() {
  const [activeTab, setActiveTab] = useState('overall');

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b">
        <div className="flex gap-4 px-6">
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'overall'
                ? 'border-teal-700 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overall')}
          >
            Báo cáo tổng hợp
          </button>
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'room'
                ? 'border-teal-700 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('room')}
          >
            Doanh thu tiền phòng
          </button>
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-colors ${
              activeTab === 'service'
                ? 'border-teal-700 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('service')}
          >
            Doanh thu dịch vụ
          </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 p-6">
        {activeTab === 'overall' && <OverallReport />}
        {activeTab === 'room' && <RoomRevenueReport />}
        {activeTab === 'service' && <ServiceRevenueReport />}
      </div>
    </div>
  );
}

export default ReportsManagement;

