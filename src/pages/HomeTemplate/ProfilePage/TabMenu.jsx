import React from 'react';

export default function TabMenu({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: 'personal',
      label: 'Thông tin cá nhân',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: 'Quản lý thông tin và mật khẩu'
    },
    {
      id: 'verification',
      label: 'Xác thực tài khoản',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Xác thực danh tính và tài khoản'
    }
  ];

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Cài đặt tài khoản</h3>
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-4 rounded-lg transition-all duration-200 cursor-pointer group ${
              activeTab === tab.id
                ? 'bg-green-100 border border-green-200 text-green-800 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className={`mt-0.5 transition-colors ${
                activeTab === tab.id ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
              }`}>
                {tab.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${
                  activeTab === tab.id ? 'text-green-900' : 'text-gray-900 group-hover:text-gray-900'
                }`}>
                  {tab.label}
                </div>
                <div className={`text-xs mt-1 ${
                  activeTab === tab.id ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-600'
                }`}>
                  {tab.description}
                </div>
              </div>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};