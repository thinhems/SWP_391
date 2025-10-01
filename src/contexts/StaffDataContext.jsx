import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCars } from '../data/mockCars';
import { mockCustomers } from '../data/mockCustomers';
import { mockApprovalRequests } from '../data/mockApprovalRequests';
import { mockContractsData } from '../data/mockContractsData';
import { listItemCar } from '../data/mockListItem';

const StaffDataContext = createContext();

export const useStaffData = () => {
  const context = useContext(StaffDataContext);
  if (!context) {
    throw new Error('useStaffData must be used within a StaffDataProvider');
  }
  return context;
};

export const StaffDataProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // mô phỏng fetch dữ liệu từ API
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      // mô phỏng độ trễ mạng
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCars(mockCars);
      setCustomers(mockCustomers);
      setApprovalRequests(mockApprovalRequests);
      setContracts(mockContractsData);
      
      // tạo hoạt động gần đây từ dữ liệu
      const recentActivities = generateActivities(mockCars, mockCustomers);
      setActivities(recentActivities);
      
    } catch (err) {
      console.error('Error fetching staff data:', err);
      setError('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // tao hoạt động gần đây từ dữ liệu xe và khách hàng
  const generateActivities = (carsData, customersData) => {
    const activities = [];
    
    // hoạt động từ xe đang được thuê
    carsData.filter(car => car.status === 'rented').forEach((car, index) => {
      activities.push({
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

    // hoạt động từ các yêu cầu phê duyệt đang chờ
    carsData.filter(car => car.status === 'pending_approval').slice(0, 2).forEach((car, index) => {
      activities.push({
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

    // hoạt động từ khách hàng mới
    customersData.filter(c => c.status === 'unverified').slice(0, 2).forEach((customer, index) => {
      activities.push({
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

    // hoạt động từ các xe cần bảo trì
    carsData.filter(car => car.battery < 80).slice(0, 1).forEach((car, index) => {
      activities.push({
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

    return activities.slice(0, 10); // giới hạn tối đa 10 hoạt động
  };

  // tính toán số liệu cho xe
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

  // tính toán số liệu cho khách hàng
  const customersData = {
    total: customers.length,
    verified: customers.filter(c => c.status === 'verified').length,
    unverified: customers.filter(c => c.status === 'unverified').length,
    vip: customers.filter(c => c.customerType === 'vip').length,
    regular: customers.filter(c => c.customerType === 'regular').length,
    new: customers.filter(c => c.customerType === 'new').length,
    allCustomers: customers,
    
    getCustomerById: (id) => customers.find(c => c.id === id),
    getCustomersByStatus: (status) => customers.filter(c => c.status === status),
    getCustomersByType: (type) => customers.filter(c => c.customerType === type)
  };

  // hàm cập nhật xe
  const updateCar = (carId, updatedData) => {
    setCars(prevCars => 
      prevCars.map(car => car.id === carId ? { ...car, ...updatedData } : car)
    );
  };
  // hàm cập nhật khách hàng
  const updateCustomer = (customerId, updatedData) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(c => c.id === customerId ? { ...c, ...updatedData } : c)
    );
  };
  // hàm thêm hoạt động mới
  const addActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: `activity_${Date.now()}`,
      time: 'Vừa xong'
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 10));
  };

  // lấy yêu cầu phê duyệt theo carId
  const getApprovalRequestByCarId = (carId) => {
    return approvalRequests.find(req => req.carId === carId);
  };

  // lấy hợp đồng theo carId
  const getContractByCarId = (carId) => {
    return contracts.find(contract => contract.carId === carId);
  };

  // lấy checklist theo carId
  const getChecklistByCarId = (carId) => {
    return listItemCar[carId] || [];
  };

  // Lấy flat checklist (tất cả các mục trong một mảng)
  const getFlatChecklistByCarId = (carId) => {
    const checklist = listItemCar[carId] || [];
    return checklist.flatMap(category => category.items);
  };

  //refresh cars data
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
  //refresh customers data
  const refreshCustomers = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCustomers([...mockCustomers]);
    } catch (err) {
      console.error('Error refreshing customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // Data
    carsData,
    customersData,
    activities,
    approvalRequests,
    contracts,
    
    // State
    loading,
    error,
    
    // Methods
    fetchAllData,
    updateCar,
    updateCustomer,
    addActivity,
    getApprovalRequestByCarId,
    getContractByCarId,
    getChecklistByCarId,
    getFlatChecklistByCarId,
    refreshCars,
    refreshCustomers
  };

  return (
    <StaffDataContext.Provider value={value}>
      {children}
    </StaffDataContext.Provider>
  );
};