import { useNavigate } from 'react-router-dom';
import { useStaffData } from '../../../contexts/StaffDataContext';
import StatsCards from './StatsCards';
import QuickActions from './QuickActions';
import RecentActivities from './RecentActivities';
import SystemStatus from './SystemStatus';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { carsData, customersData, activities, loading, error, fetchAllData } = useStaffData();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4 border-gray-300"></div>
        <p className="mt-4 text-gray-600 font-medium text-lg">Đang tải dữ liệu tổng quan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Có lỗi xảy ra</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchAllData}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsCards 
        carsData={carsData} 
        customersData={customersData} 
      />
      <QuickActions 
        pendingApprovals={carsData.pending_approval}
        pendingContracts={carsData.pending_contract}
        navigate={navigate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities activities={activities} />
        </div>
        <div className="lg:col-span-1">
          <SystemStatus carsData={carsData} />
        </div>
      </div>
    </div>
  );
}