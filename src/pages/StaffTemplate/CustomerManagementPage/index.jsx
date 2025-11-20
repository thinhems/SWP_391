import { useState, useEffect } from 'react';
import { useCustomers } from '../../../contexts/CustomersContext';
import CustomerStatsHeader from './CustomerStatsHeader';
import CustomerList from './CustomerList';
import CustomerFilterSearch from './CustomerFilterSearch';

export default function CustomerManagementPage() {
  const { customersData, loading, refreshCustomers, updateCustomerType } = useCustomers(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const customers = customersData.allCustomers;
  
  // Filter khách hàng
  const filteredCustomers = customers.filter((customer) => {
    const searchMatch = 
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const statusMatch = statusFilter === 'all' || customer.isVerified === parseInt(statusFilter);
    const typeMatch = typeFilter === 'all' || customer.cusType === parseInt(typeFilter);

    return searchMatch && statusMatch && typeMatch;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Reset trang khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCustomers.length]);

  // Làm mới dữ liệu khách hàng
  const handleRefresh = () => {
    refreshCustomers();
  };

  // Chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300"></div>
        <p className="mt-4 text-gray-600 font-medium text-lg">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CustomerStatsHeader 
        customers={customers} 
        onRefresh={handleRefresh} 
      />
      <CustomerFilterSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      <CustomerList
        customers={currentCustomers}
        allCustomersCount={filteredCustomers.length}
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
        onUpdateType={updateCustomerType}
      />
    </div>
  );
}