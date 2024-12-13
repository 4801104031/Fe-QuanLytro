import React, { useState } from 'react';

function ServiceRevenueReport() {
  const [reports] = useState([
    {
      id: 1,
      service: 'Internet',
      totalRevenue: 2000000,
      numberOfUsers: 20
    },
    {
      id: 2,
      service: 'Giặt là',
      totalRevenue: 1500000,
      numberOfUsers: 15
    },
    {
      id: 3,
      service: 'Gửi xe',
      totalRevenue: 3000000,
      numberOfUsers: 30
    },
    {
      id: 4,
      service: 'Vệ sinh',
      totalRevenue: 1000000,
      numberOfUsers: 10
    }
  ]);

  const calculateTotal = () => {
    return reports.reduce((acc, report) => acc + report.totalRevenue, 0);
  };

  return (
    <div className="content p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Báo cáo doanh thu dịch vụ</h2>
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Dịch vụ</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tổng doanh thu</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Số người sử dụng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{report.service}</td>
                <td className="px-4 py-3 text-sm">{report.totalRevenue.toLocaleString()} VND</td>
                <td className="px-4 py-3 text-sm">{report.numberOfUsers}</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={2} className="px-4 py-3 text-sm text-right">Tổng doanh thu dịch vụ:</td>
              <td className="px-4 py-3 text-sm">
                {calculateTotal().toLocaleString()} VND
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceRevenueReport;
