import React, { useState } from 'react';
import VerificationStatusDisplay from './VerificationStatusDisplay';
import PersonalInfoForm from './PersonalInfoForm';
import DocumentUploadSection from './DocumentUploadSection';

export default function AccountVerification({ user }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [verificationData, setVerificationData] = useState({
    cccdNumber: '',
    blxNumber: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    cccdFrontImage: null,
    cccdBackImage: null,
    blxFrontImage: null,
    blxBackImage: null
  });

  // lấy trạng thái xác thực của user 
  const getVerificationStatus = () => {
    if (user?.verifiedStatus === 1) return 'not_started';
    else if (user?.verifiedStatus === 2) return 'pending';
    else if (user?.verifiedStatus === 3) return 'verified';
  };

  const verificationStatus = getVerificationStatus();

  // hanle cập nhật value cho form
  const handleInputChange = (e) => {
    setVerificationData({
      ...verificationData,
      [e.target.name]: e.target.value
    });
  };

  // handle thay đổi file upload
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Vui lòng chọn file hình ảnh!' });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Kích thước file không được vượt quá 5MB!' });
        return;
      }

      setVerificationData({
        ...verificationData,
        [fieldName]: file
      });
      setMessage({ type: '', text: '' });
    }
  };
  // Handle form submission
  const handleSubmitVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate required fields
    const requiredFields = ['cccdNumber', 'blxNumber', 'fullName', 'dateOfBirth', 'gender'];
    const requiredFiles = ['cccdFrontImage', 'cccdBackImage', 'blxFrontImage', 'blxBackImage'];
    for (let field of requiredFields) {
      if (!verificationData[field]) {
        setMessage({ type: 'error', text: `Vui lòng điền đầy đủ thông tin ${field}!` });
        setLoading(false);
        return;
      }
    }
    for (let file of requiredFiles) {
      if (!verificationData[file]) {
        setMessage({ type: 'error', text: `Vui lòng tải lên đầy đủ hình ảnh!` });
        setLoading(false);
        return;
      }
    }
    try {
      // fake call API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage({ 
        type: 'success', 
        text: 'Gửi yêu cầu xác thực thành công! Chúng tôi sẽ xem xét trong vòng 2-3 ngày làm việc.' 
      });
      // Reset form
      setVerificationData({
        cccdNumber: '',
        blxNumber: '',
        fullName: '',
        dateOfBirth: '',
        gender: '',
        cccdFrontImage: null,
        cccdBackImage: null,
        blxFrontImage: null,
        blxBackImage: null
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      {/* msg thông báo */}
      {message.text && (
        <div className={`m-6 p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message.text}
          </div>
        </div>
      )}
      {/* render nếu trạng thái xác thực là verified hoặc pending */}
      {(verificationStatus === 'verified' || verificationStatus === 'pending') && (
        <VerificationStatusDisplay status={verificationStatus} />
      )}
      {/* Nếu chưa bắt đầu xác thực, hiển thị form */}
      {verificationStatus === 'not_started' && (
        <div className="p-10 space-y-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Xác thực tài khoản</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Để sử dụng đầy đủ các tính năng của hệ thống, bạn cần xác thực danh tính bằng CCCD và Bằng lái xe
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmitVerification} className="space-y-10">
            {/* Personal Information Form */}
            <PersonalInfoForm 
              verificationData={verificationData}
              handleInputChange={handleInputChange}
            />
            {/* Document Upload Section */}
            <DocumentUploadSection 
              verificationData={verificationData}
              handleFileChange={handleFileChange}
            />
            {/* Guidelines */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-2">📋 Hướng dẫn chụp ảnh:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Chụp ảnh rõ nét, đầy đủ 4 góc của giấy tờ</li>
                    <li>Không bị mờ, nhòe hoặc chói sáng</li>
                    <li>Thông tin trên giấy tờ phải khớp với thông tin đã nhập</li>
                    <li>File ảnh có định dạng JPG, PNG và không quá 5MB</li>
                    <li>Quá trình xác thực mất 2-3 ngày làm việc</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-medium cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading && (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>Gửi yêu cầu xác thực</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
