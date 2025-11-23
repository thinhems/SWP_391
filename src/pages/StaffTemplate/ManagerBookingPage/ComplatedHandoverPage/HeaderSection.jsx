import React from 'react'

export default function HeaderSection( {onNavigateBack} ) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 flex items-center">
						<svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
						</svg>
						Nhận xe trả - Thanh toán
					</h1>
					<p className="text-gray-600 mt-2">
						Kiểm tra xe và tính toán các khoản phí khi khách hàng trả xe
					</p>
				</div>
				<button
					onClick={onNavigateBack}
					className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2 cursor-pointer"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					<span>Quay lại trang quản lý</span>
				</button>
			</div>
		</div>
  )
}
