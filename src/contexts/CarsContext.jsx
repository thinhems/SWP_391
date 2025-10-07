import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCars } from '../data/mockCars';
import { mockOrders } from '../data/mockOrders'
import { listItemCar } from '../data/mockListItem';

const CarsContext = createContext();

export const useCars = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};

export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu xe
  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCars(mockCars);
      setOrders(mockOrders);
    } catch (err) {
      console.error('Error fetching cars data:', err);
      setError('Có lỗi xảy ra khi tải dữ liệu xe');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Tính toán số liệu cho xe
  const carsData = {
    total: cars.length,
    available: cars.filter(car => car.status === 'available').length,
    pending_approval: cars.filter(car => car.status === 'pending_approval').length,
    pending_contract: cars.filter(car => car.status === 'pending_contract').length,
    booked: cars.filter(car => car.status === 'booked').length,
    rented: cars.filter(car => car.status === 'rented').length,
    allCars: cars,
    
    getCarsByStatus: (status) => cars.filter(car => car.status === status),
    getCarById: (id) => cars.find(car => car.id === id)
  };

  // Cập nhật xe
  const updateCar = (carId, updatedData) => {
    setCars(prevCars => 
      prevCars.map(car => car.id === carId ? { ...car, ...updatedData } : car)
    );
  };
  // Lấy đơn hàng theo carId
  const getOrderByCarId = (carId) => {
    return orders.find(order => order.carId === carId);
  };

  // Lấy checklist theo carId
  const getChecklistByCarId = (carId) => {
    return listItemCar[carId] || [];
  };

  // Lấy flat checklist
  const getFlatChecklistByCarId = (carId) => {
    const checklist = listItemCar[carId] || [];
    return checklist.flatMap(category => category.items);
  };

  // Refresh cars data
  const refreshCars = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCars([...mockCars]);
    } catch (err) {
      console.error('Error refreshing cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    carsData,
    orders,
    loading,
    error,
    fetchCars,
    updateCar,
    getOrderByCarId,
    getChecklistByCarId,
    getFlatChecklistByCarId,
    refreshCars
  };

  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>
  );
};