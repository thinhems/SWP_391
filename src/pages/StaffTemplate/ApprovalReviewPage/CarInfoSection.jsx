import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
export default function CarInfoSection({ car }) {
	const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
	// hàm lấy màu pin
  const getBatteryColor = (battery) => {
    if (battery >= 80) return 'text-green-600 bg-green-100';
    if (battery >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
	// hàm lấy màu thanh pin
  const getBatteryBarColor = (battery) => {
    if (battery >= 80) return 'bg-green-500';
    if (battery >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 000-6m-9 6V9a9 9 0 019-9h6a9 9 0 019 9v6a9 9 0 01-9 9H9a9 9 0 01-9-9z" />
        </svg>
        Thông tin xe
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ảnh xe */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Hình ảnh xe</h4>
          <div className="grid grid-cols-2 gap-3">
            {car.images && car.images.slice(0, 4).map((image, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden" onClick={() => {
                setIndex(index);
                setOpen(true);
              }}>
                <div className="aspect-w-16 aspect-h-12">
                  <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
										<img 
											src={image} 
											alt={`${car.model} - Ảnh ${index + 1}`}
											className="w-full h-full object-cover"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
				{/* lightbox show ảnh */}
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					index={index}
					plugins={[Zoom]}
					slides={car.images.map((src) => ({ src }))}
					styles={{
						container: {
							backgroundColor: "rgba(0, 0, 0, 0.7)", // nền sáng
						},
					}}
				/>

        {/* thông tin chi tiết */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Chi tiết xe</h4>
          <div className="space-y-4">
            {/* thông tin cơ bản */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Model:</p>
                  <p className="font-semibold text-gray-900">{car.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Biển số:</p>
                  <p className="font-bold text-red-600 text-lg">{car.licensePlate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Màu sắc:</p>
                  <p className="font-semibold text-gray-900">{car.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Năm sản xuất:</p>
                  <p className="font-semibold text-gray-900">{car.year}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Vị trí hiện tại:</p>
                <p className="font-semibold text-blue-600">{car.location}</p>
              </div>
            </div>

            {/* tình trạng xe */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-3">Tình trạng hiện tại</h5>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-blue-700">Mức pin:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBatteryColor(car.battery)}`}>
                    {car.battery}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${getBatteryBarColor(car.battery)}`}
                    style={{ width: `${car.battery}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Số km đã chạy:</span>
                <span className="font-semibold text-blue-900">{car.odometer?.toLocaleString()} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* thông số kỹ thuật */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Thông số kỹ thuật</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-gray-600 font-semibold text-sm">Sạc nhanh</div>
            <div className="text-gray-800 font-bold">{car.specifications?.chargingTime}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-gray-600 font-semibold text-sm">Công suất</div>
            <div className="text-gray-800 font-bold">{car.specifications?.power}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-gray-600 font-semibold text-sm">Số ghế</div>
            <div className="text-gray-800 font-bold">{car.specifications?.seats} chỗ</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-gray-600 font-semibold text-sm">Hộp số</div>
            <div className="text-gray-800 font-bold">{car.specifications?.transmission}</div>
          </div>
        </div>
      </div>
			
    </div>
  );
}