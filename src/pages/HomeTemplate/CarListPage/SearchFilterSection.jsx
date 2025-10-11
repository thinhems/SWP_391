
export default function SearchFilterSection({ 
  selectedLocation, 
  setSelectedLocation, 
  pickupDate, 
  setPickupDate, 
  returnDate, 
  setReturnDate, 
  activeTab,
  onRentalPeriodChange,
  onSearch 
}) {
  // data các quận/huyện
  const locations = [
    'Quận 1',
    'Quận 7', 
    'Quận 9',
    'Quận Bình Thạnh'
  ];
  // data các loại thuê
  const rentalPeriods = [
    { id: 'daily', label: 'Thuê ngày', unit: 'ngày' },
    { id: 'weekly', label: 'Thuê tuần', unit: 'tuần' },
    { id: 'monthly', label: 'Thuê tháng', unit: 'tháng' }
  ];

  return (
    <div className="bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 text-white py-12 mb-8">
      <div className="max-w-6xl mx-auto px-5">
        {/* Tab lựa chọn loại thuê */}
        <div className="mb-6">
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
              {rentalPeriods.map(period => (
                <button
                  key={period.id}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === period.id 
                      ? 'bg-white text-green-700 shadow-lg' 
                      : 'text-white hover:bg-white/20'
                  }`}
                  onClick={() => onRentalPeriodChange(period.id)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Form tìm kiếm */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Chọn quận */}
            <div className="flex flex-col">
              <label className="flex items-center font-semibold mb-2 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Quận/Huyện
              </label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border-2 border-white/30 rounded-lg bg-white/95 text-gray-800 font-medium text-sm focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-300/30 transition-all duration-300"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            {/* Ngày nhận xe */}
            <div className="flex flex-col">
              <label className="flex items-center font-semibold mb-2 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Ngày nhận xe
              </label>
              <input
                type="datetime-local"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="px-3 py-2 border-2 border-white/30 rounded-lg bg-white/95 text-gray-800 font-medium text-sm focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-300/30 transition-all duration-300"
              />
            </div>
            {/* Ngày trả xe */}
            <div className="flex flex-col">
              <label className="flex items-center font-semibold mb-2 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Ngày trả xe
              </label>
              <input
                type="datetime-local"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="px-3 py-2 border-2 border-white/30 rounded-lg bg-white/95 text-gray-800 font-medium text-sm focus:outline-none focus:border-green-300 focus:ring-2 focus:ring-green-300/30 transition-all duration-300"
              />
            </div>
            {/* Nút tìm kiếm */}
            <div className="flex flex-col">
              <button 
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-green-300/40 transition-all duration-300"
                onClick={onSearch}
              >
                Tìm kiếm xe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};