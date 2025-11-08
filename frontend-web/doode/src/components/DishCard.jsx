// src/components/DishCard.jsx
import React from 'react';
import { Star, Heart } from 'lucide-react';

const DishCard = ({ 
  dish, 
  onOrderClick, 
  onFavoriteClick, 
  showFavoriteButton = true 
}) => {
  const {
    id,
    name,
    description,
    price,
    rating,
    image,
    vendor,
    isFavorite = false
  } = dish;

  const handleOrderClick = () => {
    if (onOrderClick) {
      onOrderClick(dish);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onFavoriteClick) {
      onFavoriteClick(dish);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart 
              className={`h-5 w-5 ${
                isFavorite 
                  ? 'text-african-red fill-current' 
                  : 'text-gray-400 hover:text-african-red'
              } transition-colors`}
            />
          </button>
        )}
        
        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{name}</h3>
          <span className="text-african-gold font-bold text-lg">₽ {price}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">{description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-700">{rating}</span>
            <span className="text-gray-400 mx-1">•</span>
            <span className="text-sm text-gray-500 truncate">{vendor}</span>
          </div>
        </div>

        <button 
          onClick={handleOrderClick}
          className="w-full bg-african-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default DishCard;