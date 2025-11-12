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
        console.log('Vendor data:', vendorData);
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
      totalRatings: 0,
      imagePath: dishData.imagePath || '/images/placeholder-food.jpg' // Ensure imagePath is set
    };
    
    setVendor(prev => ({
      ...prev,
      delicacies: [...prev.delicacies, newDish]
    }));
    
    return newDish;
  };

  const updateDishMock = async (dishId, dishData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setVendor(prev => ({
      ...prev,
      delicacies: prev.delicacies.map(dish => 
        dish.id === dishId ? { ...dish, ...dishData } : dish
      )
    }));
    
    return { id: dishId, ...dishData };
  };

  const deleteDishMock = async (dishId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setVendor(prev => ({
      ...prev,
      delicacies: prev.delicacies.filter(dish => dish.id !== dishId)
    }));
    
    return { success: true };
  };

  // Real API functions
  const addDishReal = async (dishData) => {
    try {
      // Ensure the dish data includes the vendorId
      const dishWithVendor = {
        ...dishData,
        vendorId: vendorId
      };
      
      const response = await vendorService.addDishToVendor(vendorId, dishWithVendor);
      await refreshVendor(); // Refresh to get the latest data
      return response;
    } catch (error) {
      console.error('Error adding dish:', error);
      throw error;
    }
  };

  const updateDishReal = async (dishId, dishData) => {
    try {
      const response = await vendorService.updateDish(vendorId, dishId, dishData);
      await refreshVendor(); // Refresh to get the latest data
      return response;
    } catch (error) {
      console.error('Error updating dish:', error);
      throw error;
    }
  };

  const deleteDishReal = async (dishId) => {
    try {
      const response = await vendorService.deleteDish(vendorId, dishId);
      await refreshVendor(); // Refresh to get the latest data
      return response;
    } catch (error) {
      console.error('Error deleting dish:', error);
      throw error;
    }
  };

  // Export the appropriate functions based on mode
  const addDish = USE_MOCK_DATA ? addDishMock : addDishReal;
  const updateDish = USE_MOCK_DATA ? updateDishMock : updateDishReal;
  const deleteDish = USE_MOCK_DATA ? deleteDishMock : deleteDishReal;

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