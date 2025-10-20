import React from 'react';
import { formatCurrency, formatDate } from '../../../data/mockContractDetails';

export default function RentalPaymentInfo({ contract }) {
  return (
    <div className="space-y-4">
      {/* Thông tin thuê xe */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Thông tin thuê xe</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-1 border-b border-green-100">
            <span className="text-gray-600 text-sm">Ngày nhận xe:</span>
            <span className="font-medium text-gray-900 text-sm">{formatDate(contract.rental.startDate)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-green-100">
            <span className="text-gray-600 text-sm">Ngày trả xe:</span>
            <span className="font-medium text-gray-900 text-sm">{formatDate(contract.rental.endDate)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-green-100">
            <span className="text-gray-600 text-sm">Tổng số ngày:</span>
            <span className="font-medium text-gray-900 text-sm">{contract.rental.totalDays} ngày</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-green-100">
            <span className="text-gray-600 text-sm">Km/ngày:</span>
            <span className="font-medium text-gray-900 text-sm">{contract.rental.maxKmPerDay} km</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600 text-sm">Địa điểm:</span>
            <span className="font-medium text-gray-900 text-sm">{contract.pickupLocation}</span>
          </div>
        </div>
      </div>
      {/* Thông tin thanh toán */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Thông tin thanh toán</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-1 border-b border-green-100">
            <span className="text-gray-600 text-sm">Giá thuê/ngày:</span>
            <span className="font-medium text-gray-900 text-sm">{formatCurrency(contract.rental.pricePerDay)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-green-100">
            <span className="text-gray-600 text-sm">Tổng tiền thuê:</span>
            <span className="font-medium text-gray-900 text-sm">{formatCurrency(contract.rental.totalCost)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-green-100">
            <span className="text-gray-600 text-sm">Tiền cọc:</span>
            <span className="font-medium text-gray-900 text-sm">{formatCurrency(contract.rental.deposit)}</span>
          </div>
          {/* các khoản phí phát sinh */}
          {(contract.mileage.overageFee > 0 || contract.battery.deficitFee > 0) && (
            <div className="pt-2 border-t border-green-100">
              <p className="text-xs font-medium text-gray-700 mb-1">Phí phát sinh:</p>
              {contract.mileage.overageFee > 0 && (
                <div className="flex justify-between items-center py-0.5 text-xs">
                  <span className="text-gray-600">Phí vượt km ({contract.mileage.overage} km):</span>
                  <span className="font-medium text-red-600">{formatCurrency(contract.mileage.overageFee)}</span>
                </div>
              )}
              {contract.battery.deficitFee > 0 && (
                <div className="flex justify-between items-center py-0.5 text-xs">
                  <span className="text-gray-600">Phí thiếu pin ({contract.battery.deficit}%):</span>
                  <span className="font-medium text-red-600">{formatCurrency(contract.battery.deficitFee)}</span>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-t border-green-100 bg-green-50 -mx-4 px-4 rounded-b-lg">
            <span className="text-base font-semibold text-gray-900">Tổng cộng:</span>
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(contract.payment.finalAmount || contract.rental.grandTotal)}
            </span>
          </div>
        </div>
      </div>
      {/* Bảng phí & Quy định */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h3 className="text-base font-semibold text-gray-900">Bảng phí & Quy định</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <svg className="w-3 h-3 text-orange-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h4 className="font-semibold text-orange-900 text-sm">Vượt km</h4>
            </div>
            <p className="text-lg font-bold text-orange-700 mb-0.5">
              {formatCurrency(contract.rental.kmOverageFee)}
            </p>
            <p className="text-xs text-orange-600">/km vượt</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <svg className="w-3 h-3 text-red-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h4 className="font-semibold text-red-900 text-sm">Thiếu pin</h4>
            </div>
            <p className="text-lg font-bold text-red-700 mb-0.5">
              {formatCurrency(contract.rental.batteryDeficitFee)}
            </p>
            <p className="text-xs text-red-600">/% thiếu</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start">
            <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1 text-sm">Lưu ý</h4>
              <ul className="text-xs text-blue-800 space-y-0.5">
                <li>• Phí tính tự động khi trả xe</li>
                <li>• Hoàn cọc sau khi trừ phí</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};