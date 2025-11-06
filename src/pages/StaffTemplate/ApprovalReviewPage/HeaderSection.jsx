import React from 'react'

export default function HeaderSection({carData, isProcessing, onNavigateBack}) {
	return (
		<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 flex items-center">
						<svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Duyệt yêu cầu thuê xe
					</h1>
					<div className="mt-2 flex items-center space-x-4">
						<p className="text-gray-600">
							Xe {carData?.modelName} - Biển số <span className="font-bold text-red-600">{carData?.plateNumber}</span>
						</p>
						<span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
							Chờ duyệt
						</span>
					</div>
				</div>
				<button
					onClick={onNavigateBack}
					disabled={isProcessing}
					className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 cursor-pointer ${
						isProcessing 
							? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
							: 'bg-gray-500 text-white hover:bg-gray-600'
					}`}
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
