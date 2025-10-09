import { Link } from 'react-router-dom';

export default function LoginHeader() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      {/* Welcome Text */}
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Chào mừng trở lại
        </h2>
        <p className="text-gray-600">
          Đăng nhập vào tài khoản của bạn để tiếp tục
        </p>
      </div>
    </div>
  );
}