
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCalendarCheck, faCarSide, faSpinner, faClock } from "@fortawesome/free-solid-svg-icons";

export default function StatsSection({ cars }) {
  // tính tổng số xe
  const total = cars.available.length + cars.pending_approval.length + cars.booked.length + cars.rented.length + cars.pending_contract.length;
  // mảng thống kê từng loại xe
  const stats = [
    { label: 'Xe có sẵn', count: cars.available.length, color: 'green', icon: faCircleCheck },
    { label: 'Chờ xác nhận', count: cars.pending_approval.length + cars.pending_contract.length, color: 'yellow', icon: faClock },
    { label: 'Xe đã đặt', count: cars.booked.length, color: 'orange', icon: faCalendarCheck },
    { label: 'Đang cho thuê', count: cars.rented.length, color: 'purple', icon: faSpinner },
    { label: 'Tổng số xe', count: total, color: 'blue', icon: faCarSide }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý xe</h1>
          <p className="text-gray-600">Quản lý danh sách xe tại trạm</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center"
          >
            <div className={`p-3 rounded-lg bg-${s.color}-100 text-${s.color}-600`}>
              <FontAwesomeIcon icon={s.icon} className="w-6 h-6" />
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