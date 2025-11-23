
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCalendarCheck, faBook, faSpinner, faClock } from "@fortawesome/free-solid-svg-icons";

export default function StatsSection({ bookings }) {
  // tính tổng số booking
  const total = bookings.pending_approval.length + bookings.pending_contract.length + bookings.pending_handover.length + bookings.rented.length;
  // mảng thống kê từng loại booking
  const stats = [
    { label: 'Chờ phê duyệt', count: bookings.pending_approval.length, color: 'yellow', icon: faClock },
    { label: 'Chờ ký hợp đồng', count: bookings.pending_contract.length, color: 'blue', icon: faCircleCheck },
    { label: 'Chờ bàn giao', count: bookings.pending_handover.length, color: 'orange', icon: faSpinner },
    { label: 'Đang thuê', count: bookings.rented.length, color: 'purple', icon: faCalendarCheck },
    { label: 'Tổng booking', count: total, color: 'green', icon: faBook }
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