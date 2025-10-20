export const mockMyOrders = [
  {
    id: 'ORD001',
    orderCode: 'GF240001',
    contractNumber: 'HD240001',
    carModel: 'VinFast VF 8',
    licensePlate: '51A-123.45',
    carImage: '/images/vinfast-vf8-red-1.jpg',
    pickupDate: '2025-10-1',
    returnDate: '2025-10-3',
    totalDays: 3,
    status: 'completed',
    statusText: 'Hoàn thành',
    totalAmount: 4500000,
    deposit: 2000000,
    bookingDate: '2025-10-1',
    pickupLocation: 'Quận 9',
    returnLocation: 'Quận 9',
    rentalType: 'days',
    mileage: {
      start: 12000,
      end: 12850,
      total: 850,
      limit: 1000
    },
    battery: {
      start: 90,
      end: 65
    },
    customer: {
      name: 'Trọng',
      phone: '0999999999',
      email: 'mdtrong1305@gmail.com'
    },
    payment: {
      method: 'Chuyển khoản',
      status: 'paid',
      paidAmount: 4500000,
      refundAmount: 2000000
    }
  },
  {
    id: 'ORD002',
    orderCode: 'GF240002',
    contractNumber: 'HD240002',
    carModel: 'VinFast VF 8',
    licensePlate: '51A-123.45',
    carImage: '/images/vinfast-vf8-red-1.jpg',
    pickupDate: '2025-10-16',
    returnDate: '2025-10-22',
    totalDays: 7,
    status: 'pending_contract',
    statusText: 'Chờ ký hợp đồng',
    totalAmount: 4500000,
    deposit: 2000000,
    bookingDate: '2025-10-16',
    pickupLocation: 'Quận 9',
    returnLocation: 'Quận 9',
    rentalType: 'weeks',
    mileage: {
      start: 12000,
      end: 12850,
      total: 850,
      limit: 1000
    },
    battery: {
      start: 90,
      end: 65
    },
    customer: {
      name: 'Trọng',
      phone: '0999999999',
      email: 'mdtrong1305@gmail.com'
    },
    payment: {
      method: 'Chuyển khoản',
      status: 'paid',
      paidAmount: 4500000,
      refundAmount: 2000000
    }
  },
  {
    id: 'ORD003',
    orderCode: 'GF240003',
    contractNumber: 'HD240003',
    carModel: 'VinFast VF 3',
    licensePlate: '51A-567.89',
    carImage: '/images/vinfast-vf8-red-1.jpg',
    pickupDate: '2025-10-22',
    returnDate: '2025-11-22',
    totalDays: 30,
    status: 'pending_approval',
    statusText: 'Chờ duyệt',
    totalAmount: 3500000,
    deposit: 1500000,
    bookingDate: '2025-10-22',
    pickupLocation: 'Quận 9',
    returnLocation: 'Quận 9',
    rentalType: 'months',
    mileage: {
      start: 8500,
      end: null,
      total: 320,
      limit: 1000
    },
    battery: {
      start: 95,
      end: null
    },
    customer: {
      name: 'Trọng',
      phone: '0999999999',
      email: 'mdtrong1305@gmail.com'
    },
    payment: {
      method: 'Chuyển khoản',
      status: 'paid',
      paidAmount: 3500000,
      refundAmount: null
    }
  },
];

// Helper functions để filter data
export const getOrdersByStatus = (status) => {
  if (status === 'all') return mockMyOrders;
  return mockMyOrders.filter(order => order.status === status);
};

export const searchOrdersByCode = (searchTerm) => {
  if (!searchTerm) return mockMyOrders;
  return mockMyOrders.filter(order => 
    order.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const searchOrdersByModel = (searchTerm) => {
  if (!searchTerm) return mockMyOrders;
  return mockMyOrders.filter(order => 
    order.carModel.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterOrdersByDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) return mockMyOrders;
  
  return mockMyOrders.filter(order => {
    const pickupDate = new Date(order.pickupDate);
    const returnDateValue = new Date(order.returnDate);
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return pickupDate >= start && returnDateValue <= end;
    } else if (startDate) {
      const start = new Date(startDate);
      return pickupDate >= start;
    } else if (endDate) {
      const end = new Date(endDate);
      return returnDateValue <= end;
    }
    
    return true;
  });
};