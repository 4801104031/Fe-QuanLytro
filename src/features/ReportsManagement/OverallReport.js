import React, { useState } from 'react';

function OverallReport() {
  const [reports] = useState([
    {
      id: 1,
      room: '1',
      roomFee: 5000000,
      water: 0,
      parking: 6000,
      bathroom: 200000,
      internet: 0,
      laundry: 0,
      commonService: 0,
      garbage: 0,
      electric: 350000
    }
  ]);

  const calculateTotal = () => {
    return reports.reduce((acc, report) => {
      return (
        acc +
        report.roomFee +
        report.water +
        report.parking +
        report.bathroom +
        report.internet +
        report.laundry +
        report.commonService +
        report.garbage +
        report.electric
      );
    }, 0);
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Báo cáo & thống kê</h2>
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tiền phòng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nước</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gửi xe</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Vệ sinh riêng</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Internet</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Giặt là</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Dịch vụ chung</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Rác thải</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Điện</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{report.room}</td>
                <td className="px-4 py-3 text-sm">{report.roomFee.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{report.water.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{report.parking.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{report.bathroom.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{report.internet.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{report.laundry.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{report.commonService.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{report.garbage.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{report.electric.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={2} className="px-4 py-3 text-sm">Tổng doanh thu:</td>
              <td colSpan={9} className="px-4 py-3 text-sm">
                {calculateTotal().toLocaleString()} VND
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OverallReport;
