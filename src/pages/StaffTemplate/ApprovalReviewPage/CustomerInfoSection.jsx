import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function CustomerInfoSection({ customer }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // gom tất cả ảnh (CCCD + BLX) vào 1 mảng
  const allImages = [
    ...(customer?.idCardImages || []),
    ...(customer?.idLicenseImages || []),
  ].filter(Boolean); // bỏ null/undefined

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Thông tin khách hàng
      </h2>

      {/* thông tin khách hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* avatar */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center overflow-hidden">
              {customer?.avatar ? (
                <img
                  src={customer?.avatar}
                  alt={customer?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {customer?.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{customer?.email}</p>
          </div>
        </div>

        {/* thông tin liên hệ */}
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-gray-800 mb-4">Thông tin liên hệ</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm text-gray-900">{customer?.phone}</span>
            </div>
            <div className="flex items-start">
              <svg
                className="w-4 h-4 text-gray-500 mr-3 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm text-gray-900">{customer?.address}</span>
            </div>
          </div>
        </div>

        {/* thông tin id giấy tờ */}
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-gray-800 mb-4">Giấy tờ tùy thân</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Số CCCD/CMND:</p>
              <p className="text-sm font-medium text-gray-900">
                {customer?.idCard}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bằng lái xe:</p>
              <p className="text-sm font-medium text-gray-900">
                {customer?.driverLicense}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ảnh giấy tờ */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Ảnh CCCD/BLX</h4>
        {allImages.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600 font-medium">Không có ảnh giấy tờ</p>
            <p className="text-gray-500 text-sm mt-1">Khách hàng chưa tải lên ảnh CCCD/BLX</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allImages.map((image, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
              >
                <div className="aspect-w-16 aspect-h-10">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={image}
                      alt={`Giấy tờ ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">
                    {idx < (customer?.idCardImages?.length || 0)
                      ? `CCCD - ${idx === 0 ? "Mặt trước" : "Mặt sau"}`
                      : `BLX - ${
                          idx - (customer?.idCardImages?.length || 0) === 0
                            ? "Mặt trước"
                            : "Mặt sau"
                        }`}
                  </p>
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
				slides={allImages.map((src) => ({ src }))}
				styles={{
					container: {
						backgroundColor: "rgba(0, 0, 0, 0.7)", // nền sáng
					},
				}}
			/>
    </div>
  );
}
