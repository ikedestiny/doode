// src/pages/Restaurants.jsx
import React, { useState, useEffect } from 'react';
import { restaurantService, dishService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';

// Premium food images for different African cuisines
const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', // Jollof Rice
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop', // Grilled Meat
  'https://images.unsplash.com/photo-1563379091339-03246963d96f?w=400&h=300&fit=crop', // African Stew
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', // Traditional Dish
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', // Fried Plantains
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', // Healthy Bowl
];

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRestaurant, setExpandedRestaurant] = useState(null);
  const [hoveredRestaurant, setHoveredRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await restaurantService.getAll();
      setRestaurants(data);
      
      const dishesPromises = data.map(restaurant => 
        dishService.getByVendor(restaurant.id)
          .then(dishes => ({ [restaurant.id]: dishes }))
          .catch(() => ({ [restaurant.id]: [] }))
      );
      
      const dishesResults = await Promise.all(dishesPromises);
      const dishesMap = Object.assign({}, ...dishesResults);
      setDishes(dishesMap);
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch restaurants');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRestaurant = (restaurantId) => {
    setExpandedRestaurant(expandedRestaurant === restaurantId ? null : restaurantId);
  };

  const getFoodImage = (index) => FOOD_IMAGES[index % FOOD_IMAGES.length];
  const getDeliveryTime = () => 25 + Math.floor(Math.random() * 20);
  const getDeliveryPrice = () => [0, 99, 149][Math.floor(Math.random() * 3)];

  const getCuisineColor = (index) => {
    const colors = [
      'from-orange-500 to-red-500', // Warm spices
      'from-yellow-400 to-orange-400', // Golden dishes
      'from-amber-600 to-orange-600', // Rich stews
      'from-red-600 to-pink-500', // Vibrant sauces
      'from-emerald-500 to-green-400', // Fresh herbs
      'from-purple-500 to-pink-500', // Exotic flavors
    ];
    return colors[index % colors.length];
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={fetchRestaurants} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-r from-orange-600 via-red-500 to-amber-500 text-white py-16 shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 font-serif drop-shadow-lg">
            Taste of Africa
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Discover authentic African flavors across Russia. From spicy jollof rice to savory tagines, 
            experience culinary traditions that tell stories.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <span className="text-lg">🏙️</span>
              <span>{restaurants.length} Restaurants</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <span className="text-lg">🌍</span>
              <span>African Cuisine</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <span className="text-lg">⭐</span>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 -mt-8 relative z-10">
        <div className="grid gap-8">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
                hoveredRestaurant === restaurant.id 
                  ? 'scale-[1.02] shadow-3xl' 
                  : 'hover:scale-[1.01] hover:shadow-xl'
              }`}
              onMouseEnter={() => setHoveredRestaurant(restaurant.id)}
              onMouseLeave={() => setHoveredRestaurant(null)}
            >
              {/* Restaurant Card */}
              <div className="flex flex-col lg:flex-row">
                {/* Food Image Section */}
                <div className="lg:w-2/5 relative group overflow-hidden">
                  <div className="aspect-w-16 aspect-h-12 h-64 lg:h-full">
                    <img
                      src={getFoodImage(index)}
                      alt={restaurant.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Premium Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      African
                    </span>
                    {restaurant.delivery && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        🚚 Delivery
                      </span>
                    )}
                  </div>

                  {/* Rating Overlay */}
                  {restaurant.averageRating > 0 && (
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-lg">★</span>
                        <span className="font-bold">{restaurant.averageRating.toFixed(1)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                            <span className="text-orange-500">📍</span>
                            {restaurant.city.replace(/_/g, ' ')}
                          </span>
                          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                            <span className="text-green-500">⏱️</span>
                            {getDeliveryTime()} min
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleRestaurant(restaurant.id)}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        View Menu
                        <svg 
                          className={`w-4 h-4 transform transition-transform ${
                            expandedRestaurant === restaurant.id ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      Experience the authentic taste of Africa with traditional recipes passed down through generations. 
                      Each dish tells a story of culture and heritage.
                    </p>

                    {/* Quick Stats */}
                    <div className="flex gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Fresh Ingredients</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Traditional Recipes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Halal Options</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Menu Section */}
              {expandedRestaurant === restaurant.id && (
                <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-bold text-gray-900 font-serif">Featured Dishes</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{dishes[restaurant.id]?.length || 0} items</span>
                      </div>
                    </div>

                    {dishes[restaurant.id] && dishes[restaurant.id].length > 0 ? (
                      <div className="grid gap-4">
                        {dishes[restaurant.id].map((dish, dishIndex) => (
                          <div 
                            key={dish.id}
                            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300 group"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h5 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                  {dish.name}
                                </h5>
                                {dish.isSpicy && (
                                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                                    🌶️ Spicy
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                {dish.description}
                              </p>
                              {dish.ingredients && (
                                <p className="text-xs text-gray-500">
                                  {dish.ingredients}
                                </p>
                              )}
                            </div>
                            <div className="text-right ml-6">
                              <p className="text-lg font-bold text-gray-900 mb-1">{dish.price} ₽</p>
                              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300">
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-gray-600 text-lg mb-2">Menu Coming Soon</p>
                        <p className="text-gray-500">Our chef is preparing something special!</p>
                      </div>
                    )}

                    {/* Call to Action */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex gap-4">
                        <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
                          🛵 Order Now
                        </button>
                        <button className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-2xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
                          View Full Menu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;