import { useNavigate } from 'react-router-dom';
import { useCars } from '../../../contexts/CarsContext';
import { useCustomers } from '../../../contexts/CustomersContext';
import { useActivities } from '../../../contexts/ActivitiesContext';
import StatsCards from './StatsCards';
import QuickActions from './QuickActions';
import RecentActivities from './RecentActivities';

export default function OverviewPage() {
  const navigate = useNavigate();
  const { carsData, loading: carsLoading, error: carsError, fetchCars } = useCars();
  const { customersData, loading: customersLoading, error: customersError } = useCustomers();
  const { activities } = useActivities();

  const loading = carsLoading || customersLoading;
  const error = carsError || customersError;

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
          onClick={fetchCars}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Thử lại
        </button>
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