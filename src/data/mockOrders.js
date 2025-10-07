export const mockOrders = [
  {
    id: 'ORDER_001',
    type: 'contract',
    carId: 'VF006',
    customer: {
      name: 'Lê Minh C',
      phone: '0923456789',
      idCard: '079011223344',
      driverLicense: 'B2-079011223',
      address: '789 Đường DEF, Quận 7, TP.HCM'
    },
    car: {
      id: 'VF006',
      model: 'VinFast VF 8',
      licensePlate: '51A-777.88',
      color: 'Xám',
      year: 2025,
      battery: 90
    },
    rental: {
      startDate: '2025-09-25',
      endDate: '2025-09-30',
      totalDays: 5,
      pricePerDay: 900000,
      deposit: 3000000,
      totalCost: 7500000
    },
    booking: {
      bookingTime: '2025-09-23 15:45:00',
      pickupTime: '2025-09-25 10:00:00'
    }
  },
  {
    id: 'ORDER_002',
    type: 'contract',
    carId: 'VF007',
    customer: {
      name: 'Hoàng Văn E',
      phone: '0945678901',
      idCard: '079099887766',
      driverLicense: 'B2-079099887',
      address: '654 Đường JKL, Quận 5, TP.HCM'
    },
    car: {
      id: 'VF007',
      model: 'VinFast VF 8',
      licensePlate: '51A-999.00',
      color: 'Đen',
      year: 2025,
      battery: 85
    },
    rental: {
      startDate: '2025-09-27',
      endDate: '2025-09-29',
      totalDays: 2,
      pricePerDay: 750000,
      deposit: 1800000,
      totalCost: 3300000
    },
    booking: {
      bookingTime: '2025-09-25 14:15:00',
      pickupTime: '2025-09-27 13:00:00'
    }
  },
  {
    id: 'ORDER_003',
    type: 'approval_request',
    carId: 'VF004',
    status: 'pending_approval',
    requestTime: '2025-09-23T10:00:00',
    customer: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      email: 'nguyenvana@gmail.com',
      idCard: '079012345678',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      idLicenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ],
      address: '123 Đường ABC, Quận 1, TP.HCM',
      driverLicense: 'B2-079012345',
      avatar: '/images/profile.jpg'
    },
    car: {
      id: 'VF004',
      model: 'VinFast VF 8',
      licensePlate: '51A-333.44',
      color: 'Đỏ',
      year: 2025,
      battery: 88,
      odometer: 12500,
      location: 'Khu vực A - Vị trí 04',
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
    rental: {
      startDate: '2025-09-25',
      endDate: '2025-09-27',
      totalDays: 2,
      limitedKilometers: 500,
      pricePerDay: 800000,
      totalCost: 1600000,
      deposit: 2000000,
      grandTotal: 3600000
    },
    notes: 'Khách hàng yêu cầu nhận xe vào sáng sớm'
  },
  {
    id: 'ORDER_004',
    type: 'approval_request',
    carId: 'VF005',
    status: 'pending_approval',
    requestTime: '2025-09-23T09:30:00',
    customer: {
      name: 'Trần Thị B',
      phone: '0912345678',
      email: 'tranthib@gmail.com',
      idCard: '079087654321',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      idLicenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ],
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      driverLicense: 'B2-079087654',
      avatar: '/images/profile.jpg'
    },
    car: {
      id: 'VF005',
      model: 'VinFast VF e34',
      licensePlate: '51A-555.66',
      color: 'Trắng',
      year: 2025,
      battery: 95,
      odometer: 8200,
      location: 'Khu vực B - Vị trí 05',
      images: [
        '/images/vinfast-e34-white-1.jpg',
        '/images/vinfast-e34-white-2.jpg',
        '/images/vinfast-e34-white-3.jpg',
        '/images/vinfast-e34-white-4.jpg'
      ],
      specifications: {
        chargingTime: '30 phút (DC)',
        power: '110 kW',
        seats: 5,
        transmission: 'Tự động'
      }
    },
    rental: {
      startDate: '2025-09-24',
      endDate: '2025-09-27',
      totalDays: 3,
      limitedKilometers: 750,
      pricePerDay: 700000,
      totalCost: 2100000,
      deposit: 1500000,
      grandTotal: 3600000
    },
    notes: 'Khách hàng cần xe để đi công tác'
  }
];
