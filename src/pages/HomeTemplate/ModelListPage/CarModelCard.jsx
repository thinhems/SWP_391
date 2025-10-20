
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCar, faBatteryFull, faSuitcase } from "@fortawesome/free-solid-svg-icons";

export default function CarModelCard({ 
  model, 
  isCenter, 
  availableCount, 
  activeTab, 
  onModelSelect 
}) {
  return (
    <div
      className={`
        relative bg-white/70 backdrop-blur-sm rounded-3xl cursor-pointer transition-all duration-300 shadow-lg border hover:bg-white/90
        ${isCenter 
          ? 'scale-110 z-10 shadow-2xl ring-2 ring-green-400/20 border-green-200/60 p-8 shadow-green-100/50 bg-white/85 hover:scale-115 hover:ring-green-400/40 hover:shadow-3xl' 
          : 'scale-100 opacity-95 hover:opacity-100 hover:scale-105 hover:shadow-xl border-gray-200/60 hover:border-green-200/50 p-6 hover:shadow-green-50/40'
        }
      `}
      onClick={() => onModelSelect(model.id)}
      style={{
        width: isCenter ? '520px' : '460px',
        height: isCenter ? '480px' : '430px'
      }}
    >
      {/* tình trạng xe */}
      <div className="absolute top-6 right-2">
        {availableCount > 0 ? (
          <span className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg ${isCenter ? 'px-4 py-2 text-base' : 'px-3 py-1.5 text-sm'}`}>
            Còn xe
          </span>
        ) : (
          <span className={`bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold shadow-lg ${isCenter ? 'px-4 py-2 text-base' : 'px-3 py-1.5 text-sm'}`}>
            Hết xe
          </span>
        )}
      </div>
      {/* Model Name & Price */}
      <div className="text-center mb-6">
        <h3 className={`text-gray-800 font-bold mb-3 ${isCenter ? 'text-3xl' : 'text-2xl'}`}>
          {model.name}
        </h3>
        <div className={`text-emerald-600 font-bold ${isCenter ? 'text-2xl' : 'text-xl'}`}>
          {model.price[activeTab].toLocaleString('vi-VN')}₫ 
          <span className="text-gray-500 font-normal text-base ml-1">
            /{activeTab === 'daily' ? 'ngày' : activeTab === 'weekly' ? 'tuần' : 'tháng'}
          </span>
        </div>
      </div>
      {/* Car Image */}
      <div 
        className="flex justify-center items-center mb-6" 
        style={{ height: isCenter ? '200px' : '170px' }}
      >
        <img 
          src={model.images[0]} 
          alt={model.name}
          className="max-h-full max-w-full object-contain drop-shadow-lg"
        />
      </div>
      {/* thông số model */}
      <div className={`mb-6 ${isCenter ? 'space-y-4' : 'space-y-3'}`}>
        <div className={`grid grid-cols-2 gap-4 text-gray-600 ${isCenter ? 'text-base' : 'text-sm'}`}>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-emerald-100 p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`}>
              <FontAwesomeIcon icon={faCar} />
            </div>
            <span className="font-medium text-slate-700">{model.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-teal-100 p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`}>
              <FontAwesomeIcon icon={faBatteryFull} />
            </div>
            <span className="font-medium text-slate-700">{model.specifications.range}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-cyan-100 p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className="font-medium text-slate-700">{model.specifications.seats} chỗ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-blue-100 p-2 ${isCenter ? 'w-8 h-8' : 'w-7 h-7'} flex items-center justify-center`}>
              <FontAwesomeIcon icon={faSuitcase} />
            </div>
            <span className="font-medium text-slate-700">Cốp {model.specifications.trunkCapacity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}