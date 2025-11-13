import React, { useState, useEffect } from 'react';
import { customersService } from '../../services/customers.api';

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch danh sách nhân viên (role = 2)
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const data = await customersService.getStaff();
        setStaffList(data || []);
      } catch (err) {
        console.error('Error fetching staff:', err);
        setError('Không thể tải danh sách nhân viên');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách nhân viên...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Nhân viên</h1>
          <p className="text-gray-600">Danh sách nhân viên trong hệ thống</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
            Tổng: {staffList.length} nhân viên
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-3 font-semibold">ID</th>
                <th className="text-left p-3 font-semibold">Họ tên</th>
                <th className="text-left p-3 font-semibold">Email</th>
                <th className="text-left p-3 font-semibold">Số điện thoại</th>
                <th className="text-left p-3 font-semibold">Role</th>
                <th className="text-left p-3 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    Không có nhân viên nào trong hệ thống
                  </td>
                </tr>
              ) : (
                staffList.map(staff => (
                  <tr key={staff.id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium text-gray-900">{staff.id}</td>
                    <td className="p-3">{staff.fullName || staff.name || 'N/A'}</td>
                    <td className="p-3 text-gray-600">{staff.email || 'N/A'}</td>
                    <td className="p-3 text-gray-600">{staff.phone || 'N/A'}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                        Staff
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Hoạt động
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


