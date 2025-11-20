import FileUploadBox from '../../../../components/FileUploadBox';

export default function DocumentUploadSection({ formik, handleFileChange }) {
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
          <div>
            <FileUploadBox
              id="cccdFront"
              label="Mặt trước CCCD *"
              file={formik.values.cccdFrontImage}
              onChange={(e) => handleFileChange(e, 'cccdFrontImage')}
            />
            {formik.touched.cccdFrontImage && formik.errors.cccdFrontImage && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.cccdFrontImage}</p>
            )}
          </div>
          <div>
            <FileUploadBox
              id="cccdBack"
              label="Mặt sau CCCD *"
              file={formik.values.cccdBackImage}
              onChange={(e) => handleFileChange(e, 'cccdBackImage')}
            />
            {formik.touched.cccdBackImage && formik.errors.cccdBackImage && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.cccdBackImage}</p>
            )}
          </div>
        </div>
      </div>
      {/* ảnh BLX */}
      <div className="bg-green-50 rounded-lg p-6">
        <h5 className="font-medium text-green-900 mb-4">🚗 Bằng lái xe (BLX)</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FileUploadBox
              id="blxFront"
              label="Mặt trước BLX *"
              file={formik.values.blxFrontImage}
              onChange={(e) => handleFileChange(e, 'blxFrontImage')}
            />
            {formik.touched.blxFrontImage && formik.errors.blxFrontImage && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.blxFrontImage}</p>
            )}
          </div>
          <div>
            <FileUploadBox
              id="blxBack"
              label="Mặt sau BLX *"
              file={formik.values.blxBackImage}
              onChange={(e) => handleFileChange(e, 'blxBackImage')}
            />
            {formik.touched.blxBackImage && formik.errors.blxBackImage && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.blxBackImage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};