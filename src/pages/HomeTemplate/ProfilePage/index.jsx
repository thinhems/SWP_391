import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TabMenu from './TabMenu';
import PersonalInfo from './PersonalInfo';
import AccountVerification from './AccountVerification';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // lấy tab từ URL hoặc mặc định là 'personal'
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = searchParams.get('tab');
    return tabFromUrl && ['personal', 'verification'].includes(tabFromUrl) 
      ? tabFromUrl 
      : 'personal';
  });

  // update url khi tab thay đổi
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };
  // Nếu chưa đăng nhập, chuyển đến trang login
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // đồng bộ tab với URL khi URL thay đổi (ví dụ khi người dùng sử dụng nút back/forward của trình duyệt)
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['personal', 'verification'].includes(tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    } else if (!tabFromUrl && activeTab !== 'personal') {
      setActiveTab('personal');
    }
  }, [searchParams]);

  // đảm bảo luôn có tab trong URL
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (!tabFromUrl) {
      setSearchParams({ tab: 'personal' }, { replace: true });
    }
  }, []);

  // hiển thị loading khi đang kiểm tra authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
                  Quản lý thông tin cá nhân và tài khoản của bạn
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* main content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex">
            {/* Sidebar Tab Menu */}
            <div className="w-80 bg-gray-50 border-r border-gray-200">
              <TabMenu activeTab={activeTab} setActiveTab={handleTabChange} />
            </div>
            {/* Content Area */}
            <div className="flex-1 min-h-[700px]">
              {activeTab === 'personal' && <PersonalInfo user={user} />}
              {activeTab === 'verification' && <AccountVerification user={user} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};