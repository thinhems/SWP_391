import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCircleCheck, faClock, faFileContract, faKey, faCarSide } from "@fortawesome/free-solid-svg-icons";

export default function CarStatsHeader({ carsData }) {
  const stats = [
    {
      label: 'Tổng số xe',
      value: carsData.total,
      icon: faCar,
      color: 'blue'
    },
    {
      label: 'Sẵn sàng',
      value: carsData.available,
      icon: faCircleCheck,
      color: 'green'
    },
    {
      label: 'Chờ duyệt',
      value: carsData.pending_approval,
      icon: faClock,
      color: 'yellow'
    },
    {
      label: 'Chờ HĐ',
      value: carsData.pending_contract,
      icon: faFileContract,
      color: 'orange'
    },
    {
      label: 'Chờ bàn giao',
      value: carsData.pending_handover,
      icon: faKey,
      color: 'purple'
    },
    {
      label: 'Đang thuê',
      value: carsData.rented,
      icon: faCarSide,
      color: 'red'
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'text-blue-500',
      green: 'text-green-500',
      yellow: 'text-yellow-500',
      orange: 'text-orange-500',
      purple: 'text-purple-500',
      red: 'text-red-500'
    };
    return colors[color] || 'text-gray-500';
  };

  return (
    <div className='space-y-6'>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý xe</h1>
          <p className="text-gray-600">Danh sách và trạng thái các xe tại trạm</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center"
          >
            <div className={`text-4xl mr-4 ${getColorClass(stat.color)}`}>
              <FontAwesomeIcon icon={stat.icon} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}