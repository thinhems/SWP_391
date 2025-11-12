import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCustomers } from '../data/mockCustomers';
import { customersService } from '../services/customers.api';

const CustomersContext = createContext();

export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomersProvider');
  }
  return context;
};

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu khách hàng
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customersService.getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers data:', err);
      setError('Có lỗi xảy ra khi tải dữ liệu khách hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  const filteredCustomers = customers.filter(c => c.roleID === 3);
  // Tính toán số liệu cho khách hàng
  const customersData = {
    total: filteredCustomers.length,
    verified: filteredCustomers.filter(c => c.status === 'verified').length,
    unverified: filteredCustomers.filter(c => c.status === 'unverified').length,
    vip: filteredCustomers.filter(c => c.customerType === 'vip').length,
    regular: filteredCustomers.filter(c => c.customerType === 'regular').length,
    new: filteredCustomers.filter(c => c.customerType === 'new').length,
    allCustomers: filteredCustomers,
    
    getCustomerById: (id) => filteredCustomers.find(c => c.id === id),
    getCustomersByStatus: (status) => filteredCustomers.filter(c => c.status === status),
    getCustomersByType: (type) => filteredCustomers.filter(c => c.customerType === type)
  };

  // Cập nhật khách hàng
  const updateCustomer = (customerId, updatedData) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(c => c.id === customerId ? { ...c, ...updatedData } : c)
    );
  };

  // Refresh customers data
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
    customersData,
    loading,
    error,
    fetchCustomers,
    updateCustomer,
    refreshCustomers
  };

  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
};