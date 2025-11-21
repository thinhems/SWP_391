
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStations } from '../../../contexts/StationsContext';
import { useModels } from '../../../contexts/ModelsContext';

export default function SearchFilterSection({ 
  activeTab,
  onSearch,
  selectedLocation
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formLocation, setFormLocation] = useState(selectedLocation || '');
  const { stations, loading: stationsLoading } = useStations();
  const { setSelectedStationId } = useModels();
  
  // xử lý tìm kiếm với loading giả lập
  const handleSearch = () => {
    setIsLoading(true);
    
    // Tìm station được chọn để lấy ID
    const selectedStation = stations.find(s => s.name === formLocation);
    
    setTimeout(() => {
      setIsLoading(false);
      onSearch(formLocation); // Truyền location được chọn
      
      // Set station ID để fetch models theo station
      if (selectedStation) {
        setSelectedStationId(selectedStation.id);
      }
    }, 1500);
  };
  
  // Xử lý thay đổi tab và đồng bộ URL
  const handleTabChange = (newTab) => {
    navigate(`/model-rental?tab=${newTab}`);
  };
  
  // Các lựa chọn khoảng thời gian thuê
  const rentalPeriods = [
    { id: 'daily', label: 'Thuê ngày', unit: 'ngày'},
    { id: 'weekly', label: 'Thuê tuần', unit: 'tuần' },
    { id: 'monthly', label: 'Thuê tháng', unit: 'tháng' }
  ];

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tab selection */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200 inline-flex gap-1">
              {rentalPeriods.map(period => (
                <button
                  key={period.id}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === period.id 
                      ? 'text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                  style={activeTab === period.id ? { backgroundColor: '#188f49' } : {}}
                  onClick={() => handleTabChange(period.id)}
                >
                  <div className="text-center">
                    <div className="text-sm">{period.label}</div>
                    <div className={`text-xs ${activeTab === period.id ? 'text-white/80' : 'text-gray-400'}`}>
                      Theo {period.unit}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Search form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border overflow-hidden" style={{ borderColor: '#e8f5e9' }}>
            <div className="p-8">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                <div className="flex-1 space-y-3">
                  <label className="flex items-center text-gray-700 font-semibold text-sm">
                    <div className="w-5 h-5 rounded-lg flex items-center justify-center mr-2" style={{ backgroundColor: '#e8f5e9' }}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#188f49' }}>
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Chọn khu vực thuê xe
                  </label>
                  <select 
                    value={formLocation} 
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800 font-medium focus:outline-none focus:bg-white transition-all duration-300 shadow-sm"
                    style={{ '--focus-border-color': '#188f49' }}
                    onFocus={(e) => e.target.style.borderColor = '#188f49'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    disabled={stationsLoading}
                  >
                    {stationsLoading ? (
                      <option>Đang tải...</option>
                    ) : stations.length > 0 ? (
                      stations.map(station => (
                        <option key={station.id} value={station.name}>{station.name}</option>
                      ))
                    ) : (
                      <option>Không có điểm thuê xe</option>
                    )}
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                  <button 
                    className="cursor-pointer px-8 py-4 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
                    style={{ backgroundColor: '#188f49', '--ring-color': 'rgba(24, 143, 73, 0.3)' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#156d3a'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#188f49'}
                    onClick={handleSearch}
                    disabled={isLoading}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {isLoading ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      )}
                      <span className="text-lg font-semibold">
                        {isLoading ? 'Đang tìm...' : 'Tìm xe'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            {/* Features bar */}
            <div className="px-6 py-4 border-t" style={{ backgroundColor: '#e8f5e9', borderColor: '#e8f5e9' }}>
              <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    </div>
                    <span className="font-medium">Uy tín nhanh gọn</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    </div>
                    <span className="font-medium">Hỗ trợ 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    </div>
                    <span className="font-medium">Bảo hiểm toàn diện</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Loading Popup */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-3xl text-center shadow-2xl border max-w-md mx-4 transform animate-pulse" style={{ borderColor: '#e8f5e9' }}>
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full opacity-20" style={{ backgroundColor: '#188f49' }}></div>
              <div className="absolute inset-2 rounded-full opacity-40 animate-spin" style={{ backgroundColor: '#188f49' }}></div>
              <div className="absolute inset-4 rounded-full opacity-60 animate-spin" style={{ backgroundColor: '#156d3a', animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#188f49' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">🔍 Đang tìm kiếm xe</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi đang tìm kiếm những chiếc xe điện tốt nhất phù hợp với yêu cầu của bạn...
              </p>
              <div className="flex justify-center items-center space-x-2 mt-6">
                <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#188f49' }}></div>
                <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#188f49', animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#188f49', animationDelay: '0.4s' }}></div>
              </div>
              <div className="mt-6 text-sm font-medium" style={{ color: '#188f49' }}>
                Đang xử lý yêu cầu của bạn
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};