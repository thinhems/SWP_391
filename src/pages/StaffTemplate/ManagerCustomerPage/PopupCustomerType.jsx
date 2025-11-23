export default function PopupCustomerType({ 
  show, 
  customer, 
  onClose, 
  onClassify 
}) {
  if (!show || !customer) return null;

  const customerTypes = [
    { 
      value: 'new', 
      label: 'Khách hàng mới', 
      color: 'bg-blue-600',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
      hoverBorder: 'hover:border-blue-400'
    },
    { 
      value: 'regular', 
      label: 'Thường xuyên', 
      color: 'bg-purple-600',
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-50',
      hoverBorder: 'hover:border-purple-400'
    },
    { 
      value: 'vip', 
      label: 'VIP', 
      color: 'bg-yellow-600',
      borderColor: 'border-yellow-500',
      bgColor: 'bg-yellow-50',
      hoverBorder: 'hover:border-yellow-400'
    }
  ];

  const typeMap = { 'new': 1, 'regular': 2, 'vip': 3 };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Phân loại khách hàng</h3>
          <p className="text-sm text-gray-600 mt-1">
            {customer.fullName} - ID: {customer.id}
          </p>
        </div>
        <div className="px-6 py-4 space-y-3">
          {customerTypes.map((type) => {
            const isCurrentType = customer.cusType === typeMap[type.value];
            return (
              <button
                key={type.value}
                onClick={() => onClassify(type.value)}
                disabled={isCurrentType}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  isCurrentType 
                    ? `${type.borderColor} ${type.bgColor}` 
                    : `border-gray-200 ${type.hoverBorder} hover:bg-gray-50`
                } ${isCurrentType ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isCurrentType ? type.color : 'border-2 border-gray-300'
                  }`}>
                    {isCurrentType && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{type.label}</p>
                    {isCurrentType && (
                      <p className="text-xs text-gray-500">Loại hiện tại</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
