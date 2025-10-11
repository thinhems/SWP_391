
export default function FileUploadBox({ id, label, file, onChange }) {
  // tạo URL để preview ảnh
  const previewUrl = file ? URL.createObjectURL(file) : null;

  // hàm rút gọn tên file nếu quá dài
  const truncateFileName = (fileName, maxLength = 25) => {
    if (fileName.length <= maxLength) return fileName;
    
    const extension = fileName.split('.').pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension.length - 4);
    
    return `${truncatedName}...${extension}`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
          id={id}
          required
        />
        <label htmlFor={id} className="cursor-pointer">
          <div className="space-y-2">
            {file ? (
              // hiển thị khi đã có ảnh
              <div className="space-y-3">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg mx-auto border border-gray-200 shadow-sm"
                />
                <p className="text-sm text-green-600 font-medium">
                  {truncateFileName(file.name)}
                </p>
                <p className="text-xs text-gray-500">
                  Nhấp để thay đổi ảnh
                </p>
              </div>
            ) : (
              // hiển thị khi chưa có ảnh
              <>
                <svg className="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-gray-600">
                  Chọn ảnh để tải lên
                </p>
                <p className="text-xs text-gray-500">PNG, JPG tối đa 5MB</p>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};