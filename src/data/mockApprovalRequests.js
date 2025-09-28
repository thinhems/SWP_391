
export const mockApprovalRequests = [
  {
    id: 'REQ_001',
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
    id: 'REQ_002', 
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