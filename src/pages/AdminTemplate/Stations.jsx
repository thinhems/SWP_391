import React, { useMemo, useState } from 'react';
import { useCars } from '../../contexts/CarsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faClock, faCalendarCheck, faCarSide, faBatteryThreeQuarters, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Stations() {
  const { carsData, refreshCars } = useCars();
  const cars = carsData?.allCars || [];
  const stations = useMemo(() => Array.from(new Set(cars.map(c => c.station))), [cars.length]);
  const [selectedStation, setSelectedStation] = useState('all');
  const [search, setSearch] = useState('');

  const grouped = (selectedStation === 'all' ? stations : [selectedStation]).map(station => {
    let list = cars.filter(c => c.station === station);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(c => c.licensePlate.toLowerCase().includes(q) || c.model.toLowerCase().includes(q));
    }
    return {
      station,
      total: list.length,
      available: list.filter(c => c.status === 'available').length,
      rented: list.filter(c => c.status === 'rented').length,
      booked: list.filter(c => c.status === 'booked').length,
      lowBattery: list.filter(c => c.battery < 80).length,
      list
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Điểm thuê</h1>
          <p className="text-gray-600">Theo dõi tình trạng xe tại từng điểm</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <button onClick={refreshCars} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Làm mới</button>
        </div>
      </div>
      {/* Filters */}
      <div className="sticky top-2 z-10 bg-white/80 backdrop-blur rounded-lg shadow-md border border-gray-200 p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex gap-3 flex-1">
          <select value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="all">Tất cả điểm</option>
            {stations.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
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
      {grouped.map(g => (
        <div key={g.station} className="bg-white rounded-lg shadow-md border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Điểm: {g.station}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{g.available} sẵn</span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">{g.rented} thuê</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">{g.booked} đặt</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{g.total} xe</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {g.list.slice(0, 9).map(car => (
              <div key={car.id} className={`border rounded-lg p-4 hover:shadow transition-shadow ${car.status === 'available' ? 'border-green-200' : car.status === 'booked' ? 'border-orange-200' : car.status === 'rented' ? 'border-purple-200' : 'border-yellow-200'}`}>
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">{car.model}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${car.status === 'available' ? 'bg-green-100 text-green-700' : car.status === 'booked' ? 'bg-orange-100 text-orange-700' : car.status === 'rented' ? 'bg-purple-100 text-purple-700' : 'bg-yellow-100 text-yellow-700'}`}>{car.status.replace('_', ' ')}</span>
                </div>
                <div className="text-sm text-gray-600">Biển số: {car.licensePlate}</div>
                <div className="text-sm text-gray-600">Pin: {car.battery}%</div>
                <div className="text-xs text-gray-500">Vị trí: {car.location}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


