import React, { useState } from 'react';
import { X } from 'lucide-react';

const DishModal = ({ vendorId, dish, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: dish?.name || '',
    price: dish?.price || '',
    description: dish?.description || '',
    imagePath: dish?.imagePath || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(dish?.id, formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader 
        title={dish ? 'Edit Dish' : 'Add New Dish'} 
        onClose={onClose} 
      />
      <DishForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={onClose}
        isEditing={!!dish}
      />
    </ModalOverlay>
  );
};

const ModalOverlay = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div 
      className="bg-white rounded-lg max-w-md w-full p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

const ModalHeader = ({ title, onClose }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    <button 
      onClick={onClose} 
      className="text-gray-400 hover:text-gray-600 transition-colors"
    >
      <X className="h-6 w-6" />
    </button>
  </div>
);

const DishForm = ({ formData, onChange, onSubmit, onClose, isEditing }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <FormField
      label="Dish Name"
      name="name"
      type="text"
      value={formData.name}
      onChange={onChange}
      placeholder="Enter dish name"
      required
    />

    <FormField
      label="Price ($)"
      name="price"
      type="number"
      value={formData.price}
      onChange={onChange}
      placeholder="Enter price"
      required
      min="0"
      step="0.01"
    />

    <FormField
      label="Description"
      name="description"
      type="textarea"
      value={formData.description}
      onChange={onChange}
      placeholder="Describe the dish..."
      rows="3"
    />

    <FormField
      label="Image URL"
      name="imagePath"
      type="url"
      value={formData.imagePath}
      onChange={onChange}
      placeholder="https://example.com/image.jpg"
    />

    <FormActions onClose={onClose} isEditing={isEditing} />
  </form>
);

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  ...props 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-primary"
        {...props}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-primary"
        {...props}
      />
    )}
  </div>
);

const FormActions = ({ onClose, isEditing }) => (
  <div className="flex justify-end space-x-3 pt-4">
    <button 
      type="button" 
      onClick={onClose} 
      className="btn-outline"
    >
      Cancel
    </button>
    <button 
      type="submit" 
      className="btn-primary"
    >
      {isEditing ? 'Update Dish' : 'Add Dish'}
    </button>
  </div>
);

export default DishModal;