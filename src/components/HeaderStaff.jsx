import { useAuth } from "../contexts/AuthContext";

export default function HeaderStaff({onToggleSidebar}) {
  const { user } = useAuth();
  const stationName = [
    { id: 1, name:"Quận 1"},
    { id: 2, name:"Quận 7"},
    { id: 3, name:"Quận 9"},
    { id: 4, name:"Bình Thạnh"}
  ]

  // Lấy tên trạm dựa theo user.station
  const currentStation = stationName.find(station => station.id === user?.station);
  const displayStationName = currentStation?.name || 'Chưa có trạm';
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Staff Panel</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col text-sm text-gray-600 text-right">
            <span>Trạm: <span className="font-medium text-green-600">{displayStationName}</span></span>
            <span>Email: <span className="font-medium text-gray-800">{user.email}</span></span>
          </div>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{user.name ? user.name[0].toUpperCase() : "U"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

