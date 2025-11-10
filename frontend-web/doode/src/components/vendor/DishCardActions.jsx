import React from 'react';
import { Edit3, X } from 'lucide-react';

const DishCardActions = ({ dish, onEdit, onDelete }) => (
  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
    <div className="flex space-x-2">
      <ActionButton
        icon={Edit3}
        onClick={() => onEdit(dish)}
        className="hover:bg-gray-50"
        iconClass="text-gray-600"
      />
      <ActionButton
        icon={X}
        onClick={() => onDelete(dish.id)}
        className="hover:bg-red-50"
        iconClass="text-red-600"
      />
    </div>
  </div>
);

const ActionButton = ({ icon: Icon, onClick, className, iconClass }) => (
  <button
    onClick={onClick}
    className={`p-2 bg-white rounded-lg shadow-md transition-colors ${className}`}
  >
    <Icon className={`h-4 w-4 ${iconClass}`} />
  </button>
);

export default DishCardActions;