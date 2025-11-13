import { formatDate, getStatusBadgeClass } from '../../../data/mockContractDetails';

export default function ContractHeader({ contract, onSignContract }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Nút ký hợp đồng điện tử */}
          {contract.status === 'pending_contract' && contract.otpRequired && (
            <button 
              onClick={onSignContract}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl text-sm flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Ký hợp đồng điện tử
            </button>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(contract.status)}`}>
            {contract.statusText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-1">Mã đơn hàng</h3>
          <p className="text-lg font-bold text-gray-900">{contract.orderCode}</p>
        </div>
        
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-1">Số hợp đồng</h3>
          <p className="text-lg font-bold text-gray-900">{contract.contractNumber}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-1">Ngày ký</h3>
          <p className="text-sm text-gray-900">
            {contract.signDate ? formatDate(contract.signDate) : 'Chưa ký'}
          </p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-1">Thời gian</h3>
          <p className="text-sm text-gray-900">{contract.rental.totalDays} ngày</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-1">Hình thức thuê</h3>
          <p className="text-sm text-gray-900">{contract.rental.rentalType === "days" ? "Theo ngày" : contract.rental.rentalType === "weeks" ? "Theo tuần" : "Theo tháng"}</p>
        </div>
      </div>
      {contract.notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-xs font-medium text-gray-500 mb-2">Ghi chú</h4>
          <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{contract.notes}</p>
        </div>
      )}
    </div>
  );
};