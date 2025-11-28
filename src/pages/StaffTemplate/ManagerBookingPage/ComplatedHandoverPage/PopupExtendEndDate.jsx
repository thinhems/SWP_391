import React, { useState } from 'react';

export default function PopupExtendEndDate({
  show,
  onClose,
  onConfirm,
  currentEndDate
}) {
  const minDate = currentEndDate ? new Date(currentEndDate).toISOString().split('T')[0] : "";
  const [selectedDate, setSelectedDate] = useState(minDate);
  const [selectedTime, setSelectedTime] = useState("17:00");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // minDate đã được tính ở trên

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    // Ghép date và time thành ISO string (local -> UTC)
    let dateTimeStr = selectedDate + 'T' + selectedTime + ':00';
    const isoDate = new Date(dateTimeStr).toISOString();
    await onConfirm(isoDate);
    setIsSubmitting(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[340px] w-full max-w-md animate-fadeIn">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Gia hạn ngày kết thúc thuê</h3>
        </div>
        <p className="text-gray-500 mb-6 text-sm">Chọn ngày kết thúc mới lớn hơn ngày hiện tại để gia hạn thêm thời gian thuê cho khách hàng.</p>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="extend-date">Ngày gia hạn</label>
            <input
              id="extend-date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={minDate}
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="extend-time">Giờ gia hạn</label>
            <input
              id="extend-time"
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
        </div>
        {selectedDate && selectedDate <= minDate && (
          <div className="flex items-center gap-2 text-red-500 mb-2">
            <span>Ngày mới phải lớn hơn ngày kết thúc hiện tại!</span>
          </div>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedDate || selectedDate <= minDate || isSubmitting}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Xác nhận
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease; }
      `}</style>
    </div>
  );
}
