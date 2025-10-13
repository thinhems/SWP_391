// src/pages/StaffTemplate/CustomerVerificationPage/CustomerDocumentsSection.jsx
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function CustomerDocumentsSection({ customer }) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // tất cả ảnh để hiển thị trong Lightbox
  const allImages = [
    ...(customer.idCardImages || []),
    ...(customer.idLicenseImages || [])
  ].filter(Boolean);

  // xử lý mở ảnh
  const handleOpenImage = (index) => {
    setPhotoIndex(index);
    setOpen(true);
  };

  return (
    <>
      {/* giấy tờ tùy thân */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Giấy tờ tùy thân
        </h2>
        <div className="space-y-6">
          {/* CCCD */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Căn cước công dân (CCCD)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.idCardImages.map((image, idx) => (
                <div
                  key={idx}
                  className="border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleOpenImage(idx)}
                >
                  <div className="aspect-w-16 aspect-h-10">
                    <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                      <img src={image} alt={`CCCD ${idx === 0 ? 'Mặt trước' : 'Mặt sau'}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">CCCD - {idx === 0 ? 'Mặt trước' : 'Mặt sau'}</p>
                    <p className="text-xs text-gray-600 mt-1">Click để xem phóng to</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* bằng lái xe */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Bằng lái xe (BLX)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.idLicenseImages.map((image, idx) => (
                <div
                  key={idx}
                  className="border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => handleOpenImage(customer.idCardImages.length + idx)}
                >
                  <div className="aspect-w-16 aspect-h-10">
                    <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                      <img src={image} alt={`BLX ${idx === 0 ? 'Mặt trước' : 'Mặt sau'}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">BLX - {idx === 0 ? 'Mặt trước' : 'Mặt sau'}</p>
                    <p className="text-xs text-gray-600 mt-1">Click để xem phóng to</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* lightbox show ảnh*/}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        plugins={[Zoom]}
        slides={allImages.map((src) => ({ src }))}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
        }}
      />
    </>
  );
}