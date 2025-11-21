import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCircleCheck, faHourglassStart } from "@fortawesome/free-solid-svg-icons";

export default function CustomerStatsHeader({ customers }) {
  // lấy số liệu thống kê
  const verifiedCount = customers.filter(c => c.status === 'verified').length;
  const unverifiedCount = customers.filter(c => c.status === 'unverified').length;
  // cấu hình hiển thị thống kê
  const stats = [
    { label: 'Tổng khách hàng', count: customers.length, color: 'blue', icon: (<FontAwesomeIcon icon={faUsers}/>) },
    { label: 'Đã xác thực', count: verifiedCount, color: 'green', icon: (<FontAwesomeIcon icon={faCircleCheck}/>) },
    { label: 'Chưa xác thực', count: unverifiedCount, color: 'yellow', icon: (<FontAwesomeIcon icon={faHourglassStart}/>) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý khách hàng</h1>
          <p className="text-gray-600">Quản lý thông tin và xác thực khách hàng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center"
          >
            <div className={`text-4xl mr-4 text-${s.color}-500`}>
              {s.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{s.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{s.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
