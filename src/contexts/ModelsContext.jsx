import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

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
			const response = await api.get('/Model/GetAll');
			const apiModels = response?.data || [];

			// Transform API data to the frontend expected format
			const transformedModels = apiModels.map(item => {
				const specs = item.specifications || {};
				return {
					id: item.id,
					name: item.modelName,
					type: item.type || 'Xe điện',
					images: Array.isArray(item.images) && item.images.length > 0
						? item.images
						: [item.imageUrl || 'https://placehold.co/800x500?text=No+Image'],
					price: item.price && (item.price.daily || item.price.weekly || item.price.monthly)
						? item.price
						: {
							// Fallbacks if backend doesn't provide full price object
							daily: item.price?.daily || item.price || 1_250_000,
							weekly: item.price?.weekly || Math.floor((item.price?.daily || item.price || 1_250_000) * 6.3),
							monthly: item.price?.monthly || Math.floor((item.price?.daily || item.price || 1_250_000) * 25)
						},
					deposit: item.deposit || {
						daily: 5_000_000,
						weekly: 10_000_000,
						monthly: 20_000_000
					},
					specifications: {
						seats: specs.seat ?? 5,
						range: `${specs.range ?? 400}km`,
						trunkCapacity: `${specs.trunkCapatity ?? 500}L`,
						carModel: specs.carModel || item.type || 'Minicar',
						maxPower: specs.hoursepower ? `${specs.hoursepower} HP` : undefined,
						limitKm: specs.moveLimit ?? 200,
						// defaults used by UI
						transmission: 'Tự động',
						airbags: '6 túi khí',
					},
					quantity: typeof item.quantity === 'number' ? item.quantity : 0,
					amenities: Array.isArray(item.amenities) ? item.amenities : [],
				};
			});

			setModels(transformedModels);
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
	// Tính số xe còn trống theo quy tắc: quantity > 0 là còn xe
	const getAvailableCount = (model) => {
		if (!model) return 0;
		return model.quantity > 0 ? model.quantity : 0;
	};
	// Lọc models và thêm thông tin số xe available cho từng quận
	const filteredModels = models.map(model => ({
		...model,
		station: selectedLocation,
		availableCount: getAvailableCount(model),
	}));
	const modelsData = {
		total: filteredModels.length,
		allModels: filteredModels,
		getModelById: (id) => filteredModels.find(model => String(model.id) === String(id))
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