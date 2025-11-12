
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function FilterSection({ filters, setFilters }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState();

  // clear tất cả bộ lọc
  const clearFilters = () => {
    setFilters({
      orderCode: "",
      carModel: "",
      status: "",
      startDate: "",
      endDate: ""
    });
    setSelectedRange(undefined);
  };
  // các model xe có thể chọn
  const carModels = [
    "VinFast VF 3",
    "VinFast VF 6",
    "VinFast VF 7",
    "VinFast VF 8",
    "VinFast VF 9"
  ];
  // các trạng thái đơn hàng
  const statusOptions = [
    { value: "pending_payment", label: "Chờ thanh toán", color: "text-gray-600" },
    { value: "pending_approval", label: "Chờ phê duyệt", color: "text-yellow-600" },
    { value: "pending_contract", label: "Chờ ký hợp đồng", color: "text-purple-600" },
    { value: "pending_handover", label: "Chờ bàn giao", color: "text-blue-600" },
    { value: "rented", label: "Đang thuê", color: "text-orange-600" },
    { value: "completed", label: "Hoàn thành", color: "text-green-600" },
    { value: "cancelled", label: "Đã hủy", color: "text-red-600" }
  ];

  // kiểm tra có bộ lọc nào đang được áp dụng không
  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  // format ngày hiển thị
  const formatDisplayDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }).format(date);
  };

  // handle chọn khoảng ngày
  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      // Kiểm tra xem from và to có khác nhau không 
      const isSameDate = range.from.getTime() === range.to.getTime();
      if (isSameDate) {
        // Cùng một ngày - chỉ set startDate
        const startDate = range.from.getFullYear() + '-' + 
          String(range.from.getMonth() + 1).padStart(2, '0') + '-' + 
          String(range.from.getDate()).padStart(2, '0');
        setFilters(f => ({ ...f, startDate }));
      } else {
        // Khác ngày - set cả startDate và endDate
        const startDate = range.from.getFullYear() + '-' + 
          String(range.from.getMonth() + 1).padStart(2, '0') + '-' + 
          String(range.from.getDate()).padStart(2, '0');
        const endDate = range.to.getFullYear() + '-' + 
          String(range.to.getMonth() + 1).padStart(2, '0') + '-' + 
          String(range.to.getDate()).padStart(2, '0');
        setFilters(f => ({ ...f, startDate, endDate }));
      }
    } else if (range?.from) {
      // Chỉ có from - set startDate
      const startDate = range.from.getFullYear() + '-' + 
        String(range.from.getMonth() + 1).padStart(2, '0') + '-' + 
        String(range.from.getDate()).padStart(2, '0');
      setFilters(f => ({ ...f, startDate }));
    } else {
      // Clear cả hai ngày
      setFilters(f => ({ ...f, startDate: "", endDate: "" }));
    }
  };

  // hiển thị khoảng ngày đã chọn
  const getDateRangeDisplay = () => {
    if (selectedRange?.from && selectedRange?.to) {
      if (selectedRange.from.getTime() === selectedRange.to.getTime()) {
        return `Bắt đầu từ: ${formatDisplayDate(selectedRange.from)}`;
      } else {
        return `${formatDisplayDate(selectedRange.from)} - ${formatDisplayDate(selectedRange.to)}`;
      }
    } else if (selectedRange?.from) {
      return formatDisplayDate(selectedRange.from);
    }
    return '';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Bộ lọc tìm kiếm</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mã đơn hàng
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập mã đơn hàng..."
              value={filters.orderCode}
              onChange={e => setFilters(f => ({ ...f, orderCode: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
            />
            {filters.orderCode && (
              <button
                onClick={() => setFilters(f => ({ ...f, orderCode: "" }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Model xe
          </label>
          <select
            value={filters.carModel}
            onChange={e => setFilters(f => ({ ...f, carModel: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Tất cả model xe</option>
            {carModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Trạng thái
          </label>
          <select
            value={filters.status}
            onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Tất cả trạng thái</option>
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Thời gian thuê
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Chọn ngày nhận - ngày trả"
              value={getDateRangeDisplay()}
              readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400 cursor-pointer bg-white"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            
            {/* Calendar Dropdown with react-day-picker */}
            {isCalendarOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={handleRangeSelect}
                  numberOfMonths={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* nếu có bộ lọc nào thì sẽ hiển thị ở dưới */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm text-gray-600 font-medium">Bộ lọc đang áp dụng:</span>
            {filters.orderCode && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Mã ĐH: {filters.orderCode}
                <button
                  onClick={() => setFilters(f => ({ ...f, orderCode: "" }))}
                  className="ml-2 inline-flex items-center p-0.5 rounded-full text-green-600 hover:bg-green-200"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {filters.carModel && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Model: {filters.carModel}
                <button
                  onClick={() => setFilters(f => ({ ...f, carModel: "" }))}
                  className="ml-2 inline-flex items-center p-0.5 rounded-full text-green-600 hover:bg-green-200"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Trạng thái: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => setFilters(f => ({ ...f, status: "" }))}
                  className="ml-2 inline-flex items-center p-0.5 rounded-full text-green-600 hover:bg-green-200"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {(filters.startDate || filters.endDate) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Thời gian: {filters.startDate || "..."} - {filters.endDate || "..."}
                <button
                  onClick={() => setFilters(f => ({ ...f, startDate: "", endDate: "" }))}
                  className="ml-2 inline-flex items-center p-0.5 rounded-full text-green-600 hover:bg-green-200"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

