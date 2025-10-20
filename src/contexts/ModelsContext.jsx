import { createContext, useContext, useState, useEffect } from 'react';
import { mockListModels } from '../data/mockListModels';
import { mockCars } from '../data/mockCars';

const ModelsContext = createContext();

export const useModels = () => {
	const context = useContext(ModelsContext);
	if (!context) {
		throw new Error('useModels must be used within a ModelsProvider');
	}
	return context;
}

export const ModelsProvider = ({ children }) => {
	const [models, setModels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState(null);

	// Fetch dữ liệu models
	const fetchModels = async () => {
		setLoading(true);
		setError(null);
		try {
			await new Promise(resolve => setTimeout(resolve, 800));
			setModels(mockListModels);
      setSelectedLocation('Quận 1');
		} catch (err) {
			console.error('Error fetching models data:', err);
			setError('Có lỗi xảy ra khi tải dữ liệu models');
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchModels();
	}, []);
	// Tính số xe available cho mỗi model tại quận được chọn
	const getAvailableCount = (modelId) => {
		if (!modelId) return 0;
		const modelNumber = modelId.replace('VF', 'VF ');
		const modelName = `VinFast ${modelNumber}`;
		return mockCars.filter(car => 
			car.model === modelName && 
			car.status === 'available' && 
			car.station === selectedLocation
		).length;
	};
	// Lọc models và thêm thông tin số xe available cho từng quận
	const filteredModels = models.map(model => ({
		...model,
    station: selectedLocation,
		availableCount: getAvailableCount(model.id)
	}));
	const modelsData = {
		total: filteredModels.length,
		allModels: filteredModels,
		getModelById: (id) => filteredModels.find(model => model.id === id)
	};
	const value = { 
		modelsData, 
		loading, 
		error,
		selectedLocation, 
		setSelectedLocation
	};
	return (
		<ModelsContext.Provider value={value}>
			{children}
		</ModelsContext.Provider>
	);
}