export default function CarFilterSearch({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus,
  filterModel,
  setFilterModel   
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Tìm kiếm */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tìm kiếm
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên xe, biển số, màu sắc, vị trí..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {/* Lọc theo trạng thái */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả</option>
            <option value="0">Sẵn sàng</option>
            <option value="1">Chờ duyệt</option>
            <option value="2">Chờ hợp đồng</option>
            <option value="3">Chờ bàn giao</option>
            <option value="4">Đang thuê</option>
          </select>
        </div>
        {/* Lọc theo model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dòng xe 
          </label>
          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả</option>
            <option value="1">Vinfast VF 3</option>
            <option value="2">Vinfast VF 6</option>
            <option value="3">Vinfast VF 7</option>
            <option value="4">Vinfast VF 8</option>
            <option value="5">Vinfast VF 9</option>
          </select>
        </div>
      </div>
    </div>
  );
}