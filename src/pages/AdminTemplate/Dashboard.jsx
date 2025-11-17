import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCars } from '../../contexts/CarsContext';
import { useCustomers } from '../../contexts/CustomersContext';
import { useStations } from '../../contexts/StationsContext';
import paymentApi from '../../services/payment.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUsers, faMapMarkerAlt, faMoneyBillWave, faClock, faFileSignature, faKey, faCheckCircle, faRotateRight, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const { carsData, loading: carsLoading, setUserStation } = useCars();
  const { customersData, loading: customersLoading } = useCustomers();
  const { stations, loading: stationsLoading } = useStations();

  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [paymentsError, setPaymentsError] = useState(null);
  const [selectedStation, setSelectedStation] = useState('all');

  const loadPayments = async () => {
    try {
      setPaymentsLoading(true);
      const data = await paymentApi.getAllPayments();
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      setPaymentsError('Không thể tải dữ liệu thanh toán');
      console.error('Dashboard payments error:', err);
    } finally {
      setPaymentsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    loadPayments();
    return () => { mounted = false; };
  }, []);

  // Change car filtering by station
  useEffect(() => {
    if (selectedStation === 'all') setUserStation(null);
    else setUserStation(Number(selectedStation));
  }, [selectedStation, setUserStation]);

  const carsByStatus = useMemo(() => {
    const total = carsData?.total || 0;
    const available = carsData?.available || 0;
    const rented = carsData?.rented || 0;
    const pendingApproval = carsData?.pending_approval || 0;
    const pendingContract = carsData?.pending_contract || 0;
    const pendingHandover = carsData?.pending_handover || 0;
    return {
      total,
      available,
      rented,
      pendingApproval,
      pendingContract,
      pendingHandover
    };
  }, [carsData]);

  const totals = useMemo(() => ({
    cars: carsByStatus.total,
    customers: customersData?.total || 0,
    stations: stations?.length || 0
  }), [carsByStatus.total, customersData?.total, stations]);

  const revenueThisMonth = useMemo(() => {
    try {
      if (!payments?.length) return 0;
      const now = new Date();
      const ym = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
      return payments
        .filter(p => {
          const d = p.date || p.createdAt || p.paymentDate;
          if (!d) return false;
          const ds = new Date(d);
          return ds.getFullYear() === now.getFullYear() && ds.getMonth() === now.getMonth();
        })
        .reduce((sum, p) => sum + Number(p.amount || p.totalAmount || p.money || 0), 0);
    } catch {
      return 0;
    }
  }, [payments]);

  const revenuePrevMonth = useMemo(() => {
    try {
      if (!payments?.length) return 0;
      const now = new Date();
      const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return payments
        .filter(p => {
          const d = p.date || p.createdAt || p.paymentDate;
          if (!d) return false;
          const ds = new Date(d);
          return ds.getFullYear() === prev.getFullYear() && ds.getMonth() === prev.getMonth();
        })
        .reduce((sum, p) => sum + Number(p.amount || p.totalAmount || p.money || 0), 0);
    } catch {
      return 0;
    }
  }, [payments]);

  const revenueDelta = revenuePrevMonth === 0 ? 0 : Math.round(((revenueThisMonth - revenuePrevMonth) / Math.max(1, revenuePrevMonth)) * 100);

  const percent = (part, whole) => whole ? Math.round((part/whole)*100) : 0;

  const loadingAny = carsLoading || customersLoading || stationsLoading;

  return (
    <div className="space-y-6 relative min-h-screen">
      {/* Enhanced animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-300/40 via-green-200/30 to-teal-300/40 blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200/30 to-emerald-200/40 blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />
        <div className="absolute -bottom-24 right-1/3 w-96 h-96 rounded-full bg-gradient-to-tl from-teal-300/30 via-emerald-200/30 to-green-300/40 blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}} />
      </div>

      {/* Heading with better styling */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Tổng quan hệ thống</h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Theo dõi tình trạng đội xe, khách hàng và doanh thu
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-sm text-gray-500 mr-2">
            {new Date().toLocaleString('vi-VN', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-2">
            <select value={selectedStation} onChange={(e)=>setSelectedStation(e.target.value)} className="text-sm border rounded-lg px-3 py-2 bg-white">
              <option value="all">Tất cả điểm</option>
              {stations?.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <button onClick={loadPayments} className="px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-50" title="Làm mới thanh toán">
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
            <Link to="/admin/revenue" className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 shadow">
              Xem doanh thu
            </Link>
          </div>
        </div>
      </div>

      {/* Top stats with loading states */}
      {loadingAny ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-32 bg-white/60 backdrop-blur rounded-xl shadow animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Tổng số xe" value={totals.cars} subtitle={`${carsByStatus.available} khả dụng`} color="emerald" icon={faCar} />
          <StatCard title="Khách hàng" value={totals.customers} subtitle="Tổng đã đăng ký" color="blue" icon={faUsers} />
          <StatCard title="Điểm thuê" value={totals.stations} subtitle="Hoạt động" color="indigo" icon={faMapMarkerAlt} />
          <StatCard 
            title="Doanh thu tháng" 
            value={revenueThisMonth} 
            subtitle={revenueDelta === 0 ? 'VND' : `${Math.abs(revenueDelta)}% so với tháng trước`} 
            color="amber" money icon={faMoneyBillWave} 
            trend={revenueDelta}
          />
        </div>
      )}

      {/* Fleet status and pending approvals */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full"></span>
              Trạng thái đội xe
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{carsByStatus.total} xe</span>
          </div>
          <div className="space-y-5">
            <StatusBar label="Khả dụng" value={carsByStatus.available} total={carsByStatus.total} color="from-emerald-500 to-green-500" icon={faCheckCircle} />
            <StatusBar label="Đang cho thuê" value={carsByStatus.rented} total={carsByStatus.total} color="from-blue-500 to-cyan-500" icon={faKey} />
            <StatusBar label="Chờ duyệt" value={carsByStatus.pendingApproval} total={carsByStatus.total} color="from-amber-500 to-orange-500" icon={faClock} />
            <StatusBar label="Chờ ký hợp đồng" value={carsByStatus.pendingContract} total={carsByStatus.total} color="from-cyan-500 to-sky-500" icon={faFileSignature} />
            <StatusBar label="Chờ bàn giao" value={carsByStatus.pendingHandover} total={carsByStatus.total} color="from-fuchsia-500 to-purple-500" icon={faKey} />
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <MiniStat label="Khả dụng" value={percent(carsByStatus.available, carsByStatus.total)+"%"} color="text-emerald-600" />
            <MiniStat label="Đang thuê" value={percent(carsByStatus.rented, carsByStatus.total)+"%"} color="text-blue-600" />
            <MiniStat label="Chờ duyệt" value={percent(carsByStatus.pendingApproval, carsByStatus.total)+"%"} color="text-amber-600" />
            <MiniStat label="Chờ bàn giao" value={percent(carsByStatus.pendingHandover, carsByStatus.total)+"%"} color="text-fuchsia-600" />
          </div>
        </div>

        <div className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full"></span>
              Yêu cầu chờ duyệt
            </h3>
            <Link to="/admin/manage-cars?tab=pending_approval" className="text-emerald-600 text-sm font-medium hover:underline flex items-center gap-1">
              Xem tất cả
              <span className="text-xs">→</span>
            </Link>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
            {carsData?.getCarsByStatus(1)?.slice(0,5).map((car) => (
              <div key={car.id} className="group p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:border-emerald-300 hover:shadow-md hover:bg-emerald-50/30 transition-all duration-200">
                <div className="text-sm">
                  <p className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">{car.modelName || car.model || 'Xe'}</p>
                  <p className="text-gray-500 text-xs mt-0.5">Biển số: <span className="font-medium">{car.plateNumber || car.licensePlate || 'N/A'}</span></p>
                </div>
                <Link to={`/admin/manage-cars/approval-review/${car.id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-medium hover:from-emerald-600 hover:to-green-700 shadow-sm hover:shadow transition-all">
                  Duyệt
                </Link>
              </div>
            ))}
            {(!carsData?.getCarsByStatus(1) || carsData.getCarsByStatus(1).length === 0) && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-500 text-sm">Không có yêu cầu chờ duyệt</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payments and activities */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full"></span>
              Thanh toán gần đây
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{paymentsLoading ? 'Đang tải…' : `${payments?.length || 0} bản ghi`}</span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                <tr className="text-left text-gray-600 font-medium">
                  <th className="py-3 px-4">Mã</th>
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Số tiền</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {(payments || []).slice(0,8).map((p, idx) => (
                  <tr key={p.id || p.paymentId || idx} className={`border-b last:border-0 hover:bg-blue-50/30 transition-colors ${idx % 2 === 1 ? 'bg-gray-50/30' : 'bg-white'}`}>
                    <td className="py-3 px-4 font-semibold text-gray-800">#{p.id || p.paymentId || '—'}</td>
                    <td className="py-3 px-4 text-gray-700">{p.customerName || p.customer || '—'}</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">{Number(p.amount || p.totalAmount || 0).toLocaleString('vi-VN')}₫</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${p.status === 'Paid' || p.status === 1 ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                        <span className={`w-2 h-2 rounded-full ${p.status === 'Paid' || p.status === 1 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                        {p.status || 'Không rõ'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{new Date(p.date || p.createdAt || Date.now()).toLocaleString('vi-VN')}</td>
                  </tr>
                ))}
                {(!payments || payments.length === 0) && !paymentsLoading && (
                  <tr><td colSpan="5" className="py-4 text-center text-gray-500">Chưa có dữ liệu thanh toán</td></tr>
                )}
              </tbody>
            </table>
            {paymentsLoading && (
              <div className="mt-3 grid grid-cols-1 gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-9 bg-gray-100 animate-pulse rounded" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
            Ghi chú nhanh
          </h3>
          <div className="space-y-3">
            <Link to="/admin/manage-cars" className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors group">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 group-hover:scale-125 transition-transform"></span>
              <span className="text-sm text-gray-600 group-hover:text-emerald-700">Kiểm tra yêu cầu thuê mới trong mục Quản lý xe</span>
            </Link>
            <Link to="/admin/revenue" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 group-hover:scale-125 transition-transform"></span>
              <span className="text-sm text-gray-600 group-hover:text-blue-700">Theo dõi doanh thu chi tiết tại mục Doanh thu</span>
            </Link>
            <Link to="/admin/stations" className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group">
              <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 group-hover:scale-125 transition-transform"></span>
              <span className="text-sm text-gray-600 group-hover:text-purple-700">Quản lý điểm thuê tại mục Điểm cho thuê</span>
            </Link>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Tổng số liệu hệ thống</span>
              {loadingAny ? (
                <span className="text-gray-400">Đang tải...</span>
              ) : (
                <span className="font-semibold text-gray-700">{totals.cars + totals.customers + totals.stations} mục</span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 rounded-lg bg-emerald-50">
                <div className="font-bold text-emerald-700">{totals.cars}</div>
                <div className="text-gray-500">Xe</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-blue-50">
                <div className="font-bold text-blue-700">{totals.customers}</div>
                <div className="text-gray-500">KH</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-indigo-50">
                <div className="font-bold text-indigo-700">{totals.stations}</div>
                <div className="text-gray-500">Điểm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, color = 'emerald', money = false, icon, trend }) {
  const colorMap = {
    emerald: 'from-emerald-500 to-green-500',
    blue: 'from-blue-500 to-cyan-500',
    indigo: 'from-indigo-500 to-purple-500',
    amber: 'from-amber-500 to-orange-500'
  };
  const hoverColorMap = {
    emerald: 'from-emerald-600 to-green-600',
    blue: 'from-blue-600 to-cyan-600',
    indigo: 'from-indigo-600 to-purple-600',
    amber: 'from-amber-600 to-orange-600'
  };
  return (
    <div className="group p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <div className={`w-12 h-12 rounded-xl text-white grid place-items-center bg-gradient-to-br ${colorMap[color]} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
          {icon && <FontAwesomeIcon icon={icon} className="text-lg" />}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-gray-800 mb-2">
          {money ? (
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {Number(value || 0).toLocaleString('vi-VN')}₫
            </span>
          ) : (
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {value ?? 0}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {typeof trend === 'number' && trend !== 0 && (
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              <FontAwesomeIcon icon={trend > 0 ? faArrowTrendUp : faArrowTrendDown} />
              {Math.abs(trend)}%
            </span>
          )}
          <div className={`px-3 py-1.5 rounded-lg text-white text-xs font-semibold bg-gradient-to-r ${colorMap[color]} shadow-sm`}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ label, value, total, color, icon }) {
  const pct = total ? Math.min(100, Math.round((value/total)*100)) : 0;
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-gray-700 font-semibold flex items-center gap-2">
          {icon && <span className="text-gray-400 group-hover:text-gray-600 transition-colors"><FontAwesomeIcon icon={icon} /></span>}
          {label}
        </span>
        <span className="text-gray-600 font-medium">
          <span className="text-gray-800 font-bold">{value}</span>/{total}
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-3 bg-gradient-to-r ${color} rounded-full transition-all duration-700 ease-out shadow-sm`} 
          style={{ width: `${pct}%` }}
        >
          <div className="h-full w-full bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <div className="mt-1 text-right text-xs text-gray-500 font-medium">{pct}%</div>
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
      <div className="text-xs text-gray-500 font-medium mb-1">{label}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  );
}


