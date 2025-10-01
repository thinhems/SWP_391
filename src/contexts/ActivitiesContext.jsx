import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCars } from './CarsContext';
import { useCustomers } from './CustomersContext';

const ActivitiesContext = createContext();

export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivitiesProvider');
  }
  return context;
};

export const ActivitiesProvider = ({ children }) => {
  const [manualActivities, setManualActivities] = useState([]);
  const { carsData } = useCars();
  const { customersData } = useCustomers();

  // Tạo hoạt động từ dữ liệu xe và khách hàng
  const generateActivitiesFromData = (cars, customers) => {
    const dataActivities = [];
    
    // Hoạt động từ xe đang được thuê
    cars.filter(car => car.status === 'rented').forEach((car, index) => {
      dataActivities.push({
        id: `rental_${index}`,
        type: 'rental',
        title: `Xe ${car.model} (${car.licensePlate}) đang được thuê`,
        customer: car.customer,
        time: '2 giờ trước',
        icon: 'car',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
      });
    });

    // Hoạt động từ các yêu cầu phê duyệt đang chờ
    cars.filter(car => car.status === 'pending_approval').slice(0, 2).forEach((car, index) => {
      dataActivities.push({
        id: `approval_${index}`,
        type: 'approval',
        title: `Yêu cầu thuê mới từ ${car.customer}`,
        customer: `Xe ${car.model} (${car.licensePlate})`,
        time: `${index + 1} giờ trước`,
        icon: 'clock',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      });
    });

    // Hoạt động từ khách hàng mới
    customers.filter(c => c.status === 'unverified').slice(0, 2).forEach((customer, index) => {
      dataActivities.push({
        id: `customer_${index}`,
        type: 'customer',
        title: 'Khách hàng mới đăng ký',
        customer: customer.name,
        time: `${index + 3} giờ trước`,
        icon: 'users',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      });
    });

    // Hoạt động từ các xe cần bảo trì
    cars.filter(car => car.battery < 80).slice(0, 1).forEach((car, index) => {
      dataActivities.push({
        id: `maintenance_${index}`,
        type: 'maintenance',
        title: `Xe ${car.model} (${car.licensePlate}) cần sạc`,
        customer: `Pin còn ${car.battery}%`,
        time: '5 giờ trước',
        icon: 'bell',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100'
      });
    });

    return dataActivities;
  };

  // Combine manual activities với auto-generated activities
  const allActivities = React.useMemo(() => {
    const dataActivities = carsData?.allCars && customersData?.allCustomers 
      ? generateActivitiesFromData(carsData.allCars, customersData.allCustomers)
      : [];
    
    // Merge manual activities (mới nhất) với data activities
    return [...manualActivities, ...dataActivities].slice(0, 20);
  }, [manualActivities, carsData?.allCars, customersData?.allCustomers]);

  // Thêm hoạt động mới 
  const addActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: `manual_${Date.now()}_${Math.random()}`,
      time: 'Vừa xong'
    };
    
    setManualActivities(prev => [newActivity, ...prev].slice(0, 10));
  };

  // Clear các hoat động thủ công
  const clearManualActivities = () => {
    setManualActivities([]);
  };

  const value = {
    activities: allActivities,
    addActivity,
    clearManualActivities
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
};