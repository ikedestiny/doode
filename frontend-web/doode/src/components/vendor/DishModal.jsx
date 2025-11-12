// components/vendor/DishModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '../../pages/ImageUpload';

const DishModal = ({ vendorId, dish, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imagePath: ''
  });
  const [loading, setLoading] = useState(false);

  // If editing, populate form with existing dish data
  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name || '',
        price: dish.price || '',
        description: dish.description || '',
        imagePath: dish.imagePath || ''
      });
    } else {
      // Reset form for new dish
      setFormData({
        name: '',
        price: '',
        description: '',
        imagePath: ''
      });
    }
  }, [dish]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      imagePath: imageUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dishData = {
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description,
        imagePath: formData.imagePath
      };

      // FIX: Check if we're editing or adding
      if (dish) {
        // Editing existing dish - pass dishId and dishData
        await onSave(dish.id, dishData);
      } else {
        // Adding new dish - pass only dishData
        await onSave(dishData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving dish:', error);
      alert(`Failed to ${dish ? 'update' : 'add'} dish: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {dish ? 'Edit Dish' : 'Add New Dish'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Dish Image
            </label>
            
            {/* Current Image Preview */}
            {formData.imagePath && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  {dish ? 'Current Image' : 'Uploaded Image'}:
                </p>
                <img
                  src={formData.imagePath}
                  alt="Dish preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}

            {/* Image Upload Component */}
            <ImageUpload 
              onImageUpload={handleImageUpload}
              currentImage={formData.imagePath}
            />
            
            <p className="text-xs text-gray-500 mt-2">
              Upload a high-quality image of your dish (JPEG, PNG, WebP)
            </p>
          </div>

          {/* Dish Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Dish Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g., Jollof Rice"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (₽) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="1"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="1200"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Describe your dish, ingredients, and special features..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name || !formData.price || !formData.imagePath}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-orange-300 transition-colors"
            >
              {loading ? 'Saving...' : (dish ? 'Update Dish' : 'Add Dish')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DishModal;