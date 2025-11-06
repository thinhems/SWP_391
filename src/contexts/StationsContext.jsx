import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const StationsContext = createContext();

export const useStations = () => {
	const context = useContext(StationsContext);
	if (!context) {
		throw new Error('useStations must be used within a StationsProvider');
	}
	return context;
}

export const StationsProvider = ({ children }) => {
	const [stations, setStations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch danh sách stations từ API
	const fetchStations = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.get('/Station');
			const apiStations = response?.data || [];
			
			// API trả về: [{ id, name, description, location, capacity, quantity }]
			const transformedStations = apiStations.map(station => ({
				id: station.id,
				name: station.name,
				description: station.description,
				location: station.location,
				capacity: station.capacity,
				quantity: station.quantity
			}));

			setStations(transformedStations);
		} catch (err) {
			console.error('Error fetching stations:', err);
			setError('Không thể tải danh sách điểm thuê xe');
			// Fallback về danh sách mặc định nếu API lỗi
			setStations([
				{ id: 1, name: 'Quận 1', location: 'HCM', capacity: 50, quantity: 0 },
				{ id: 2, name: 'Quận 7', location: 'HCM', capacity: 40, quantity: 0 },
				{ id: 3, name: 'Quận 9', location: 'HCM', capacity: 30, quantity: 0 },
				{ id: 4, name: 'Quận Bình Thạnh', location: 'HCM', capacity: 35, quantity: 0 }
			]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStations();
	}, []);

	const value = { 
		stations, 
		loading, 
		error,
		refetch: fetchStations
	};

	return (
		<StationsContext.Provider value={value}>
			{children}
		</StationsContext.Provider>
	);
}
