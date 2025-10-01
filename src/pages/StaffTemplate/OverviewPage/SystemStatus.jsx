export default function SystemStatus({ carsData }) {
  const statusItems = [
    {
      label: 'Tỷ lệ sử dụng xe',
      value: Math.round((carsData.rented / carsData.total) * 100),
      max: 100,
      color: 'bg-purple-500',
      unit: '%',
      status: 'Tốt'
    },
    {
      label: 'Xe cần bảo trì',
      value: 2,
      max: carsData.total,
      color: 'bg-orange-500',
      unit: ' xe',
      status: 'Cần chú ý'
    },
    {
      label: 'Độ hài lòng KH',
      value: 95,
      max: 100,
      color: 'bg-green-500',
      unit: '%',
      status: 'Xuất sắc'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Trạng thái hệ thống</h2>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          Hoạt động bình thường
        </span>
      </div>
      <div className="space-y-6">
        {statusItems.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-gray-900">
                  {item.value}{item.unit}
                </span>
                <span className="text-xs text-gray-500">({item.status})</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${(item.value / item.max) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}