import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContractById } from '../../../data/mockContractDetails';
import ContractHeader from './ContractHeader';
import CustomerCarInfo from './CustomerCarInfo';
import RentalPaymentInfo from './RentalPaymentInfo';
import OTPVerificationPopup from './OTPVerificationPopup';

export default function ContractDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOtpModal, setShowOtpModal] = useState(false);
  // call api lấy hợp đồng theo id
  useEffect(() => {
    const fetchContract = () => {
      setLoading(true);
      const contractData = getContractById(id);
      if (contractData) {
        setContract(contractData);
      } else {
        navigate('/my-contracts');
      }
      setLoading(false);
    };

    fetchContract();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-700 font-medium">Đang tải thông tin hợp đồng...</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy hợp đồng</h2>
          <button 
            onClick={() => navigate('/my-contracts')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Quay lại danh sách hợp đồng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* Header */}
        <ContractHeader 
          contract={contract} 
          onSignContract={() => setShowOtpModal(true)}
        />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left content - thông tin xe & khách hàng */}
          <div className="lg:col-span-2 space-y-6">
            <CustomerCarInfo contract={contract} />
          </div>
          {/* right content - thông tin thuê xe & thanh toán */}
          <div className="space-y-6">
            <RentalPaymentInfo contract={contract} />
          </div>
        </div>
        {/* OTP popup */}
        <OTPVerificationPopup 
          contract={contract} 
          isOpen={showOtpModal} 
          onClose={() => setShowOtpModal(false)} 
        />
      </div>
    </div>
  );
};