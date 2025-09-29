import { useState, useEffect } from 'react';
import { mockCustomers } from '../../../data/mockCustomers'; 
import CustomerStatsHeader from './CustomerStatsHeader';
import CustomerList from './CustomerList';
import CustomerFilterSearch from './CustomerFilterSearch';

export default function CustomerManagementPage() {
  const [customers, setCustomers] = useState([]); // đặt state cho mảng khách hàng
  const [searchTerm, setSearchTerm] = useState(''); // đặt state cho từ khóa tìm kiếm
  const [statusFilter, setStatusFilter] = useState('all'); // đặt state cho bộ lọc trạng thái
  const [typeFilter, setTypeFilter] = useState('all'); // đặt state cho bộ lọc loại khách hàng
  const [currentPage, setCurrentPage] = useState(1); // đặt state cho trang hiện tại
  const [loading, setLoading] = useState(false); // đặt state cho trạng thái tải dữ liệu
  const itemsPerPage = 10; // hiển thị số lượng khách hàng trên mỗi trang

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCustomers(mockCustomers);
      setLoading(false);
    }, 500);
  }, []);
  
  // filter khách hàng dựa trên từ khóa tìm kiếm và bộ lọc
  const filteredCustomers = customers.filter((customer) => {
    const searchMatch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const statusMatch = statusFilter === 'all' || customer.status === statusFilter;
    const typeMatch = typeFilter === 'all' || customer.customerType === typeFilter;

    return searchMatch && statusMatch && typeMatch;
  });

  // phân trang
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Lấy danh sách khách hàng cho trang hiện tại
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Reset về trang 1 khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCustomers.length]);
  // hàm làm mới dữ liệu
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setCustomers(mockCustomers);
      setLoading(false);
    }, 500);
  };
  // hàm kiểm tra tài khoản khách hàng
  const handleVerifyAccount = (customer) => {
    alert(`Kiểm tra tài khoản: ${customer.name}\n(Chức năng sẽ được phát triển)`);
  };
  // hàm phân loại khách hàng
  const handleClassifyCustomer = (customer) => {
    alert(`Phân loại khách hàng: ${customer.name}\n(Chức năng sẽ được phát triển)`);
  };
  
  // hàm chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300"></div>
          <p className="mt-4 text-gray-600 font-medium text-lg">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <CustomerList
          customers={currentCustomers}
          allCustomersCount={filteredCustomers.length}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          onVerifyAccount={handleVerifyAccount}
          onClassifyCustomer={handleClassifyCustomer}
          onPageChange={handlePageChange}
        />
      )}
      
    </div>
  );
}