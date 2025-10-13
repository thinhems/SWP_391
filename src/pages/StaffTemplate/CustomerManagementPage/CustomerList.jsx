import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function CustomerList({ 
  customers = [], 
  allCustomersCount = 0,
  currentPage = 1,
  totalPages = 1,
  startIndex = 0,
  endIndex = 0,
  onPageChange
}) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  // Mảng các loại khách hàng
  const customerTypes = [
    { 
      value: 'new', 
      label: 'Khách hàng mới', 
      color: 'bg-blue-600',
      hoverBg: 'hover:bg-blue-50' 
    },
    { 
      value: 'regular', 
      label: 'Thường xuyên', 
      color: 'bg-gray-600',
      hoverBg: 'hover:bg-gray-50' 
    },
    { 
      value: 'vip', 
      label: 'VIP', 
      color: 'bg-purple-600',
      hoverBg: 'hover:bg-purple-50' 
    }
  ];
  // hàm lấy nhãn trạng thái
  const getStatusBadge = (status) => {
    const config = {
      verified: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xác thực', icon: '✓' },
      unverified: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chưa xác thực', icon: '⏳' }
    };
    const c = config[status] || config.unverified;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text} inline-flex items-center`}>
        <span className="mr-1">{c.icon}</span>
        {c.label}
      </span>
    );
  };
  // hàm lấy nhãn loại khách hàng
  const getTypeBadge = (type) => {
    const config = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Mới' },
      regular: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Thường xuyên' },
      vip: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'VIP' }
    };
    const c = config[type] || config.new;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };
  // hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };
  // hàm toggle dropdown
  const toggleDropdown = (customerId) => {
    setOpenDropdown(openDropdown === customerId ? null : customerId);
  };
  // hàm kiểm tra tài khoản khách hàng
  const handleVerifyAccount = (customer) => {
    navigate(`/staff/manage-customer/verify/${customer.id}`);
  };
  // hàm xử lý chọn loại khách hàng
  const handleClassifySelect = (customer, type) => {
    alert(`Phân loại khách hàng: ${customer.name}\n(Chức năng sẽ được phát triển)`);
    setOpenDropdown(null); // Đóng dropdown sau khi chọn
  };
  // hàm render phân trang
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    pages.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg border cursor-pointer ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      >
        ←
      </button>
    );
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-4 py-2 rounded-lg border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-2 text-gray-500">...</span>
        );
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === i
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer'
          }`}
        >
          {i}
        </button>
      );
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-2 text-gray-500">...</span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-4 py-2 rounded-lg border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer"
        >
          {totalPages}
        </button>
      );
    }
    pages.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg border ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      >
        →
      </button>
    );
    return pages;
  };
  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Không tìm thấy khách hàng
        </h3>
        <p className="text-gray-600">
          Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CCCD
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượt thuê
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đăng ký
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-xs text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-blue-600">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.idCard}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(customer.customerType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(customer.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-gray-900">
                      {customer.totalRentals}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(customer.registeredDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleVerifyAccount(customer)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Kiểm tra tài khoản"
                      >
                        Kiểm tra
                      </button>
                      {/* menu dropdown phân loại */}
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(customer.id)}
                          className="text-purple-600 hover:text-purple-900 px-3 py-1 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                          title="Phân loại khách hàng"
                        > Phân loại ▼ </button>
                        {openDropdown === customer.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setOpenDropdown(null)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                              <div className="px-4 py-2 border-b border-gray-200">
                                <p className="text-xs font-semibold text-gray-700">Phân loại khách hàng</p>
                              </div>
                              {/* map qua mảng customerTypes */}
                              {customerTypes.map((type) => (
                                <button
                                  key={type.value}
                                  onClick={() => handleClassifySelect(customer, type.value)}
                                  disabled={customer.customerType === type.value}
                                  className={`w-full text-left px-4 py-2 ${type.hoverBg} transition-colors flex items-center space-x-2 cursor-pointer ${
                                    customer.customerType === type.value ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                >
                                  <span className={`w-3 h-3 rounded-full ${
                                    customer.customerType === type.value 
                                      ? type.color 
                                      : 'border-2 border-gray-300'
                                  }`}></span>
                                  <span className="text-sm text-gray-700">
                                    {type.label} {customer.customerType === type.value && '(hiện tại)'}
                                  </span>
                                </button>
                              ))}
                              <div className="border-t border-gray-200 mt-2 pt-2 px-4">
                                <button
                                  onClick={() => setOpenDropdown(null)}
                                  className="w-full text-center text-xs text-gray-500 hover:text-gray-700 py-1 cursor-pointer"
                                >Đóng</button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị <span className="font-semibold">{startIndex + 1}</span> đến{' '}
              <span className="font-semibold">{Math.min(endIndex, allCustomersCount)}</span> trong tổng số{' '}
              <span className="font-semibold">{allCustomersCount}</span> khách hàng
            </div>
            <div className="flex space-x-2">
              {renderPagination()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}