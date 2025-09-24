// src/data/mockCars.js
export const mockCars = {
  available: [
    {
      id: 'VF001',
      model: 'VinFast VF e34',
      licensePlate: '30A-123.45',
      battery: 85,
      location: 'Khu vực A - Vị trí 01',
      lastMaintenance: '2024-09-15',
      status: 'ready',
      color: 'Trắng',
      year: 2024
    },
    {
      id: 'VF002',
      model: 'VinFast VF 8',
      licensePlate: '30A-678.90',
      battery: 92,
      location: 'Khu vực A - Vị trí 02',
      lastMaintenance: '2024-09-10',
      status: 'ready',
      color: 'Đen',
      year: 2024
    },
    {
      id: 'VF003',
      model: 'VinFast VF e34',
      licensePlate: '30A-111.22',
      battery: 78,
      location: 'Khu vực B - Vị trí 03',
      lastMaintenance: '2024-09-12',
      status: 'charging',
      color: 'Xanh',
      year: 2024
    }
  ],
  booked: [
    {
      id: 'VF004',
      model: 'VinFast VF 8',
      licensePlate: '30A-333.44',
      battery: 88,
      location: 'Khu vực A - Vị trí 04',
      customer: 'Nguyễn Văn A',
      bookingTime: '10:00 - 23/09/2024',
      pickupTime: '14:00 - 23/09/2024',
      phone: '0901234567',
      status: 'booked',
      color: 'Đỏ',
      year: 2024
    },
    {
      id: 'VF005',
      model: 'VinFast VF e34',
      licensePlate: '30A-555.66',
      battery: 95,
      location: 'Khu vực B - Vị trí 05',
      customer: 'Trần Thị B',
      bookingTime: '09:30 - 23/09/2024',
      pickupTime: '16:00 - 23/09/2024',
      phone: '0912345678',
      status: 'booked',
      color: 'Trắng',
      year: 2024
    }
  ],
  rented: [
    {
      id: 'VF006',
      model: 'VinFast VF 8',
      licensePlate: '30A-777.88',
      battery: 45,
      location: 'Đang sử dụng',
      customer: 'Lê Văn C',
      rentTime: '08:00 - 22/09/2024',
      expectedReturn: '18:00 - 24/09/2024',
      phone: '0923456789',
      status: 'rented',
      color: 'Xám',
      year: 2024
    }
  ]
};
