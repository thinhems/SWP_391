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
          {!car?.images || car?.images.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 font-medium">Chưa có ảnh xe</p>
              <p className="text-gray-500 text-sm mt-1">Chưa có hình ảnh cho xe này</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {car.images.slice(0, 4).map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer" onClick={() => {
                  setIndex(index);
                  setOpen(true);
                }}>
                  <div className="aspect-w-16 aspect-h-12">
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                      <img 
                        src={image} 
                        alt={`${car?.modelName} - Ảnh ${index + 1}`}
                        className="w-full h-full object-cover"/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
				{/* lightbox show ảnh */}
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					index={index}
					plugins={[Zoom]}
					slides={car?.images?.map((src) => ({ src }))}
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
                  <p className="font-semibold text-gray-900">{car?.modelName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Biển số:</p>
                  <p className="font-bold text-red-600 text-lg">{car?.plateNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Màu sắc:</p>
                  <p className="font-semibold text-gray-900">{car?.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vị trí hiện tại:</p>
                  <p className="font-semibold text-blue-600">{car?.location}</p>
                </div>
              </div>
            </div>
            {/* tình trạng xe */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-3">Tình trạng hiện tại</h5>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-blue-700">Mức pin:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBatteryColor(car?.batteryLevel)}`}>
                    {car?.batteryLevel}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${getBatteryBarColor(car?.batteryLevel)}`}
                    style={{ width: `${car?.batteryLevel}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700">Số km đã chạy:</span>
                <span className="font-semibold text-blue-900">{car?.odometer?.toLocaleString()} km</span>
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
            <div className="text-gray-800 font-bold">{car?.specifications?.chargingTime}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-gray-600 font-semibold text-sm">Công suất</div>
            <div className="text-gray-800 font-bold">{car?.specifications?.chargePower} kW</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-gray-600 font-semibold text-sm">Số ghế</div>
            <div className="text-gray-800 font-bold">{car?.specifications?.seat} chỗ</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-gray-600 font-semibold text-sm">Hộp số</div>
            <div className="text-gray-800 font-bold">Tự Động</div>
          </div>
        </div>
      </div>
			
    </div>
  );
}