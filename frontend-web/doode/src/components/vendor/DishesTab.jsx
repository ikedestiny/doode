import React from 'react';
import { Plus, ImageIcon } from 'lucide-react';
import DishCard from '../DishCard';
import DishCardActions from './DishCardActions';

const DishesTab = ({ vendor, onAddDish, onEditDish, onDeleteDish }) => {
  return (
    <div>
      <DishesHeader onAddDish={onAddDish} />
      <DishesGrid 
        vendor={vendor} 
        onEditDish={onEditDish}
        onDeleteDish={onDeleteDish}
      />
    </div>
  );
};

const DishesHeader = ({ onAddDish }) => (
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
    <button 
      onClick={onAddDish}
      className="btn-primary flex items-center space-x-2"
    >
      <Plus className="h-4 w-4" />
      <span>Add New Dish</span>
    </button>
  </div>
);

const DishesGrid = ({ vendor, onEditDish, onDeleteDish }) => {
  if (!vendor.delicacies || vendor.delicacies.length === 0) {
    return <EmptyDishesState onAddDish={onAddDish} />;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendor.delicacies.map((dish) => (
        <DishWithActions
          key={dish.id}
          dish={dish}
          onEditDish={onEditDish}
          onDeleteDish={onDeleteDish}
        />
      ))}
    </div>
  );
};

const DishWithActions = ({ dish, onEditDish, onDeleteDish }) => (
  <div className="relative group">
    <DishCard 
      dish={dish}
      onOrderClick={(dish) => console.log('Order:', dish)}
      showFavoriteButton={false}
    />
    <DishCardActions 
      dish={dish}
      onEdit={onEditDish}
      onDelete={onDeleteDish}
    />
  </div>
);

const EmptyDishesState = ({ onAddDish }) => (
  <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No dishes yet</h3>
    <p className="text-gray-500 mb-4">Start by adding your first dish to the menu</p>
    <button onClick={onAddDish} className="btn-primary">
      Add Your First Dish
    </button>
  </div>
);

export default DishesTab;