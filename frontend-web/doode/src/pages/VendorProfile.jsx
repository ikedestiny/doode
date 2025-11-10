import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VendorHeader from '../components/vendor/VendorHeader';
import VendorTabs from '../components/vendor/VendorTabs';
import DishesTab from '../components/vendor/DishesTab';
import AboutTab from '../components/vendor/AboutTab';
import ReviewsTab from '../components/vendor/ReviewsTab';
import DishModal from '../components/vendor/DishModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import { useVendor } from '../hooks/useVendor';

const VendorProfile = () => {
  const { id } = useParams();
  const { 
    vendor, 
    loading, 
    error, 
    addDish, 
    updateDish, 
    deleteDish 
  } = useVendor(id);
  
  const [activeTab, setActiveTab] = useState('dishes');
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  const handleAddDish = async (dishData) => {
    try {
      await addDish(dishData);
      setShowAddDishModal(false);
    } catch (error) {
      console.error('Error adding dish:', error);
      alert('Failed to add dish: ' + error.message);
    }
  };

  const handleEditDish = async (dishId, dishData) => {
    try {
      await updateDish(dishId, dishData);
      setEditingDish(null);
    } catch (error) {
      console.error('Error updating dish:', error);
      alert('Failed to update dish: ' + error.message);
    }
  };

  const handleDeleteDish = async (dishId) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      try {
        await deleteDish(dishId);
      } catch (error) {
        console.error('Error deleting dish:', error);
        alert('Failed to delete dish: ' + error.message);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!vendor) return <ErrorState message="Vendor Not Found" />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VendorHeader vendor={vendor} />
          <VendorTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dishes' && (
          <DishesTab 
            vendor={vendor}
            onAddDish={() => setShowAddDishModal(true)}
            onEditDish={setEditingDish}
            onDeleteDish={handleDeleteDish}
          />
        )}

        {activeTab === 'about' && <AboutTab vendor={vendor} />}
        {activeTab === 'reviews' && <ReviewsTab vendor={vendor} />}
      </div>

      {/* Add/Edit Dish Modal */}
      {(showAddDishModal || editingDish) && (
        <DishModal
          vendorId={id}
          dish={editingDish}
          onSave={editingDish ? handleEditDish : handleAddDish}
          onClose={() => {
            setShowAddDishModal(false);
            setEditingDish(null);
          }}
        />
      )}
    </div>
  );
};

export default VendorProfile;