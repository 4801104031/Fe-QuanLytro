import React, { useState } from 'react';

function RoomRevenueReport() {
  const [reports] = useState([
    {
      id: 1,
      room: '101',
      tenant: 'Nguyễn Văn A',
      rentFee: 5000000,
      waterFee: 200000,
      electricFee: 350000,
      otherFees: 100000,
      total: 5650000
    },
    {
      id: 2,
      room: '102',
      tenant: 'Trần Thị B',
      rentFee: 4800000,
      waterFee: 180000,
      electricFee: 320000,
      otherFees: 100000,
      total: 5400000
    }
  ]);

  const calculateTotal = () => {
    return reports.reduce((acc, report) => acc + report.total, 0);
  };

  return (
    <div className="content p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Báo cáo doanh thu tiền phòng</h2>
        <input
          type="month"
          defaultValue="2024-01"
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">STT</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Người thuê</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tiền thuê</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tiền nước</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tiền điện</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phí khác</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tổng cộng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{report.room}</td>
                <td className="px-4 py-3 text-sm">{report.tenant}</td>
                <td className="px-4 py-3 text-sm">{report.rentFee.toLocaleString()} VND</td>
                <td className="px-4 py-3 text-sm">{report.waterFee.toLocaleString()} VND</td>
                <td className="px-4 py-3 text-sm">{report.electricFee.toLocaleString()} VND</td>
                <td className="px-4 py-3 text-sm">{report.otherFees.toLocaleString()} VND</td>
                <td className="px-4 py-3 text-sm font-medium">{report.total.toLocaleString()} VND</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={7} className="px-4 py-3 text-sm text-right">Tổng doanh thu:</td>
              <td className="px-4 py-3 text-sm">
                {calculateTotal().toLocaleString()} VND
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoomRevenueReport;
