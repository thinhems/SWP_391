import FileUploadBox from '../../../../components/FileUploadBox';

export default function DocumentUploadSection({ verificationData, handleFileChange }) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Tải lên hình ảnh giấy tờ
      </h4>
      {/* ảnh CCCD */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h5 className="font-medium text-blue-900 mb-4">📄 Căn cước công dân (CCCD)</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadBox
            id="cccdFront"
            label="Mặt trước CCCD *"
            file={verificationData.cccdFrontImage}
            onChange={(e) => handleFileChange(e, 'cccdFrontImage')}
          />
          <FileUploadBox
            id="cccdBack"
            label="Mặt sau CCCD *"
            file={verificationData.cccdBackImage}
            onChange={(e) => handleFileChange(e, 'cccdBackImage')}
          />
        </div>
      </div>
      {/* ảnh BLX */}
      <div className="bg-green-50 rounded-lg p-6">
        <h5 className="font-medium text-green-900 mb-4">🚗 Bằng lái xe (BLX)</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadBox
            id="blxFront"
            label="Mặt trước BLX *"
            file={verificationData.blxFrontImage}
            onChange={(e) => handleFileChange(e, 'blxFrontImage')}
          />
          <FileUploadBox
            id="blxBack"
            label="Mặt sau BLX *"
            file={verificationData.blxBackImage}
            onChange={(e) => handleFileChange(e, 'blxBackImage')}
          />
        </div>
      </div>
    </div>
  );
};