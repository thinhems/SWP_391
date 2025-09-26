
export const mockContractsData = [
  {
    id: 'CONTRACT_001',
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
    id: 'CONTRACT_002',
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
  }
];

