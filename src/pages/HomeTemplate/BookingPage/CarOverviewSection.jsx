
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCar, faBatteryFull, faSuitcase, faGears, faShield, faBolt, faGaugeHigh } from "@fortawesome/free-solid-svg-icons";

export default function CarOverviewSection({ carModel, activeTab, selectedLocation, availableCount, handleBookingClick }) {
  const isOutOfStock = availableCount === 0;
  // Kiểm tra trạng thái đăng nhập và xác thực từ localStorage
  const checkUserStatus = () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return { type: 'no_user', message: 'Vui lòng đăng nhập' };
    }
    
    try {
      const user = JSON.parse(userString);
      if (!user.isVerified || user.isVerified === 'not_started' || user.isVerified === 'pending') {
        return { type: 'not_verified', message: 'Tài khoản chưa xác thực' };
      }
      return { type: 'verified', message: 'Đặt xe' };
    } catch (error) {
      return { type: 'no_user', message: 'Vui lòng đăng nhập' };
    }
  };

  const userStatus = checkUserStatus();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* hình ảnh xe */}
      <div className="p-6 h-96 lg:h-[450px]">
        <div className="h-full relative">
          <div className="[&_.carousel_.thumbs-wrapper]:flex [&_.carousel_.thumbs-wrapper]:justify-center [&_.carousel_.thumbs-wrapper]:mt-4 [&_.carousel_.thumbs]:flex [&_.carousel_.thumbs]:justify-center [&_.carousel_.thumbs]:gap-2 [&_.carousel_.thumbs_.thumb]:border-0 [&_.carousel_.thumbs_.thumb]:!border-0 [&_.carousel_.thumbs_.thumb.selected_img]:!border-2 [&_.carousel_.thumbs_.thumb.selected_img]:!border-green-500 [&_.carousel_.thumbs_.thumb.selected_img]:shadow-lg [&_.carousel_.thumbs_.thumb.selected_img]:scale-105">
            <Carousel
              showArrows={true}
              showThumbs={true}
              showStatus={false}
              infiniteLoop={true}
              autoPlay={false}
              interval={4000}
              swipeable={true}
              emulateTouch={true}
              showIndicators={true}
              thumbWidth={60}
              className="h-full"
              renderArrowPrev={(onClickHandler, hasPrev) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-300 opacity-60 hover:opacity-100"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-300 opacity-60 hover:opacity-100"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )
              }
              renderIndicator={(onClickHandler, isSelected, index) => (
                <button
                  type="button"
                  onClick={onClickHandler}
                  className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                    isSelected 
                      ? 'bg-green-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              )}
              renderThumbs={() =>
                carModel.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${carModel.name} thumbnail ${index + 1}`}
                    className="w-15 h-10 object-cover rounded border-2 border-transparent hover:border-green-300 transition-all duration-300 cursor-pointer p-1"
                  />
                ))
              }
            >
              {carModel.images.map((image, index) => (
                <div key={index} className="h-72 lg:h-80 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${carModel.name} ${index + 1}`}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      {/* thông số xe */}
      <div className=" p-6 h-96 lg:h-[450px]">
        <div className="h-full flex flex-col">
          {/* tên xe + giá */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-5xl font-bold text-gray-900">{carModel.name}</h1>
              {selectedLocation && isOutOfStock && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                  Hết xe
                </span>
              )}
            </div>
            <div className={`text-3xl font-bold mb-1 ${isOutOfStock && selectedLocation ? 'text-gray-400' : 'text-green-500'}`}>
              {carModel.price[activeTab].toLocaleString('vi-VN')} 
              <span className="text-lg font-medium text-gray-500 ml-1">
                VNĐ/{activeTab === 'daily' ? 'ngày' : activeTab === 'weekly' ? 'tuần' : 'tháng'}
              </span>
            </div>
          </div>
          {/* thông số kỹ thuật*/}
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thông số kỹ thuật</h3>
            <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBatteryFull} className="text-gray-500 mt-1 flex-shrink-0"/>
                <span className="font-semibold text-gray-500 text-sm">{carModel.specifications.range}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-500 mt-1 flex-shrink-0"/>
                <span className="font-semibold text-gray-500 text-sm">{carModel.specifications.seats} chỗ</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faGears} className="text-gray-500 mt-1 flex-shrink-0"/>
                <span className="font-semibold text-gray-500 text-sm">{carModel.specifications.transmission}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCar} className="text-gray-500 mt-1 flex-shrink-0"/>
                <span className="font-semibold text-gray-500 text-sm">{carModel.specifications.carModel}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faShield} className="text-gray-500 mt-1 flex-shrink-0"/>
                <span className="font-semibold text-gray-500 text-sm">{carModel.specifications.airbags}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faSuitcase} className="text-gray-500 mt-1 flex-shrink-0"/>
                <span className="font-semibold text-gray-500 text-sm">{carModel.specifications.trunkCapacity}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBolt} className="text-gray-500 mt-1 flex-shrink-0"/>
                <span className="font-semibold text-gray-500 text-sm">{carModel.specifications.maxPower}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faGaugeHigh} className="text-gray-500 mt-1 flex-shrink-0"/>
                <span className="font-semibold text-gray-500 text-sm">Giới hạn di chuyển {carModel.specifications.limitKm} km/ngày</span>
              </div>
            </div>
            {/* Nút đặt xe */}
            <div className="mt-auto">
              <button
                disabled={isOutOfStock || userStatus.type !== 'verified' || !selectedLocation}
                onClick={handleBookingClick}
                className={`w-full py-4 px-6 text-lg font-bold rounded-lg shadow-lg transition-all duration-200 transform ${
                  isOutOfStock || userStatus.type !== 'verified' || !selectedLocation
                    ? 'bg-gray-400 text-gray-500 cursor-not-allowed'
                    : 'hover:scale-105 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-200 cursor-pointer'
                }`}
              >
                {isOutOfStock ? 'Hết xe' : !selectedLocation ? 'Chọn điểm thuê xe' : userStatus.message}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
