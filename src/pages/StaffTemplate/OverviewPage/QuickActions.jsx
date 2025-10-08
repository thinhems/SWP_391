import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faCalendarCheck, 
  faUsers, 
  faCarSide, 
  faChartLine, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';

export default function QuickActions({ carsData, navigate }) {
  // các hành động nhanh với các thuộc tính tương ứng
  // bao gồm tiêu đề, biểu tượng, màu sắc, hành động khi nhấn nút, v.v.
  const actions = [
    {
      title: 'Xe chờ xác nhận',
      count: carsData.pending_approval,
      icon: faClock,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      onClick: () => navigate('/staff/manage-cars?tab=pending_approval'),
      description: 'Xử lý yêu cầu thuê xe'
    },
    {
      title: 'Xe chờ ký HĐ',
      count: carsData.pending_contract,
      icon: faCalendarCheck,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => navigate('/staff/manage-cars?tab=booked'),
      description: 'Chuẩn bị giao xe'
    },
    {
      title: 'Quản lý khách hàng',
      count: null,
      icon: faUsers,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      onClick: () => navigate('/staff/manage-cars?tab=rented'),
      description: 'Xem và xác thực KH'
    },
    {
      title: 'Quản lý xe',
      count: null,
      icon: faCarSide,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => navigate('/staff/manage-cars?tab=available'),
      description: 'Kiểm tra và bảo trì'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Hành động nhanh</h2>
        <FontAwesomeIcon icon={faChartLine} className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <div 
            key={index} 
            className={`${action.bgColor} border ${action.borderColor} rounded-lg p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <FontAwesomeIcon icon={action.icon} className={`w-6 h-6 ${action.textColor}`} />
              {action.count !== null && (
                <span className={`px-2 py-1 ${action.textColor} bg-white rounded-full text-xs font-bold`}>
                  {action.count}
                </span>
              )}
            </div>
            <h3 className={`font-semibold ${action.textColor} mb-1`}>
              {action.title}
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              {action.description}
            </p>
            <button
              onClick={action.onClick}
              className={`w-full ${action.buttonColor} text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2`}
            >
              <span>Xem chi tiết</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}