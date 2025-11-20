import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCars } from '../../../contexts/CarsContext';
import { useCustomers } from '../../../contexts/CustomersContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import { useAuth } from '../../../contexts/AuthContext';
import StatsCards from './StatsCards';
import QuickActions from './QuickActions';
import RecentActivities from './RecentActivities';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { carsData, loading: carsLoading, error: carsError, setUserStation } = useCars();
  const { customersData, loading: customersLoading, error: customersError } = useCustomers();
  const { activities } = useActivities();
  const { user } = useAuth();

  // Set userStation trong CarsContext khi user thay đổi
  useEffect(() => {
    if (user?.station) {
      setUserStation(user.station);
    }
  }, [user?.station, setUserStation]);

  const loading = carsLoading || customersLoading;
  const error = carsError || customersError;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-green-600"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Đang tải dữ liệu tổng quan</p>
          <p className="text-sm text-gray-500 mt-1">Vui lòng đợi...</p>
        </div>
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
        <p className="text-gray-600 mb-4">{typeof error === 'string' ? error : 'Không thể tải dữ liệu. Vui lòng thử lại.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsCards carsData={carsData} customersData={customersData} />
      <QuickActions carsData={carsData} navigate={navigate} />
      <RecentActivities activities={activities} />
    </div>
  );
}