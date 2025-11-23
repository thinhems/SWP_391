import { useNavigate } from 'react-router-dom';

export default function TabsSection({ activeTab, setActiveTab, bookings }) {
  const navigate = useNavigate();

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/staff/manage-bookings?tab=${newTab}`);
  };
  
  // mảng tab để render
  const tabs = [
    { id: 'pending_approval', label: 'Chờ phê duyệt', count: bookings.pending_approval.length },
    { id: 'pending_contract', label: 'Chờ ký hợp đồng', count: bookings.pending_contract.length },
    { id: 'pending_handover', label: 'Chờ bàn giao', count: bookings.pending_handover.length },
    { id: 'rented', label: 'Đang thuê', count: bookings.rented.length }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex justify-center space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`cursor-pointer py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};