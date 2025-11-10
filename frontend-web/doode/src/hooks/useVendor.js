// import { useState, useEffect } from 'react';
// import { vendorService } from '../services/api';

// export const useVendor = (vendorId) => {
//   const [vendor, setVendor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchVendor();
//   }, [vendorId]);

//   const fetchVendor = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const vendorData = await vendorService.getVendorById(vendorId);
//       setVendor(vendorData);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching vendor data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshVendor = () => {
//     fetchVendor();
//   };

//   return {
//     vendor,
//     loading,
//     error,
//     refreshVendor
//   };
// };

import { useState, useEffect } from 'react';
import { vendorService } from '../services/api';
import { mockVendorData } from '../data/mockVendorData';

// Flag to switch between mock data and real API
const USE_MOCK_DATA = false; // Set to false when you want to use real API

export const useVendor = (vendorId) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (vendorId) {
      fetchVendor();
    }
  }, [vendorId]);

  const fetchVendor = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let vendorData;
      
      if (USE_MOCK_DATA) {
        // Use mock data with a delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        vendorData = mockVendorData;
      } else {
        // Use real API
        vendorData = await vendorService.getVendorById(vendorId);
      }
      
      setVendor(vendorData);
    } catch (err) {
      setError(err.message || 'Failed to fetch vendor data');
      console.error('Error fetching vendor data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshVendor = () => {
    fetchVendor();
  };

  // Mock service functions for development
  const addDishMock = async (dishData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newDish = {
      id: Date.now(), // Temporary ID
      ...dishData,
      averageRating: 0,
      totalRatings: 0
    };
    setVendor(prev => ({
      ...prev,
      delicacies: [...prev.delicacies, newDish]
    }));
  };

  const updateDishMock = async (dishId, dishData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setVendor(prev => ({
      ...prev,
      delicacies: prev.delicacies.map(dish => 
        dish.id === dishId ? { ...dish, ...dishData } : dish
      )
    }));
  };

  const deleteDishMock = async (dishId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setVendor(prev => ({
      ...prev,
      delicacies: prev.delicacies.filter(dish => dish.id !== dishId)
    }));
  };

  const addDish = USE_MOCK_DATA ? addDishMock : async (dishData) => {
    await vendorService.addDishToVendor(vendorId, dishData);
    await refreshVendor();
  };

  const updateDish = USE_MOCK_DATA ? updateDishMock : async (dishId, dishData) => {
    await vendorService.updateDish(vendorId, dishId, dishData);
    await refreshVendor();
  };

  const deleteDish = USE_MOCK_DATA ? deleteDishMock : async (dishId) => {
    await vendorService.deleteDish(vendorId, dishId);
    await refreshVendor();
  };

  return {
    vendor,
    loading,
    error,
    refreshVendor,
    addDish,
    updateDish,
    deleteDish
  };
};