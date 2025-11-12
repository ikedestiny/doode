// src/components/DishCard.jsx - Enhanced African Theme
import React from 'react';
import { Star, Heart, Clock } from 'lucide-react';

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
    imagePath,
    vendor,
    isFavorite = false,
    preparationTime = '15-25 min' // Added preparation time
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-orange-100">
      {/* Image Container with African theme */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-amber-50 overflow-hidden">
        <img 
          src={imagePath} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* African pattern overlay */}
        <div className="absolute inset-0 bg-african-pattern opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        {/* Favorite Button */}
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <Heart 
              className={`h-5 w-5 ${
                isFavorite 
                  ? 'text-red-500 fill-current' 
                  : 'text-gray-400 hover:text-red-500'
              } transition-colors`}
            />
          </button>
        )}
        
        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/80 text-white px-3 py-2 rounded-2xl backdrop-blur-sm">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="text-sm font-bold">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Preparation Time */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-2 rounded-2xl">
          <Clock className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium">{preparationTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 font-serif">{name}</h3>
          <span className="text-2xl font-bold text-orange-600">₽{price}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {rating > 0 && (
              <>
                <Star className="h-4 w-4 text-amber-400 fill-current" />
                <span className="text-sm text-gray-700 font-medium">{rating.toFixed(1)}</span>
                <span className="text-gray-300 mx-1">•</span>
              </>
            )}
            <span className="text-sm text-gray-500 truncate font-medium">{vendor}</span>
          </div>
        </div>

        <button 
          onClick={handleOrderClick}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default DishCard;