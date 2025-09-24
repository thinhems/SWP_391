
export default function StatsSection({ cars, onRefresh, onAddCar }) {
  const total = cars.available.length + cars.booked.length + cars.rented.length;

  const stats = [
    { label: 'Xe sẵn sàng', count: cars.available.length, color: 'green', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Đã đặt trước', count: cars.booked.length, color: 'orange', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Đang cho thuê', count: cars.rented.length, color: 'purple', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Tổng số xe', count: total, color: 'blue', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý xe</h1>
          <p className="text-gray-600">Quản lý danh sách xe tại trạm</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button onClick={onRefresh} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Làm mới</button>
          <button onClick={onAddCar} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Thêm xe mới</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center">
            <div className={`p-2 bg-${s.color}-100 rounded-lg`}>
              <svg className={`w-6 h-6 text-${s.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">{s.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{s.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

