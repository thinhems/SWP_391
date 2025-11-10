
import { useState, useEffect } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import FilterSection from "./FilterSection";
import OrderRow from './OrderRow';

import { bookingService } from '../../../services/bookingService';

export default function MyContractsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [filters, setFilters] = useState({
    orderCode: "",
    carModel: "",
    status: "",
    startDate: "",
    endDate: ""
  });
  const [allOrders, setAllOrders] = useState([]); 
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const itemsPerPage = 5;
  // Nếu chưa đăng nhập, chuyển đến trang login
  useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, loading, navigate]);

  // Fetch contracts from API by renterID (user.id)
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      try {
        setIsLoading(true);
        const res = await bookingService.getBookingsByRenter(user.id);
        if (!res.success) throw new Error(res.error);

        const apiOrders = Array.isArray(res.data) ? res.data : (res.data?.data || []);

        // Transform API data to UI order shape used by OrderRow/filters
        const transformed = apiOrders.map((b) => {
          const start = b.startDate || b.StartDate;
          const end = b.endDate || b.EndDate;
          const rentalTypeNum = b.rentalType || b.RentalType;
          const rentalType = rentalTypeNum === 2 ? 'weeks' : rentalTypeNum === 3 ? 'months' : 'days';
          const startDate = new Date(start);
          const endDate = new Date(end);
          const totalDays = Math.max(1, Math.ceil((endDate - startDate) / (1000*60*60*24)));
          const statusNum = b.status ?? b.Status;
          // Map numeric status to UI keys (Booking table status)
          // 0: Chờ duyệt, 1: Chờ ký hợp đồng, 2: Đã đặt, 3+: các trạng thái khác
          const statusMap = {
            0: 'pending_approval',        // Chờ duyệt
            1: 'pending_contract',        // Chờ ký hợp đồng
            2: 'booked',                  // Đã đặt
            3: 'booked',                  // Đã đặt (fallback)
            4: 'rented',                  // Đang thuê
            5: 'completed',               // Hoàn thành
            6: 'cancelled'                // Đã hủy
          };
          const status = statusMap[statusNum] || 'pending_approval';

          const baseCost = b.baseCost ?? b.BaseCost ?? b.retalCost ?? 0;
          const deposit = b.deposit ?? b.Deposit ?? 0;

          return {
            id: b.id ?? b.bookingId ?? Math.random().toString(36).slice(2),
            orderCode: `BK-${(b.id ?? 0).toString().padStart(6,'0')}`,
            carModel: b.modelName || `Model #${b.vehicleID ?? b.ModelID ?? 'N/A'}`,
            carImage: b.imageUrl || '/images/default-car.jpg',
            licensePlate: b.licensePlate || '—',
            pickupDate: startDate.toISOString(),
            returnDate: endDate.toISOString(),
            totalDays,
            rentalType,
            pickupLocation: b.stationName || '—',
            totalAmount: baseCost,
            deposit,
            status
          };
        });

        setAllOrders(transformed);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setAllOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]); 

  // tự động lọc khi filters hoặc allOrders thay đổi
  useEffect(() => {
    if (allOrders.length > 0) {
      handleSearch();
    }
  }, [filters, allOrders]);

  // handle xử lý filter tìm kiếm
  const handleSearch = () => {
    setIsFiltering(true);
    let filtered = allOrders;
    if (filters.orderCode) {
      filtered = filtered.filter(order =>
        order.orderCode.toLowerCase().includes(filters.orderCode.toLowerCase())
      );
    }
    
    if (filters.carModel) {
      filtered = filtered.filter(order =>
        order.carModel.toLowerCase().includes(filters.carModel.toLowerCase())
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(order =>
        order.status === filters.status
      );
    }
    
    if (filters.startDate && filters.endDate) {
      const filterStartDate = new Date(filters.startDate);
      const filterEndDate = new Date(filters.endDate);
      
      filtered = filtered.filter(order => {
        const orderPickupDate = new Date(order.pickupDate);
        const orderReturnDate = new Date(order.returnDate);
        
        // Đơn hàng phải bắt đầu >= startDate VÀ kết thúc <= endDate (nằm hoàn toàn trong khoảng)
        return orderPickupDate >= filterStartDate && orderReturnDate <= filterEndDate;
      });
    } else if (filters.startDate) {
      filtered = filtered.filter(order =>
        new Date(order.pickupDate) >= new Date(filters.startDate)
      );
    } else if (filters.endDate) {
      filtered = filtered.filter(order =>
        new Date(order.returnDate) <= new Date(filters.endDate)
      );
    }
    
    // Sắp xếp danh sách theo orderCode từ lớn đến bé
    filtered = filtered.sort((a, b) => {
      return b.orderCode.localeCompare(a.orderCode);
    });
    
    setOrders(filtered);
    setCurrentPage(1);
    setIsFiltering(false);
  };
  // handle khi click vào 1 order
  const handleClickOrder = (orderId) => {
    navigate(`/contract-detail/${orderId}`);
  }
  // tính toán phân trang
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Xin chào, {user?.name || 'User'}!
                  </h1>
                  <p className="text-gray-600">
                    Quản lý hợp đồng của bạn
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-green-700">
                    Có tất cả: {orders.length} hợp đồng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <FilterSection 
            filters={filters} 
            setFilters={setFilters}
          />
        </div>
        {/* Content */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        ) : isFiltering ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600">Đang lọc dữ liệu...</p>
            </div>
          </div>
        ) : paginatedOrders.length > 0 ? (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                <div className="grid grid-cols-11 gap-4 text-sm font-semibold text-green-900">
                  <div className="col-span-2">Thông tin xe</div>
                  <div className="col-span-3">Thời gian thuê</div>
                  <div className="col-span-2">Địa điểm</div>
                  <div className="col-span-2">Số tiền</div>
                  <div className="col-span-2">Trạng thái</div>
                </div>
              </div>
              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {paginatedOrders.map((order, index) => (
                  <OrderRow key={order.id} order={order} index={index} handleClickOrder={handleClickOrder} />
                ))}
              </div>
            </div>
            {/* nút phân trang chỉ hiển thị khi có nhiều hơn 1 trang */}
            {totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-sm border border-green-100 px-6 py-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Hiển thị <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-semibold">{Math.min(currentPage * itemsPerPage, orders.length)}</span> / <span className="font-semibold">{orders.length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      ‹ Trước
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-green-600 text-white'
                            : 'text-gray-600 hover:bg-green-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      Tiếp ›
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* nếu không có order nào lọc hợp lệ */
          <div className="bg-white rounded-lg shadow-sm border border-green-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy hợp đồng nào</h3>
            <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc tạo hợp đồng mới</p>
            <button
              onClick={() => navigate('/model-rental')}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Thuê xe ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

