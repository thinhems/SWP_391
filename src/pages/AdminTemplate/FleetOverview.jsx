import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faClock, faCalendarCheck, faCarSide, faBatteryThreeQuarters, faMagnifyingGlass, faArrowDownAZ, faBolt } from "@fortawesome/free-solid-svg-icons";
import { useCars } from '../../contexts/CarsContext';

export default function FleetOverview() {
  const { carsData, refreshCars } = useCars();
  const cars = carsData?.allCars || [];
  const [selectedStation, setSelectedStation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('battery_desc');
  const [search, setSearch] = useState('');

  const stationToCars = cars.reduce((acc, car) => {
    acc[car.station] = acc[car.station] || [];
    acc[car.station].push(car);
    return acc;
  }, {});

  const stationSummaries = Object.entries(stationToCars).map(([station, list]) => ({
    station,
    total: list.length,
    available: list.filter(c => c.status === 'available').length,
    booked: list.filter(c => c.status === 'booked').length,
    rented: list.filter(c => c.status === 'rented').length,
    pendingApproval: list.filter(c => c.status === 'pending_approval').length,
    pendingContract: list.filter(c => c.status === 'pending_contract').length,
  }));

  const stations = useMemo(() => ['all', ...Object.keys(stationToCars)], [cars.length]);

  const stats = useMemo(() => ({
    total: cars.length,
    available: cars.filter(c => c.status === 'available').length,
    pending: cars.filter(c => c.status === 'pending_approval' || c.status === 'pending_contract').length,
    booked: cars.filter(c => c.status === 'booked').length,
    rented: cars.filter(c => c.status === 'rented').length,
  }), [cars.length]);

  const filteredAndSorted = useMemo(() => {
    let list = [...cars];
    if (selectedStation !== 'all') list = list.filter(c => c.station === selectedStation);
    if (selectedStatus !== 'all') list = list.filter(c => c.status === selectedStatus);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(c =>
        c.licensePlate.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'battery_asc':
        list.sort((a, b) => a.battery - b.battery);
        break;
      case 'battery_desc':
        list.sort((a, b) => b.battery - a.battery);
        break;
      case 'station_asc':
        list.sort((a, b) => a.station.localeCompare(b.station));
        break;
      default:
        break;
    }
    return list;
  }, [cars, selectedStation, selectedStatus, sortBy, search]);

  const getStatusAccent = (status) => {
    if (status === 'available') return 'border-l-4 border-green-500';
    if (status === 'booked') return 'border-l-4 border-orange-500';
    if (status === 'rented') return 'border-l-4 border-purple-500';
    if (status === 'pending_contract') return 'border-l-4 border-blue-500';
    return 'border-l-4 border-yellow-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đội xe</h1>
          <p className="text-gray-600">Giám sát số lượng xe theo điểm</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button onClick={refreshCars} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Làm mới</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center">
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <FontAwesomeIcon icon={faCircleCheck} className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Xe có sẵn</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.available}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center">
          <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
            <FontAwesomeIcon icon={faClock} className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Chờ xác nhận</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center">
          <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
            <FontAwesomeIcon icon={faCalendarCheck} className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Xe đã đặt</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.booked}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center">
          <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
            <FontAwesomeIcon icon={faCarSide} className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Đang cho thuê</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.rented}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
            <FontAwesomeIcon icon={faBatteryThreeQuarters} className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Tổng số xe</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-2 z-10 bg-white/80 backdrop-blur rounded-lg shadow-md border border-gray-200 p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex gap-3 flex-1">
          <select value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            {stations.map(s => (
              <option key={s} value={s}>{s === 'all' ? 'Tất cả điểm' : s}</option>
            ))}
          </select>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Có sẵn</option>
            <option value="pending_approval">Chờ xác nhận</option>
            <option value="pending_contract">Chờ hợp đồng</option>
            <option value="booked">Đã đặt</option>
            <option value="rented">Đang thuê</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="battery_desc">Pin: cao đến thấp</option>
            <option value="battery_asc">Pin: thấp đến cao</option>
            <option value="station_asc">Theo điểm</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-2 top-2.5 text-gray-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo biển số / mẫu xe" className="border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-sm w-64" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {stationSummaries.map(s => (
          <div key={s.station} className="bg-white rounded-lg shadow-md border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{s.station}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{s.available} sẵn</span>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">{s.rented} thuê</span>
                <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">{s.booked} đặt</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{s.total} xe</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-green-50 text-green-700">Sẵn sàng: <b>{s.available}</b></div>
              <div className="p-3 rounded-lg bg-yellow-50 text-yellow-700">Chờ duyệt: <b>{s.pendingApproval}</b></div>
              <div className="p-3 rounded-lg bg-blue-50 text-blue-700">Đã đặt: <b>{s.booked}</b></div>
              <div className="p-3 rounded-lg bg-purple-50 text-purple-700">Đang thuê: <b>{s.rented}</b></div>
              <div className="p-3 rounded-lg bg-amber-50 text-amber-700 col-span-2">Chờ hợp đồng: <b>{s.pendingContract}</b></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5">
        <h3 className="text-lg font-semibold mb-4">Danh sách xe</h3>
        <div className="flex flex-wrap gap-6">
          {filteredAndSorted.map(car => (
            <div key={car.id} className={`w-full sm:w-80 md:w-96 lg:w-[420px] bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all ${getStatusAccent(car.status)}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{car.model}</h3>
                  <p className="text-gray-600 font-medium">{car.licensePlate}</p>
                  <p className="text-sm text-gray-500">{car.color} - {car.year}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${car.status === 'available' ? 'bg-green-100 text-green-800' : car.status === 'booked' ? 'bg-orange-100 text-orange-800' : car.status === 'rented' ? 'bg-purple-100 text-purple-800' : car.status === 'pending_contract' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {car.status.replace('_',' ')}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Điểm:</span>
                  <span className="text-sm font-medium text-gray-900">{car.station}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pin:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className={`h-full rounded-full ${car.battery >= 80 ? 'bg-green-500' : car.battery >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${car.battery}%` }} />
                    </div>
                    <span className={`text-sm font-medium ${car.battery < 30 ? 'text-red-600' : car.battery < 60 ? 'text-yellow-600' : 'text-green-600'}`}>{car.battery}%</span>
                  </div>
                </div>
                {car.lastMaintenance && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bảo trì cuối:</span>
                    <span className="text-sm font-medium text-gray-900">{car.lastMaintenance}</span>
                  </div>
                )}
                {car.battery < 30 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600">Cần sạc</span>
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                      <FontAwesomeIcon icon={faBolt} className="w-3 h-3 mr-1" /> Pin thấp
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


