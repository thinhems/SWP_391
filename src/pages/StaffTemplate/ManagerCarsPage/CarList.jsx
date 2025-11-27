import { useNavigate } from 'react-router-dom';

export default function CarList({ cars, allCarsCount, currentPage, totalPages, startIndex, endIndex, onPageChange }) {
  const navigate = useNavigate();
  // Hàm lấy badge trạng thái xe
  const getStatusBadge = (status) => {
    const statusConfig = {
      0: { bg: 'bg-green-100', text: 'text-green-800', label: 'Sẵn sàng' },
      1: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chờ duyệt' },
      2: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Chờ HĐ' },
      3: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Chờ bàn giao' },
      4: { bg: 'bg-red-100', text: 'text-red-800', label: 'Đang thuê' }
    };
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Không xác định' };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} inline-flex items-center`}>
        {config.label}
      </span>
    );
  };
  // handle xử ý lý khi nhấn kiểm tra xe
  const handleInspect = (carId) => {
    navigate(`/staff/manage-cars/inspection/${carId}`);
  };
  // handle thay đổi trang
  const handlePageChange = (page) => {
    onPageChange(page);
  }
  // Hàm render phân trang
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
        onClick={() => handlePageChange(currentPage - 1)}
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
          onClick={() => handlePageChange(1)}
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
          onClick={() => handlePageChange(i)}
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
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 rounded-lg border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer"
        >
          {totalPages}
        </button>
      );
    }
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
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

  if (cars.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Không tìm thấy xe
        </h3>
        <p className="text-gray-600">
          Không có xe nào phù hợp với bộ lọc hiện tại
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
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên xe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Biển số
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pin / Km
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vị trí
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">#{car.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{car.modelName}</div>
                    <div className="text-xs text-gray-500">{car.color}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-blue-600">{car.plateNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{car.batteryLevel}%</div>
                    <div className="text-xs text-gray-500">{car.odometer?.toLocaleString()} km</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{car.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(car.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleInspect(car.id)}
                      className={`text-blue-600 hover:text-blue-900 px-3 py-1 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors ${
                        car.status !== 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      disabled={car.status !== 0}
                      title={car.status !== 0 ? 'Chỉ kiểm tra xe có sẵn' : 'Kiểm tra xe'}
                    >
                      Kiểm tra
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị <span className="font-semibold">{startIndex + 1}</span> đến{' '}
              <span className="font-semibold">{Math.min(endIndex, allCarsCount)}</span> trong tổng số{' '}
              <span className="font-semibold">{allCarsCount}</span> xe
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