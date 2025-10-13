import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCar, faUsers, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
export default function StaffSidebar({ isOpen }) {
  const location = useLocation();
  const { logout } = useAuth(); 

  const menuItems = [
    {
      name: 'Tổng quan',
      path: '/staff',
      icon: (
        <FontAwesomeIcon icon={faHouse} />
      )
    },
    {
      name: 'Quản lý xe',
      path: '/staff/manage-cars?tab=available',
      icon: (
        <FontAwesomeIcon icon={faCar} />
      )
    },
    {
      name: 'Quản lý khách hàng',
      path: '/staff/manage-customer',
      icon: (
        <FontAwesomeIcon icon={faUsers} />
      )
    }
  ];

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path !== '/staff' && location.pathname.startsWith(path)) ||
      (path.startsWith('/staff/manage-cars') && location.pathname.startsWith('/staff/manage-cars'))
    );
  };


  return (
    <div className="h-full bg-gray-800 text-white relative">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          {isOpen && (
            <div>
              <h2 className="text-lg font-semibold">Green Future</h2>
              <p className="text-xs text-gray-300">Staff Portal</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200 ${
                  isActive(item.path) 
                    ? 'bg-green-600 text-white border-r-4 border-green-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
                title={!isOpen ? item.name : ''}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3 font-medium">{item.name}</span>}
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              {isOpen && <span className="ml-3 font-medium">Logout</span>}
            </button>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium">Trực tuyến</p>
              <p className="text-xs text-gray-400">Ca làm việc: 8:00 - 17:00</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
