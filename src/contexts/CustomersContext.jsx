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
      const data = await customersService.getAllUsers();
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
  // Tính toán số liệu cho khách hàng
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
  // cập nhật status verify khách hàng
  const updateVerificationStatus = async (customerId, status) => {
    try {
      await customersService.updateVerificationStatus(customerId, status);
      await fetchCustomers();
    } catch (error) {
      console.error('Error updating verification status:', error);
      throw error;
    }
  };

  const value = {
    customersData,
    loading,
    error,
    fetchCustomers,
    updateCustomer,
    refreshCustomers,
    updateVerificationStatus
  };

  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
};