export const mockOrders = [
  // ORDER 1 - Xe đã đặt (booked)
  {
    id: 'ORDER_001',
    type: 'booked',
    status: 'booked',
    carId: 'VF006',
    requestTime: null,
    customer: {
      name: 'Lê Minh C',
      phone: '0923456789',
      email: null,
      idCard: '079011223344',
      driverLicense: 'B2-079011223',
      address: '789 Đường DEF, Quận 7, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      idLicenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF006',
      model: 'VinFast VF 8',
      licensePlate: '51A-777.88',
      color: 'Xám',
      year: 2025,
      battery: 90,
      initialBattery: 90,
      initialOdometer: 12000,
      location: 'Khu vực A - Vị trí 06',
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
      endDate: '2025-09-30',
      totalDays: 5,
      maxKmPerDay: 200,
      totalMaxKm: 1000,
      limitedKilometers: 1000,
      pricePerDay: 900000,
      deposit: 3000000,
      totalCost: 4500000,
      grandTotal: 7500000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000
    },
    booking: {
      bookingTime: '2025-09-23 15:45:00',
      pickupTime: '2025-09-25 10:00:00',
      rentTime: null,
      expectedReturn: null
    },
    notes: null
  },

  // ORDER 2 - Xe đã đặt (booked)
  {
    id: 'ORDER_002',
    type: 'booked',
    status: 'booked',
    carId: 'VF007',
    requestTime: null,
    customer: {
      name: 'Hoàng Văn E',
      phone: '0945678901',
      email: null,
      idCard: '079099887766',
      driverLicense: 'B2-079099887',
      address: '654 Đường JKL, Quận 5, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      idLicenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF007',
      model: 'VinFast VF e34',
      licensePlate: '51A-999.00',
      color: 'Xanh lá',
      year: 2025,
      battery: 82,
      initialBattery: 82,
      initialOdometer: 8500,
      location: 'Khu vực B - Vị trí 07',
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
      startDate: '2025-09-27',
      endDate: '2025-10-03',
      totalDays: 7,
      maxKmPerDay: 200,
      totalMaxKm: 1400,
      limitedKilometers: 1400,
      pricePerDay: 650000,
      deposit: 2000000,
      totalCost: 4550000,
      grandTotal: 6550000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000
    },
    booking: {
      bookingTime: '2025-09-25 14:15:00',
      pickupTime: '2025-09-27 09:30:00',
      rentTime: null,
      expectedReturn: null
    },
    notes: null
  },
  // ORDER 3 - Chờ duyệt (pending_approval)
  {
    id: 'ORDER_003',
    type: 'pending_approval',
    status: 'pending_approval',
    carId: 'VF012',
    requestTime: '2025-09-23T10:00:00',
    customer: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      email: 'nguyenvana@gmail.com',
      idCard: '079012345678',
      driverLicense: 'B2-079012345',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      idLicenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF012',
      model: 'VinFast VF 8',
      licensePlate: '51A-333.44',
      color: 'Đỏ',
      year: 2025,
      battery: 88,
      initialBattery: 88,
      initialOdometer: 10500,
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
      maxKmPerDay: 200,
      totalMaxKm: 400,
      limitedKilometers: 400,
      pricePerDay: 800000,
      deposit: 2000000,
      totalCost: 1600000,
      grandTotal: 3600000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000
    },
    booking: {
      bookingTime: null,
      pickupTime: null,
      rentTime: null,
      expectedReturn: null
    },
    notes: 'Khách hàng yêu cầu nhận xe vào sáng sớm'
  },

  // ORDER 4 - Chờ duyệt (pending_approval)
  {
    id: 'ORDER_004',
    type: 'pending_approval',
    status: 'pending_approval',
    carId: 'VF005',
    requestTime: '2025-09-23T09:30:00',
    customer: {
      name: 'Trần Thị B',
      phone: '0912345678',
      email: 'tranthib@gmail.com',
      idCard: '079087654321',
      driverLicense: 'B2-079087654',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      idLicenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF005',
      model: 'VinFast VF e34',
      licensePlate: '51A-555.66',
      color: 'Trắng',
      year: 2025,
      battery: 95,
      initialBattery: 95,
      initialOdometer: 8200,
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
      maxKmPerDay: 200,
      totalMaxKm: 600,
      limitedKilometers: 600,
      pricePerDay: 700000,
      deposit: 1500000,
      totalCost: 2100000,
      grandTotal: 3600000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000
    },
    booking: {
      bookingTime: null,
      pickupTime: null,
      rentTime: null,
      expectedReturn: null
    },
    notes: 'Khách hàng cần xe để đi công tác'
  },

  // ORDER 5 - Đang cho thuê (rented)
  {
    id: 'ORDER_RETURN_001',
    type: 'rented',
    status: 'rented',
    carId: 'VF008',
    requestTime: '2025-10-04T14:30:00',
    customer: {
      name: 'Hoàng Văn E',
      phone: '0945678901',
      email: 'hoangvane@gmail.com',
      idCard: '079099887766',
      driverLicense: 'B2-079099887',
      address: '654 Đường JKL, Quận 5, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      idLicenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF008',
      model: 'VinFast VF 9',
      licensePlate: '51A-666.33',
      color: 'Đen',
      year: 2025,
      battery: 45,
      initialBattery: 90,
      initialOdometer: 15000,
      location: 'Đang sử dụng',
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
      startDate: '2025-10-05',
      endDate: '2025-10-07',
      totalDays: 2,
      maxKmPerDay: 200,
      totalMaxKm: 400,
      limitedKilometers: 400,
      pricePerDay: 750000,
      deposit: 1800000,
      totalCost: 1500000,
      grandTotal: 3300000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000
    },
    booking: {
      bookingTime: '2025-10-04 16:00:00',
      pickupTime: '2025-10-05 08:00:00',
      rentTime: '2025-10-05 08:00:00',
      expectedReturn: '2025-10-07 18:00:00'
    },
    notes: null
  },

  // ORDER 6 - Đang cho thuê (rented)
  {
    id: 'ORDER_RETURN_002',
    type: 'rented',
    status: 'rented',
    carId: 'VF009',
    requestTime: '2025-10-02T10:15:00',
    customer: {
      name: 'Võ Thị F',
      phone: '0956789012',
      email: 'vothif@gmail.com',
      idCard: '079044556677',
      driverLicense: 'B2-079044556',
      address: '987 Đường MNO, Quận 6, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      idLicenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF009',
      model: 'VinFast VF 8',
      licensePlate: '51A-888.11',
      color: 'Bạc',
      year: 2025,
      battery: 62,
      initialBattery: 85,
      initialOdometer: 20000,
      location: 'Đang sử dụng',
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
      startDate: '2025-10-03',
      endDate: '2025-10-07',
      totalDays: 4,
      maxKmPerDay: 200,
      totalMaxKm: 800,
      limitedKilometers: 800,
      pricePerDay: 800000,
      deposit: 2500000,
      totalCost: 3200000,
      grandTotal: 5700000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000
    },
    booking: {
      bookingTime: '2025-10-02 11:30:00',
      pickupTime: '2025-10-03 10:00:00',
      rentTime: '2025-10-03 10:00:00',
      expectedReturn: '2025-10-07 10:00:00'
    },
    notes: null
  }
];