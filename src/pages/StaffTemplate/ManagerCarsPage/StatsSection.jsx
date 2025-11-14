
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCalendarCheck, faCarSide, faSpinner, faClock } from "@fortawesome/free-solid-svg-icons";

export default function StatsSection({ cars }) {
  // tính tổng số xe
  const total = cars.available.length + cars.pending_approval.length + cars.pending_handover.length + cars.rented.length + cars.pending_contract.length;
  // mảng thống kê từng loại xe
  const stats = [
    { label: 'Xe có sẵn', count: cars.available.length, color: 'green', icon: faCircleCheck },
    { label: 'Chờ xác nhận', count: cars.pending_approval.length + cars.pending_contract.length, color: 'yellow', icon: faClock },
    { label: 'Chờ bàn giao', count: cars.pending_handover.length, color: 'orange', icon: faSpinner },
    { label: 'Đang cho thuê', count: cars.rented.length, color: 'purple', icon: faCalendarCheck },
    { label: 'Tổng số xe', count: total, color: 'blue', icon: faCarSide }
  ];

  return (
    <div className="space-y-6">

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