import React from 'react';
import { useCustomers } from '../../contexts/CustomersContext';

// Tạm thời dùng customers như danh sách người dùng để demo nhân viên
export default function StaffManagement() {
  const { customersData } = useCustomers();
  const users = customersData?.allCustomers || [];

  const staffList = users.slice(0, 12).map((u, idx) => ({
    id: `staff_${idx}`,
    name: u.name,
    email: `${u.id}@company.vn`,
    phone: u.phone,
    station: ['Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 9', 'Quận Bình Thạnh'][idx % 6],
    role: idx % 4 === 0 ? 'supervisor' : 'staff',
    status: idx % 5 === 0 ? 'off' : 'active'
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nhân viên</h1>
          <p className="text-gray-600">Điều phối nhân sự theo điểm</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Điều phối nhân viên</h3>
          <div className="text-sm text-gray-600">Tổng nhân viên: <b>{staffList.length}</b></div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3">Tên</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">SĐT</th>
                <th className="text-left p-3">Điểm</th>
                <th className="text-left p-3">Vai trò</th>
                <th className="text-left p-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.phone}</td>
                  <td className="p-3">{s.station}</td>
                  <td className="p-3 capitalize">{s.role}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {s.status === 'active' ? 'Đang làm' : 'Nghỉ'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


