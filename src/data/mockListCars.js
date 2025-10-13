export const mockListCars = [
  {
    id: 'VF001',
    model: 'VinFast VF e34',
    type: 'Minicar',
    price: {
      daily: 590000,
      weekly: 3900000,
      monthly: 15000000
    },
    originalPrice: {
      daily: 650000,
      weekly: 4300000, 
      monthly: 16500000
    },
    features: ['Minicar', '210km (NEDC)', '4 chỗ', 'Dung tích cốp 285L'],
    specifications: {
      range: '210km (NEDC)',
      seats: 4,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '30 phút (DC)',
      power: '110 kW',
      trunkCapacity: '285L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg', 
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'available',
    location: 'Quận 1',
    discount: {
      daily: 60000,
      weekly: 400000,
      monthly: 1500000
    },
    isNew: true
  },
  {
    id: 'VF002', 
    model: 'VinFast VF 6 Plus',
    type: 'B-SUV',
    price: {
      daily: 1250000,
      weekly: 8200000,
      monthly: 32000000
    },
    originalPrice: {
      daily: 1350000,
      weekly: 8900000,
      monthly: 34500000
    },
    features: ['B-SUV', '460km (NEDC)', '5 chỗ', 'Dung tích cốp 423L'],
    specifications: {
      range: '460km (NEDC)',
      seats: 5,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '35 phút (DC)',
      power: '180 kW',
      trunkCapacity: '423L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg', 
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'available',
    location: 'Quận 7',
    discount: {
      daily: 100000,
      weekly: 700000,
      monthly: 2500000
    },
    isNew: false
  },
  {
    id: 'VF003',
    model: 'VinFast VF 6S',
    type: 'B-SUV', 
    price: {
      daily: 1100000,
      weekly: 7200000,
      monthly: 28000000
    },
    originalPrice: {
      daily: 1200000,
      weekly: 7900000,
      monthly: 30500000
    },
    features: ['B-SUV', '480km (NEDC)', '5 chỗ', 'Dung tích cốp 423L'],
    specifications: {
      range: '480km (NEDC)',
      seats: 5,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '40 phút (DC)',
      power: '174 kW',
      trunkCapacity: '423L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'rented',
    location: 'Quận 9',
    discount: {
      daily: 100000,
      weekly: 700000,
      monthly: 2500000
    },
    isNew: false
  },
  {
    id: 'VF004',
    model: 'VinFast VF 7 Plus',
    type: 'C-SUV',
    price: {
      daily: 1700000,
      weekly: 11200000,
      monthly: 43000000
    },
    originalPrice: {
      daily: 1800000,
      weekly: 11900000,
      monthly: 46000000
    },
    features: ['C-SUV', '496km (NEDC)', '5 chỗ', 'Dung tích cốp 537L'],
    specifications: {
      range: '496km (NEDC)',
      seats: 5,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '45 phút (DC)',
      power: '260 kW',
      trunkCapacity: '537L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'available',
    location: 'Quận Bình Thạnh',
    discount: {
      daily: 100000,
      weekly: 700000,
      monthly: 3000000
    },
    isNew: false
  },
  {
    id: 'VF005',
    model: 'VinFast VF 7S',
    type: 'C-SUV',
    price: {
      daily: 1700000,
      weekly: 11200000,
      monthly: 43000000
    },
    originalPrice: {
      daily: 1750000,
      weekly: 11550000,
      monthly: 44625000
    },
    features: ['C-SUV', '430km (NEDC)', '5 chỗ', 'Dung tích cốp 537L'],
    specifications: {
      range: '430km (NEDC)',
      seats: 5,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '42 phút (DC)',
      power: '250 kW',
      trunkCapacity: '537L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'rented',
    location: 'Quận 1',
    discount: {
      daily: 50000,
      weekly: 350000,
      monthly: 1625000
    },
    isNew: false
  },
  {
    id: 'VF006',
    model: 'VinFast VF 8 Eco',
    type: 'D-SUV',
    price: {
      daily: 1700000,
      weekly: 11200000,
      monthly: 43000000
    },
    originalPrice: {
      daily: 1850000,
      weekly: 12200000,
      monthly: 47000000
    },
    features: ['D-SUV', '471km (WLTP)', '5 chỗ', 'Dung tích cốp 350L'],
    specifications: {
      range: '471km (WLTP)',
      seats: 5,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '45 phút (DC)',
      power: '260 kW',
      trunkCapacity: '350L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'available',
    location: 'Quận 7',
    discount: {
      daily: 150000,
      weekly: 1000000,
      monthly: 4000000
    },
    isNew: false
  },
  {
    id: 'VF007',
    model: 'VinFast VF 8 Plus',
    type: 'D-SUV',
    price: {
      daily: 1950000,
      weekly: 12870000,
      monthly: 49500000
    },
    originalPrice: {
      daily: 2100000,
      weekly: 13860000,
      monthly: 53500000
    },
    features: ['D-SUV', '500km (WLTP)', '5 chỗ', 'Dung tích cốp 350L'],
    specifications: {
      range: '500km (WLTP)',
      seats: 5,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '45 phút (DC)',
      power: '300 kW',
      trunkCapacity: '350L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'available',
    location: 'Quận 7',
    discount: {
      daily: 150000,
      weekly: 990000,
      monthly: 4000000
    },
    isNew: false
  },
  {
    id: 'VF008',
    model: 'VinFast VF 9 Eco',
    type: 'E-SUV',
    price: {
      daily: 2200000,
      weekly: 14520000,
      monthly: 56000000
    },
    originalPrice: {
      daily: 2400000,
      weekly: 15840000,
      monthly: 61000000
    },
    features: ['E-SUV', '438km (WLTP)', '6 chỗ', 'Dung tích cốp 417L'],
    specifications: {
      range: '438km (WLTP)',
      seats: 6,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '50 phút (DC)',
      power: '300 kW',
      trunkCapacity: '417L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'available',
    location: 'Quận 9',
    discount: {
      daily: 200000,
      weekly: 1320000,
      monthly: 5000000
    },
    isNew: false
  },
  {
    id: 'VF009',
    model: 'VinFast VF 9 Plus',
    type: 'E-SUV',
    price: {
      daily: 2500000,
      weekly: 16500000,
      monthly: 63500000
    },
    originalPrice: {
      daily: 2700000,
      weekly: 17820000,
      monthly: 68500000
    },
    features: ['E-SUV', '516km (WLTP)', '7 chỗ', 'Dung tích cốp 417L'],
    specifications: {
      range: '516km (WLTP)',
      seats: 7,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '50 phút (DC)',
      power: '350 kW',
      trunkCapacity: '417L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'available',
    location: 'Quận Bình Thạnh',
    discount: {
      daily: 200000,
      weekly: 1320000,
      monthly: 5000000
    },
    isNew: true
  },
  {
    id: 'VF010',
    model: 'VinFast VF Wild',
    type: 'Pickup',
    price: {
      daily: 2800000,
      weekly: 18480000,
      monthly: 71200000
    },
    originalPrice: {
      daily: 3000000,
      weekly: 19800000,
      monthly: 76200000
    },
    features: ['Pickup', '450km (WLTP)', '5 chỗ', 'Thùng xe 1200L'],
    specifications: {
      range: '450km (WLTP)',
      seats: 5,
      transmission: 'Tự động',
      fuel: 'Điện',
      chargingTime: '55 phút (DC)',
      power: '320 kW',
      trunkCapacity: '1200L'
    },
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    availability: 'available',
    location: 'Quận Bình Thạnh',
    discount: {
      daily: 200000,
      weekly: 1320000,
      monthly: 5000000
    },
    isNew: true
  }
];

export const locations = [
  'Quận 1',
  'Quận 7', 
  'Quận 9',
  'Quận Bình Thạnh'
];

export const rentalPeriods = [
  { id: 'daily', label: 'Thuê ngày', unit: 'ngày' },
  { id: 'weekly', label: 'Thuê tuần', unit: 'tuần' },
  { id: 'monthly', label: 'Thuê tháng', unit: 'tháng' }
];
