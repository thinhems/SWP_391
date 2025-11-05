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
	// Accept either a model id, a model object, or a normalized model with `name`.
	const getAvailableCount = (modelOrId) => {
		if (!modelOrId) return 0;
		let modelNameToMatch = null;
		// If it's an object and has a frontend `name`, use it
		if (typeof modelOrId === 'object' && modelOrId !== null) {
			if (typeof modelOrId.name === 'string' && modelOrId.name.length > 0) {
				modelNameToMatch = modelOrId.name;
			} else if (typeof modelOrId.modelName === 'string') {
				modelNameToMatch = modelOrId.modelName;
			} else if (typeof modelOrId.id !== 'undefined') {
				modelNameToMatch = String(modelOrId.id);
			}
		} else {
			modelNameToMatch = String(modelOrId);
		}
		if (!modelNameToMatch) return 0;
		// If the name already contains 'VinFast', try to match mockCars directly.
		let possibleNames = [modelNameToMatch];
		if (!/vinfast/i.test(modelNameToMatch)) {
			// try to normalize VF codes: e.g. 'VF6' or 'VF 6S' forms
			const vfNormalized = modelNameToMatch.replace(/VF\s*/i, 'VF ');
			possibleNames.push(`VinFast ${vfNormalized}`);
			possibleNames.push(`VinFast ${modelNameToMatch}`);
		} else {
			possibleNames.push(modelNameToMatch.replace(/\s+/g, ' '));
		}
		// Find matching cars
		return mockCars.filter(car => 
			possibleNames.includes(car.model) && 
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