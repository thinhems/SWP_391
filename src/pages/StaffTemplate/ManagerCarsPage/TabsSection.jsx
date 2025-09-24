

export default function TabsSection({ activeTab, setActiveTab, cars }) {
  const tabs = [
    { id: 'available', label: 'Xe có sẵn', count: cars.available.length },
    { id: 'booked', label: 'Xe đã đặt', count: cars.booked.length },
    { id: 'rented', label: 'Xe đang thuê', count: cars.rented.length }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex justify-center space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className="mt-1 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-600">{tab.count}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

