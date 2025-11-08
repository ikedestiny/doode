// src/components/DishesGrid.jsx
import React from 'react';
import DishCard from './DishCard';

const DishesGrid = ({ 
  dishes, 
  onOrderClick, 
  onFavoriteClick,
  columns = 3,
  showFavoriteButton = true 
}) => {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6`}>
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          onOrderClick={onOrderClick}
          onFavoriteClick={onFavoriteClick}
          showFavoriteButton={showFavoriteButton}
        />
      ))}
    </div>
  );
};

export default DishesGrid;