import React, { useState, useEffect } from 'react';
import { dishService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import DishCard from '../components/DishCard';

// Premium food images for different African cuisines
const FOOD_IMAGES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_IAuXn-90FRCnOoccQWxuvzV7Ge16qv-0PA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpzlYq3BYuryErMo2sDb9YysTdkWs-1QeWng&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROevRrpGR6c-vSo3mT4xpJrDCU69HDX1D-KA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGo4VicjjruN1Cjdf1wCWdTMucMfbKFEU6A&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROOZCT0gcrjv7pCTcZgNik30ecsspz9isrCQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbK-IdaiPLcSvBzhI6EJOwJRJ0NW_Q9sLmgg&s',
];

// Available cities (you can fetch these from your API too)
const CITIES = [
  'MOSCOW',
  'SAINT_PETERSBURG',
  'NOVOSIBIRSK',
  'YEKATERINBURG',
  'KAZAN',
  'Nizhny Novgorod',
  'OTHER'
];

// Price ranges
const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under ₽500', min: 0, max: 500 },
  { label: '₽500 - ₽1000', min: 500, max: 1000 },
  { label: '₽1000 - ₽2000', min: 1000, max: 2000 },
  { label: 'Over ₽2000', min: 2000, max: Infinity },
];

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [sortBy, setSortBy] = useState('name'); // name, price, rating

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [dishes, selectedCity, selectedPriceRange, sortBy]);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const data = await dishService.getAll();
      console.log(data);
      
      setDishes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dishes');
      console.error('Error fetching dishes:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...dishes];

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter(dish => 
        dish.city === selectedCity
      );
    }

    // Filter by price range
    filtered = filtered.filter(dish => 
      dish.price >= selectedPriceRange.min && 
      dish.price <= selectedPriceRange.max
    );

    // Sort dishes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return (b.averageRating || 0) - (a.averageRating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredDishes(filtered);
  };

  const handleOrderDish = (dish) => {
    console.log('Ordering dish:', dish);
    alert(`Added ${dish.name} to cart!`);
  };

  const handleFavoriteDish = (dish) => {
    console.log('Toggling favorite for dish:', dish);
    // Add your favorite logic here
  };

  const getFoodImage = (dishId) => {
    const index = dishId % FOOD_IMAGES.length;
    return FOOD_IMAGES[index];
  };

  const formatCityName = (city) => {
    return city ? city.replace(/_/g, ' ') : 'Unknown City';
  };

  const clearFilters = () => {
    setSelectedCity('');
    setSelectedPriceRange(PRICE_RANGES[0]);
    setSortBy('name');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={fetchDishes} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-r from-orange-600 via-red-500 to-amber-500 text-white py-16 shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 font-serif drop-shadow-lg">
            African Delicacies
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Explore authentic African dishes from restaurants across Russia. 
            Filter by city and price to find your perfect meal.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <span className="text-lg">🍽️</span>
              <span>{dishes.length} Dishes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <span className="text-lg">🏙️</span>
              <span>{CITIES.length} Cities</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <span className="text-lg">⭐</span>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-6xl mx-auto px-6 py-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* City Filter */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🌍 Filter by City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                >
                  <option value="">All Cities</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>
                      {formatCityName(city)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Price Range
                </label>
                <select
                  value={PRICE_RANGES.indexOf(selectedPriceRange)}
                  onChange={(e) => setSelectedPriceRange(PRICE_RANGES[e.target.value])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                >
                  {PRICE_RANGES.map((range, index) => (
                    <option key={index} value={index}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔄 Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                >
                  <option value="name">Name</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCity && (
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                City: {formatCityName(selectedCity)}
                <button onClick={() => setSelectedCity('')} className="hover:text-orange-900">
                  ×
                </button>
              </span>
            )}
            {selectedPriceRange.label !== 'Any Price' && (
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Price: {selectedPriceRange.label}
                <button onClick={() => setSelectedPriceRange(PRICE_RANGES[0])} className="hover:text-green-900">
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filteredDishes.length} Dishes Found
          </h2>
          <p className="text-gray-600">
            {selectedCity && `in ${formatCityName(selectedCity)}`}
            {selectedCity && selectedPriceRange.label !== 'Any Price' && ' • '}
            {selectedPriceRange.label !== 'Any Price' && selectedPriceRange.label.toLowerCase()}
          </p>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={{
                  id: dish.id,
                  name: dish.name,
                  description: dish.description || `Delicious ${dish.name} prepared with authentic African spices.`,
                  price: dish.price,
                  rating: dish.averageRating || 4.0,
                  imagePath: dish.imagePath,
                  vendor: dish.foodVendor?.name || 'African Restaurant',
                  city: dish.city ? formatCityName(dish.city) : '',
                  isFavorite: false
                }}
                onOrderClick={handleOrderDish}
                onFavoriteClick={handleFavoriteDish}
                showFavoriteButton={true}
                showVendorInfo={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-8xl mb-6">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Dishes Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters to see more results. We might not have dishes matching your current criteria.
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dishes;