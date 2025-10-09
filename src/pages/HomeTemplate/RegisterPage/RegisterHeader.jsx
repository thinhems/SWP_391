export default function RegisterHeader() {
  return (
    <div className="text-center mb-2">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Tạo tài khoản mới</h2>
      <p className="text-gray-600">Đăng ký để bắt đầu trải nghiệm dịch vụ của chúng tôi</p>
    </div>
  );
}