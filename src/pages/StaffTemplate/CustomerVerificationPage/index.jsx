import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStaffData } from '../../../contexts/StaffDataContext';
import CustomerInfoSection from './CustomerInfoSection';
import CustomerDocumentsSection from './CustomerDocumentsSection';
import VerificationActionsSection from './VerificationActionsSection';

export default function CustomerVerificationPage() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { customersData, updateCustomer, addActivity } = useStaffData();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        const foundCustomer = customersData.getCustomerById(customerId);
        if (foundCustomer) {
          setCustomer(foundCustomer);
        } else {
          setError(`Không tìm thấy khách hàng có ID: ${customerId}`);
        }
      } catch (err) {
        console.error('Error loading customer:', err);
        setError('Có lỗi xảy ra khi tải thông tin khách hàng');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [customerId, customersData]);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      // cập nhật trạng thái khách hàng
      updateCustomer(customerId, { status: 'verified' });
      
      // thêm hoạt động
      addActivity({
        type: 'customer_verified',
        title: `Đã xác thực khách hàng ${customer.name}`,
        customer: customer.email,
        icon: 'check',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      });
      
      alert(`Đã duyệt khách hàng: ${customer.name}\n\nThông báo đã được gửi tới email: ${customer.email}`);
      navigate('/staff/manage-customer');
    } catch (error) {
      console.error('Error approving customer:', error);
      alert('Có lỗi xảy ra khi duyệt khách hàng. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (rejectReason) => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return false;
    }
    
    setIsProcessing(true);
    try {
      // thêm hoạt động
      addActivity({
        type: 'customer_rejected',
        title: `Đã từ chối xác thực khách hàng ${customer.name}`,
        customer: rejectReason,
        icon: 'clock',
        color: 'text-red-600',
        bgColor: 'bg-red-100'
      });
      
      alert(`Đã từ chối khách hàng: ${customer.name}\n\nLý do: ${rejectReason}\n\nThông báo đã được gửi tới email: ${customer.email}`);
      navigate('/staff/manage-customer');
      return true;
    } catch (error) {
      console.error('Error rejecting customer:', error);
      alert('Có lỗi xảy ra khi từ chối khách hàng. Vui lòng thử lại.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNavigateBack = () => {
    navigate('/staff/manage-customer');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin khách hàng...</p>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy khách hàng</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={handleNavigateBack}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại danh sách khách hàng
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <CustomerInfoSection 
        customer={customer}
        onNavigateBack={handleNavigateBack}
        isProcessing={isProcessing}
      />
      <CustomerDocumentsSection customer={customer} />
      <VerificationActionsSection 
        customer={customer}
        onApprove={handleApprove}
        onReject={handleReject}
        isProcessing={isProcessing}
      />
    </div>
  );
}