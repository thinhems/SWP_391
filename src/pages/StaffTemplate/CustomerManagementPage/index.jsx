import { useState, useEffect } from 'react';
import { useCustomers } from '../../../contexts/CustomersContext';
import CustomerStatsHeader from './CustomerStatsHeader';
import CustomerList from './CustomerList';
import CustomerFilterSearch from './CustomerFilterSearch';
import PopupCustomerType from './PopupCustomerType';

export default function CustomerManagementPage() {
  const { customersData, loading, updateCustomerType } = useCustomers(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showClassifyModal, setShowClassifyModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [updating, setUpdating] = useState(false);
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

  // Hàm mở modal phân loại
  const handleOpenClassifyModal = (customer) => {
    setSelectedCustomer(customer);
    setShowClassifyModal(true);
  };

  // Hàm đóng modal
  const handleCloseClassifyModal = () => {
    if (!updating) {
      setShowClassifyModal(false);
      setSelectedCustomer(null);
    }
  };

  // Hàm xử lý phân loại khách hàng
  const handleClassifyCustomer = async (type) => {
    if (updating || !selectedCustomer) return;
    handleCloseClassifyModal();
    const typeMap = {
      'new': 1,
      'regular': 2,
      'vip': 3
    };

    if (selectedCustomer.cusType === typeMap[type]) {
      return;
    }
    
    setUpdating(true);
    try {
      await updateCustomerType(selectedCustomer.id, typeMap[type]);
    } catch (error) {
      console.error('Error updating customer type:', error);
      alert('Có lỗi xảy ra khi cập nhật loại khách hàng');
    } finally {
      setUpdating(false);
    }
  };

  // Chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Đang tải dữ liệu khách hàng</p>
          <p className="text-sm text-gray-500 mt-1">Vui lòng đợi...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <CustomerStatsHeader 
          customers={customers} 
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
          onOpenClassifyModal={handleOpenClassifyModal}
        />
        <PopupCustomerType
          show={showClassifyModal}
          customer={selectedCustomer}
          onClose={handleCloseClassifyModal}
          onClassify={handleClassifyCustomer}
        />
      </div>

      {/* Loading update type */}
      {updating && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
            <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
          </div>
        </div>
      )}
    </>
  );
}