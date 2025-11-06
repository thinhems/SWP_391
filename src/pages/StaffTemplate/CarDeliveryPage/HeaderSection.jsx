import React from 'react'

export default function HeaderSection( { carData, carId, currentStep, steps, onNavigateBack }) {
	return (
		<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
			{/* header */}
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Thủ tục giao xe điện</h1>
					<div className="mt-1 flex items-center space-x-4">
						<p className="text-gray-600">
							Xe {carData?.modelName} - Biển số <span className="font-bold text-red-600">{carData?.plateNumber}</span>
						</p>
						<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
							ID: {carId}
						</span>
					</div>
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
			{/* thanh step */}
			<div className="relative flex items-center justify-center">
				{steps.map((step, index) => (
					<div key={step.id} className="flex flex-col items-center mx-4">
						<div className="flex items-center">
							<div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
								currentStep >= step.id 
									? 'bg-green-600 border-green-600 text-white' 
									: currentStep === step.id
									? 'bg-blue-600 border-blue-600 text-white'
									: 'border-gray-300 text-gray-500'
							}`}>
								{currentStep > step.id ? (
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
								) : (
									<span className="text-sm font-semibold">{step.id}</span>
								)}
							</div>
							
							<div className="ml-3 flex-1">
								<p className={`text-sm font-medium ${
									currentStep >= step.id ? 'text-green-600' : currentStep === step.id ? 'text-blue-600' : 'text-gray-500'
								}`}>
									{step.title}
								</p>
								<p className="text-xs text-gray-500">{step.desc}</p>
							</div>

							{index < steps.length - 1 && (
								<div className={`flex-1 h-0.5 mx-4 ${
									currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
								}`} />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
