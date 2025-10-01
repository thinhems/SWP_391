import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faUsers, faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function StatsCards({ carsData, customersData }) {
  const stats = [
    {
      label: 'Tổng số xe',
      value: carsData.total,
      icon: faCarSide,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      change: 'Tổng số xe hiện có trong hệ thống trạm'
    },
    {
      label: 'Xe đang cho thuê',
      value: carsData.rented,
      icon: faSpinner,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      change: `${Math.round((carsData.rented / carsData.total) * 100)}% tổng số xe`
    },
    {
      label: 'Xe có sẵn',
      value: carsData.available,
      icon: faCircleCheck,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      change: 'Sẵn sàng cho thuê'
    },
    {
      label: 'Tổng khách hàng',
      value: customersData.total,
      icon: faUsers,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      change: `${customersData.unverified} chưa xác thực`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <FontAwesomeIcon icon={stat.icon} className={`w-6 h-6 ${stat.textColor}`} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
          <p className="text-xs text-gray-500">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}