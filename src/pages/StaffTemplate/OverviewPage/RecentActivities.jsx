import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faClock, faUsers, faBell, faCircleCheck, faWrench } from '@fortawesome/free-solid-svg-icons';

export default function RecentActivities({ activities }) {
  const getIcon = (iconName) => {
    const icons = {
      car: faCarSide,
      clock: faClock,
      users: faUsers,
      bell: faBell,
      check: faCircleCheck,
      wrench: faWrench
    };
    return icons[iconName] || faCircleCheck;
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Hoạt động gần đây</h2>
        <div className="text-center py-8 text-gray-500">
          <p>Chưa có hoạt động nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Hoạt động gần đây</h2>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          Xem tất cả
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`flex-shrink-0 w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center`}>
              <FontAwesomeIcon icon={getIcon(activity.icon)} className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.customer}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}