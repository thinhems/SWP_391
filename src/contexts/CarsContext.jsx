import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { carService } from '../services/cars.api';

const CarsContext = createContext();

export const useCars = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};

export const CarsProvider = ({ children }) => {
  const [listCar, setListCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStation, setUserStation] = useState(null);
  const isFirstLoadRef = useRef(true); // ← Thêm ref

  // Fetch dữ liệu xe
  const fetchListCars = async () => {
    if (!userStation) {
      return;
    }
    if (isFirstLoadRef.current) {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await carService.getCarsByStation(userStation);
      setListCar(data);
    } catch (err) {
      setError(err);
      console.error('Error fetching cars:', err);
    } finally {
      if (isFirstLoadRef.current) {
        setLoading(false);
        isFirstLoadRef.current = false; // ← Đánh dấu đã load xong
      }
    }
  };

  useEffect(() => {
    fetchListCars();
    // tự động làm mới danh sách xe mỗi 20 giây
    const intervalId = setInterval(() => {
      // Kiểm tra nếu đang ở trang con của manage-cars thì không fetch
      const currentPath = window.location.pathname;
      const isInManageCarPage = currentPath.includes('/manage-cars');
      const isInDetailPage = currentPath.includes('/inspection')
      // Chỉ refresh khi ở trang manage-cars và KHÔNG ở các trang chi tiết
      if (isInManageCarPage && !isInDetailPage) {
        fetchListCars();
      }
    }, 20000);
    // cleanup interval khi unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [userStation]);
  // Tính toán số liệu cho xe đã lọc theo station
  const carsData = {
    // số lượng xe theo trạng thái
    total: listCar.length,
    available: listCar.filter(car => car.status === 0).length,
    pending_approval: listCar.filter(car => car.status === 1).length,
    pending_contract: listCar.filter(car => car.status === 2).length,
    pending_handover: listCar.filter(car => car.status === 3).length,
    rented: listCar.filter(car => car.status === 4).length,
    allCars: listCar,
    // lấy danh sách xe theo trạng thái
    getCarsByStatus: (status) => {
      if (status === 0) return listCar.filter(car => car.status === status);
      else if (status === 1) return listCar.filter(car => car.status === status);
      else if (status === 2) return listCar.filter(car => car.status === status);
      else if (status === 3) return listCar.filter(car => car.status === status);
      else if (status === 4) return listCar.filter(car => car.status === status);
      else return [];
    },
    // lọc xe theo model
    getCarsByModel: (modelID) => {
      return listCar.filter(car => car.modelID === modelID);
    },
    // lấy xe theo ID 
    getCarById: (id) => listCar.find(car => car.id === id),
  };
  // Cập nhật xe
  const updateCar = async (carId, updateCar) => { 
    try {
      await carService.updateCar(carId, updateCar);
      setListCar(prevCars => prevCars.map(car => 
        car.id === carId ? { ...car, ...updateCar } : car
      ));
      // Cập nhật lại danh sách xe sau khi update thành công
      await fetchListCars();
    } catch (error) {
      console.error('Error updating car:', error);
      throw error;
    }
  };
  //Cập nhât item kiểm tra xe
  const updateCarInspectionItem = async (carId, itemData) => {
    try {
      await carService.updateCarInspectionItem(carId, itemData);
      setListCar(prevCars => prevCars.map(car => 
        car.id === carId ? { ...car, inspectionItems: itemData } : car
      ));
      // Cập nhật lại danh sách xe sau khi update thành công
      await fetchListCars();
    } catch (error) {
      console.error('Error updating car inspection item:', error);
      throw error;
    }
  };
  // upload ảnh xe
  const uploadCarImage = async (carId, imageFile) => { 
    try {
      await carService.updateCarImage(carId, imageFile);
      await fetchListCars();
    } catch (error) {
      throw error;
    }
  };
  // xóa ảnh xe
  const deleteCarImage = async (vehicleId, base64Image) => { 
    try {
      await carService.deleteCarImage(vehicleId, base64Image);
      await fetchListCars();
    } catch (error) {
      throw error;
    }
  };
  const value = {
    carsData,
    loading,
    error,
    updateCar,
    updateCarInspectionItem,
    uploadCarImage,
    deleteCarImage,
    setUserStation // Thêm function để set station từ bên ngoài
  };

  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>
  );
};