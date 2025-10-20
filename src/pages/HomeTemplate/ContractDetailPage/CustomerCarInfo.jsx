import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function CustomerCarInfo({ contract }) {
  const [activeTab, setActiveTab] = useState('customer');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  // gom tất cả ảnh (CCCD + BLX) vào 1 mảng
  const allImages = [
    ...(contract.customer.idCardImages || []),
    ...(contract.customer.licenseImages || []),
  ].filter(Boolean); // bỏ null/undefined
  return (
    <div className="space-y-6">
      {/* render tab */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('customer')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'customer'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-green-200'
              }`}
            >
              Thông tin khách hàng
            </button>
            <button
              onClick={() => setActiveTab('car')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'car'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-green-200'
              }`}
            >
              Thông tin xe
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-green-200'
              }`}
            >
              Giấy tờ
            </button>
          </nav>
        </div>
        <div className="p-6">
          {/* tab customer */}
          {activeTab === 'customer' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Số điện thoại</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{contract.customer.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{contract.customer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">CCCD/CMND</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{contract.customer.idCard}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Bằng lái xe</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{contract.customer.driverLicense}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-2">Địa chỉ</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{contract.customer.address}</p>
                </div>
              </div>
            </div>
          )}
          {/* tab car */}
          {activeTab === 'car' && (
            <div className="space-y-6">
              {/* show ảnh xe */}
              <div className="h-96 lg:h-[450px]">
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
                        contract.car.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${contract.car.model} thumbnail ${index + 1}`}
                            className="w-15 h-10 object-cover rounded border-2 border-transparent hover:border-green-300 transition-all duration-300 cursor-pointer p-1"
                          />
                        ))
                      }
                    >
                      {contract.car.images.map((image, index) => (
                        <div key={index} className="h-72 lg:h-80 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`${contract.car.model} ${index + 1}`}
                            className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              </div>
              {/* thông số kỹ thuật */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{contract.car.model}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Biển số:</span>
                      <span className="font-medium text-gray-900">{contract.car.licensePlate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Màu sắc:</span>
                      <span className="font-medium text-gray-900">{contract.car.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Năm sản xuất:</span>
                      <span className="font-medium text-gray-900">{contract.car.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vị trí:</span>
                      <span className="font-medium text-gray-900">{contract.car.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Số chỗ ngồi:</span>
                      <span className="font-medium text-gray-900">{contract.car.specifications.seats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Công suất:</span>
                      <span className="font-medium text-gray-900">{contract.car.specifications.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hộp số:</span>
                      <span className="font-medium text-gray-900">{contract.car.specifications.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Thời gian sạc:</span>
                      <span className="font-medium text-gray-900">{contract.car.specifications.chargingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* thông tin quãng đường + pin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Quãng đường</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Số km ban đầu:</span>
                      <span className="font-medium text-green-900">
                        {contract.mileage.initial ? contract.mileage.initial.toLocaleString() : 'N/A'} km
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Giới hạn chạy tối đa cho phép:</span>
                      <span className="font-medium text-green-900">
                        ({contract.rental.totalDays} x {contract.rental.maxKmPerDay}) {contract.rental.totalMaxKm} km</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Pin điện</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Pin ban đầu:</span>
                      <span className="font-medium text-green-900">
                        {contract.battery.initial ? contract.battery.initial : 'N/A'}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Vui lòng trả xe bằng với số pin giao Xe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* tab blx-cccd */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">CCCD/CMND</h4>
                  <div className="space-y-4">
                    {contract.customer.idCardImages.map((image, index) => (
                      <div key={index} 
                        className="border border-green-100 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => {
                          setIndex(index);
                          setOpen(true);
                      }}>
                        <img 
                          src={image} 
                          alt={`CCCD ${index === 0 ? 'mặt trước' : 'mặt sau'}`}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-3 bg-green-50">
                          <p className="text-sm font-medium text-gray-900">
                            {index === 0 ? 'Mặt trước' : 'Mặt sau'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Bằng lái xe</h4>
                  <div className="space-y-4">
                    {contract.customer.licenseImages.map((image, index) => (
                      <div key={contract.customer.idCardImages.length +index} 
                        className="border border-green-100 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => {
                          setIndex(contract.customer.idCardImages.length + index);
                          setOpen(true);
                      }}>
                        <img 
                          src={image} 
                          alt={`Bằng lái ${index === 0 ? 'mặt trước' : 'mặt sau'}`}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-3 bg-green-50">
                          <p className="text-sm font-medium text-gray-900">
                            {index === 0 ? 'Mặt trước' : 'Mặt sau'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* lightbox show ảnh */}
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            plugins={[Zoom]}
            slides={allImages.map((src) => ({ src }))}
            styles={{
              container: {
                backgroundColor: "rgba(0, 0, 0, 0.7)", // nền sáng
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};