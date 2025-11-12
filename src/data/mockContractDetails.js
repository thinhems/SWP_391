export const mockContractDetails = [
  {
    id: 'ORD001',
    orderCode: 'GF240001',
    contractNumber: 'HD240001',
    status: 'completed',
    statusText: 'Hoàn thành',
    signDate: '2025-09-30T10:00:00',
    completedDate: '2025-10-03T18:00:00',
    customer: {
      name: 'Trọng',
      phone: '0999999999',
      email: 'mdtrong1305@gmail.com',
      idCard: '079012345678',
      driverLicense: 'B2-079012345',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      licenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF001',
      model: 'VinFast VF 8',
      licensePlate: '51A-123.45',
      color: 'Đỏ',
      year: 2025,
      location: 'Quận 9',
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
      startDate: '2025-10-01',
      endDate: '2025-10-03',
      totalDays: 5,
      maxKmPerDay: 200,
      totalMaxKm: 1000,
      pricePerDay: 900000,
      deposit: 2000000,
      totalCost: 4500000,
      grandTotal: 6500000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000,
      rentalType: 'days'
    },
    mileage: {
      initial: 12000
    },
    battery: {
      initial: 95
    },
    payment: {
      method: 'Chuyển khoản',
      status: 'paid',
      paidAmount: 4500000,
      refundAmount: 1750000,
      finalAmount: 4750000
    },
    pickupLocation: 'Quận 9',
    returnLocation: 'Quận 9',
    notes: 'Khách hàng đã trả xe đúng hạn',
    contractFiles: [
      '/files/contract-hd240001.pdf',
      '/files/insurance-hd240001.pdf'
    ]
  },
  {
    id: 'ORD002',
    orderCode: 'GF240002',
    contractNumber: 'HD240002',
    status: 'pending_contract',
    statusText: 'Chờ ký hợp đồng',
    signDate: null,
    completedDate: null,
    otpRequired: true,
    otpSentTime: '2025-10-19T14:30:00',
    customer: {
      name: 'Trọng',
      phone: '0999999999',
      email: 'mdtrong1305@gmail.com',
      idCard: '079012345678',
      driverLicense: 'B2-079012345',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      licenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF002',
      model: 'VinFast VF 8',
      licensePlate: '51A-123.45',
      color: 'Đỏ',
      year: 2025,
      location: 'Quận 9',
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
      startDate: '2025-10-16',
      endDate: '2025-10-22',
      totalDays: 6,
      maxKmPerDay: 200,
      totalMaxKm: 1200,
      pricePerDay: 900000,
      deposit: 2000000,
      totalCost: 5400000,
      grandTotal: 7400000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000,
      rentalType: 'weeks'
    },
    mileage: {
      initial: 12000
    },
    battery: {
      initial: 95
    },
    payment: {
      method: 'Chuyển khoản',
      status: 'pending',
      paidAmount: 0,
      refundAmount: null,
      finalAmount: 7400000
    },
    pickupLocation: 'Quận 9',
    returnLocation: 'Quận 9',
    notes: 'Chờ khách hàng xác nhận OTP để ký hợp đồng',
    contractFiles: []
  },
  {
    id: 'ORD003',
    orderCode: 'GF240003',
    contractNumber: 'HD240003',
    status: 'pending_approval',
    statusText: 'Chờ duyệt',
    signDate: null,
    completedDate: null,
    customer: {
      name: 'Trọng',
      phone: '0999999999',
      email: 'mdtrong1305@gmail.com',
      idCard: '079012345678',
      driverLicense: 'B2-079012345',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      avatar: '/images/profile.jpg',
      idCardImages: [
        '/images/front-cccd.jpg',
        '/images/back-cccd.jpg'
      ],
      licenseImages: [
        '/images/front-blx.jpg',
        '/images/back-blx.jpg'
      ]
    },
    car: {
      id: 'VF003',
      model: 'VinFast VF 3',
      licensePlate: '51A-567.89',
      color: 'Trắng',
      year: 2025,
      location: 'Quận 9',
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
    rental: {
      startDate: '2025-10-22',
      endDate: '2025-11-22',
      totalDays: 30,
      maxKmPerDay: 200,
      totalMaxKm: 6000,
      pricePerDay: 650000,
      deposit: 1500000,
      totalCost: 24700000,
      grandTotal: 26200000,
      kmOverageFee: 5000,
      batteryDeficitFee: 10000, 
      rentalType: 'months'
    },
    mileage: {
      initial: 12000
    },
    battery: {
      initial: 95
    },
    payment: {
      method: 'Chuyển khoản',
      status: 'pending',
      paidAmount: 0,
      refundAmount: null,
      finalAmount: 26200000
    },
    pickupLocation: 'Quận 9',
    returnLocation: 'Quận 9',
    notes: 'Chờ phê duyệt từ quản lý',
    contractFiles: []
  }
];

// Helper functions
export const getContractById = (id) => {
  return mockContractDetails.find(contract => contract.id === id);
};

export const getContractsByStatus = (status) => {
  if (status === 'all') return mockContractDetails;
  return mockContractDetails.filter(contract => contract.status === status);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'pending_payment': 'bg-gray-100 text-gray-800',
    'pending_approval': 'bg-yellow-100 text-yellow-800',
    'pending_contract': 'bg-purple-100 text-purple-800',
    'pending_handover': 'bg-blue-100 text-blue-800',
    'rented': 'bg-orange-100 text-orange-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};