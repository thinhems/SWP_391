import React, { createContext, useContext, useState } from 'react';
import { mockActivities } from '../data/mockActivities';

const ActivitiesContext = createContext();

export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivitiesProvider');
  }
  return context;
};

export const ActivitiesProvider = ({ children }) => {
  const [manualActivities, setManualActivities] = useState([]);

  // Combine manual activities với mock activities
  const allActivities = React.useMemo(() => {
    // Merge manual activities (mới nhất) với mock activities
    return [...manualActivities, ...mockActivities].slice(0, 20);
  }, [manualActivities]);

  // Thêm hoạt động mới 
  const addActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: `manual_${Date.now()}_${Math.random()}`,
      time: 'Vừa xong'
    };
    
    setManualActivities(prev => [newActivity, ...prev].slice(0, 10));
  };

  // Clear các hoat động thủ công
  const clearManualActivities = () => {
    setManualActivities([]);
  };

  const value = {
    activities: allActivities,
    addActivity,
    clearManualActivities
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
};