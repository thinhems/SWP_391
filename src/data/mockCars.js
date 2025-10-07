export const mockCars = [
  // Xe có sẵn (available)
  {
    id: 'VF001',
    model: 'VinFast VF e34',
    licensePlate: '51A-123.45',
    battery: 85,
    initialBattery: 85,
    initialOdometer: 5200,
    location: 'Khu vực A - Vị trí 01',
    lastMaintenance: '2025-09-15',
    status: 'available',
    color: 'Trắng',
    year: 2025,
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    specifications: {
      chargingTime: '30 phút (DC)',
      power: '110 kW',
      seats: 5,
      transmission: 'Tự động'
    }
  },
  {
    id: 'VF002',
    model: 'VinFast VF 8',
    licensePlate: '51A-678.90',
    battery: 92,
    initialBattery: 92,
    initialOdometer: 8500,
    location: 'Khu vực A - Vị trí 02',
    lastMaintenance: '2025-09-10',
    status: 'available',
    color: 'Đen',
    year: 2025,
    images: [
      '/images/vinfast-vf8-black-1.jpg',
      '/images/vinfast-vf8-black-2.jpg',
      '/images/vinfast-vf8-black-3.jpg',
      '/images/vinfast-vf8-black-4.jpg'
    ],
    specifications: {
      chargingTime: '45 phút (DC)',
      power: '300 kW',
      seats: 7,
      transmission: 'Tự động'
    }
  },
  {
    id: 'VF003',
    model: 'VinFast VF e34',
    licensePlate: '51A-111.22',
    battery: 78,
    initialBattery: 78,
    initialOdometer: 12300,
    location: 'Khu vực B - Vị trí 03',
    lastMaintenance: '2025-09-12',
    status: 'available',
    color: 'Xanh',
    year: 2025,
    images: [
      '/images/vinfast-e34-blue-1.jpg',
      '/images/vinfast-e34-blue-2.jpg',
      '/images/vinfast-e34-blue-3.jpg',
      '/images/vinfast-e34-blue-4.jpg'
    ],
    specifications: {
      chargingTime: '30 phút (DC)',
      power: '110 kW',
      seats: 5,
      transmission: 'Tự động'
    }
  },

  // Xe chờ ký hợp đồng (pending_contract)
  {
    id: 'VF010',
    model: 'VinFast VF 8',
    licensePlate: '51A-222.33',
    battery: 91,
    initialBattery: 91,
    initialOdometer: 9800,
    location: 'Khu vực A - Vị trí 08',
    customer: 'Đặng Minh G',
    phone: '0967890123',
    idCard: '079033445566',
    address: '111 Đường PQR, Quận 8, TP.HCM',
    approvalTime: '16:30 - 25/09/2025',
    rentalDays: 3,
    pricePerDay: 850000,
    totalCost: 2550000,
    deposit: 2200000,
    status: 'pending_contract',
    color: 'Xanh dương',
    year: 2025,
    images: [
      '/images/vinfast-vf8-blue-1.jpg',
      '/images/vinfast-vf8-blue-2.jpg',
      '/images/vinfast-vf8-blue-3.jpg',
      '/images/vinfast-vf8-blue-4.jpg'
    ],
    specifications: {
      chargingTime: '45 phút (DC)',
      power: '300 kW',
      seats: 7,
      transmission: 'Tự động'
    }
  },
  {
    id: 'VF011',
    model: 'VinFast VF e34',
    licensePlate: '51A-444.55',
    battery: 87,
    initialBattery: 87,
    initialOdometer: 6700,
    location: 'Khu vực B - Vị trí 09',
    customer: 'Bùi Thị H',
    phone: '0978901234',
    idCard: '079077889900',
    address: '222 Đường STU, Quận 9, TP.HCM',
    approvalTime: '11:15 - 25/09/2025',
    rentalDays: 4,
    pricePerDay: 720000,
    totalCost: 2880000,
    deposit: 1900000,
    status: 'pending_contract',
    color: 'Vàng',
    year: 2025,
    images: [
      '/images/vinfast-e34-yellow-1.jpg',
      '/images/vinfast-e34-yellow-2.jpg',
      '/images/vinfast-e34-yellow-3.jpg',
      '/images/vinfast-e34-yellow-4.jpg'
    ],
    specifications: {
      chargingTime: '30 phút (DC)',
      power: '110 kW',
      seats: 5,
      transmission: 'Tự động'
    }
  },

  // Xe chờ xác nhận thuê (pending_approval)
  {
    id: 'VF004',
    model: 'VinFast VF 8',
    licensePlate: '51A-333.44',
    battery: 88,
    initialBattery: 88,
    initialOdometer: 10500,
    location: 'Khu vực A - Vị trí 04',
    customer: 'Nguyễn Văn A',
    phone: '0901234567',
    idCard: '079012345678',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    requestTime: '10:00 - 23/09/2025',
    rentalDays: 2,
    pricePerDay: 800000,
    totalCost: 1600000,
    deposit: 2000000,
    status: 'pending_approval',
    color: 'Đỏ',
    year: 2025,
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    specifications: {
      chargingTime: '45 phút (DC)',
      power: '300 kW',
      seats: 7,
      transmission: 'Tự động'
    }
  },
  {
    id: 'VF005',
    model: 'VinFast VF e34',
    licensePlate: '51A-555.66',
    battery: 95,
    initialBattery: 95,
    initialOdometer: 8200,
    location: 'Khu vực B - Vị trí 05',
    customer: 'Trần Thị B',
    phone: '0912345678',
    idCard: '079087654321',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    requestTime: '09:30 - 23/09/2025',
    rentalDays: 3,
    pricePerDay: 700000,
    totalCost: 2100000,
    deposit: 1500000,
    status: 'pending_approval',
    color: 'Trắng',
    year: 2025,
    images: [
      '/images/vinfast-vf8-red-1.jpg',
      '/images/vinfast-vf8-red-2.jpg',
      '/images/vinfast-vf8-red-3.jpg',
      '/images/vinfast-vf8-red-4.jpg'
    ],
    specifications: {
      chargingTime: '30 phút (DC)',
      power: '110 kW',
      seats: 5,
      transmission: 'Tự động'
    }
  },

  // Xe đã đặt (approved/booked)
  {
    id: 'VF006',
    model: 'VinFast VF 8',
    licensePlate: '51A-777.88',
    battery: 90,
    initialBattery: 90,
    initialOdometer: 12000,
    location: 'Khu vực A - Vị trí 06',
    customer: 'Lê Minh C',
    phone: '0923456789',
    idCard: '079011223344',
    address: '789 Đường DEF, Quận 7, TP.HCM',
    bookingTime: '15:00 - 23/09/2025',
    pickupTime: '14:00 - 24/09/2025',
    rentalDays: 5,
    pricePerDay: 900000,
    totalCost: 4500000,
    deposit: 3000000,
    status: 'booked',
    color: 'Xám',
    year: 2025,
    images: [
      '/images/vinfast-vf8-gray-1.jpg',
      '/images/vinfast-vf8-gray-2.jpg',
      '/images/vinfast-vf8-gray-3.jpg',
      '/images/vinfast-vf8-gray-4.jpg'
    ],
    specifications: {
      chargingTime: '45 phút (DC)',
      power: '300 kW',
      seats: 7,
      transmission: 'Tự động'
    }
  },
  {
    id: 'VF007',
    model: 'VinFast VF e34',
    licensePlate: '51A-999.00',
    battery: 82,
    initialBattery: 82,
    initialOdometer: 8500,
    location: 'Khu vực B - Vị trí 07',
    customer: 'Phạm Thu D',
    phone: '0934567890',
    idCard: '079055667788',
    address: '321 Đường GHI, Quận 2, TP.HCM',
    bookingTime: '08:20 - 24/09/2025',
    pickupTime: '09:30 - 25/09/2025',
    rentalDays: 7,
    pricePerDay: 650000,
    totalCost: 4550000,
    deposit: 2000000,
    status: 'booked',
    color: 'Xanh lá',
    year: 2025,
    images: [
      '/images/vinfast-e34-green-1.jpg',
      '/images/vinfast-e34-green-2.jpg',
      '/images/vinfast-e34-green-3.jpg',
      '/images/vinfast-e34-green-4.jpg'
    ],
    specifications: {
      chargingTime: '30 phút (DC)',
      power: '110 kW',
      seats: 5,
      transmission: 'Tự động'
    }
  },

  // Xe đang cho thuê (rented)
  {
    id: 'VF008',
    model: 'VinFast VF 9',
    licensePlate: '51A-666.33',
    battery: 45,
    initialBattery: 90,
    initialOdometer: 15000,
    location: 'Đang sử dụng',
    customer: 'Hoàng Văn E',
    phone: '0945678901',
    idCard: '079099887766',
    address: '654 Đường JKL, Quận 5, TP.HCM',
    rentTime: '08:00 - 22/09/2025',
    expectedReturn: '18:00 - 24/09/2025',
    rentalDays: 2,
    pricePerDay: 750000,
    totalCost: 1500000,
    deposit: 1800000,
    status: 'rented',
    color: 'Đen',
    year: 2025,
    images: [
      '/images/vinfast-vf9-black-1.jpg',
      '/images/vinfast-vf9-black-2.jpg',
      '/images/vinfast-vf9-black-3.jpg',
      '/images/vinfast-vf9-black-4.jpg'
    ],
    specifications: {
      chargingTime: '50 phút (DC)',
      power: '350 kW',
      seats: 7,
      transmission: 'Tự động'
    }
  },
  {
    id: 'VF009',
    model: 'VinFast VF 8',
    licensePlate: '51A-888.11',
    battery: 62,
    initialBattery: 85,
    initialOdometer: 20000,
    location: 'Đang sử dụng',
    customer: 'Võ Thị F',
    phone: '0956789012',
    idCard: '079044556677',
    address: '987 Đường MNO, Quận 6, TP.HCM',
    rentTime: '10:00 - 21/09/2025',
    expectedReturn: '10:00 - 25/09/2025',
    rentalDays: 4,
    pricePerDay: 800000,
    totalCost: 3200000,
    deposit: 2500000,
    status: 'rented',
    color: 'Bạc',
    year: 2025,
    images: [
      '/images/vinfast-vf8-silver-1.jpg',
      '/images/vinfast-vf8-silver-2.jpg',
      '/images/vinfast-vf8-silver-3.jpg',
      '/images/vinfast-vf8-silver-4.jpg'
    ],
    specifications: {
      chargingTime: '45 phút (DC)',
      power: '300 kW',
      seats: 7,
      transmission: 'Tự động'
    }
  }
];