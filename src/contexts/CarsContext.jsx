import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { carService } from '../services/cars.api';

const CarsContext = createContext();

export const useCars = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};

export const CarsProvider = ({ children }) => {
  const [listCar, setListCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStation, setUserStation] = useState(null);
  const isFirstLoadRef = useRef(true); // ← Thêm ref

  // Fetch dữ liệu xe
  const fetchListCars = async () => {
    if (isFirstLoadRef.current) {
      setLoading(true);
    }
    
    setError(null);
    try {
      const data = await carService.getCars();
      setListCar(data);
    } catch (err) {
      setError(err);
      console.error('Error fetching cars:', err);
    } finally {
      if (isFirstLoadRef.current) {
        setLoading(false);
        isFirstLoadRef.current = false; // ← Đánh dấu đã load xong
      }
    }
  };

  useEffect(() => {
    fetchListCars();
    // tự động làm mới danh sách xe mỗi 20 giây
    const intervalId = setInterval(() => {
      fetchListCars();
    }, 20000);
    // cleanup interval khi unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // Lọc xe theo station của user
  const filteredCars = userStation
    ? listCar.filter(car => car.stationID === userStation)
    : listCar;
  // Tính toán số liệu cho xe đã lọc theo station
  const carsData = {
    // số lượng xe theo trạng thái
    total: filteredCars.length,
    available: filteredCars.filter(car => car.status === 0).length,
    pending_approval: filteredCars.filter(car => car.status === 1 && car.booking?.status === 0).length,
    pending_contract: filteredCars.filter(car => car.status === 2 && car.booking?.status === 1).length,
    pending_handover: filteredCars.filter(car => car.status === 3 && car.booking?.status === 2).length,
    rented: filteredCars.filter(car => car.status === 4 && car.booking?.status === 2).length,
    allCars: filteredCars,
    // lấy danh sách xe theo trạng thái
    getCarsByStatus: (status) => filteredCars.filter(car => car.status === status),
    // lấy xe theo ID 
    getCarById: (id) => filteredCars.find(car => car.id === id),
  };

  // Cập nhật status xe
  const updateCar = async (carId, updateCar) => { 
    try {
      await carService.updateCar(carId, updateCar);
      // Cập nhật lại danh sách xe sau khi update thành công
      await fetchListCars();
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  };
  // Tự động cập nhật trạng thái xe
  const autoUpdateStatusCar = async (carId) => { 
    try {
      await carService.updateStatusCar(carId);
      await fetchListCars();
    } catch (error) {
      console.error('Error updating car status:', error);
      throw error;
    }
  };

  const value = {
    carsData,
    loading,
    error,
    updateCar,
    autoUpdateStatusCar,
    setUserStation // Thêm function để set station từ bên ngoài
  };

  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>
  );
};