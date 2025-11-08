// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Clock } from 'lucide-react';

const Home = () => {
  const featuredDishes = [
    {
      id: 1,
      name: 'Jollof Rice',
      description: 'Traditional West African rice dish cooked in a rich tomato sauce',
      price: 15.99,
      rating: 4.8,
      image:'src/images/jollof.png',
      vendor: 'Taste of Lagos'
    },
    {
      id: 2,
      name: 'Suya',
      description: 'Spicy Nigerian skewered beef with peanut spice rub',
      price: 12.99,
      rating: 4.9,
      image: 'src/images/suya.png',
      vendor: 'Abuja Grill'
    },
    {
      id: 3,
      name: 'Injera with Wat',
      description: 'Ethiopian sourdough flatbread with spicy stew',
      price: 18.99,
      rating: 4.7,
      image: 'src/images/injeth.png',
      vendor: 'Addis Ababa Kitchen'
    }
  ];

  const cities = ['Moscow', 'Saint Petersburg', 'Kazan', 'Novosibirsk', 'Yekaterinburg'];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-african-red to-african-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Taste Authentic African Cuisine
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover the rich flavors of Africa right here in Russia. 
              From home cooks to professional chefs, experience authentic meals across multiple cities.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-lg">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search for dishes, restaurants, or cities..."
                  className="w-full px-4 py-3 text-gray-900 focus:outline-none"
                />
                <button className="bg-african-gold text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Available Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cities.map((city) => (
              <div
                key={city}
                className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <MapPin className="h-8 w-8 text-african-red mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">{city}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Trending Dishes</h2>
            <Link to="/dishes" className="text-african-red hover:text-red-700 font-semibold">
              View All →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
  {featuredDishes.map((dish) => (
    <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Container - Fixed height with proper image sizing */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{dish.name}</h3>
          <span className="text-african-gold font-bold">${dish.price}</span>
        </div>
        <p className="text-gray-600 mb-4">{dish.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-700">{dish.rating}</span>
          </div>
          <span className="text-sm text-gray-500">{dish.vendor}</span>
        </div>
        <button className="w-full mt-4 bg-african-red text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
          Order Now
        </button>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-african-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-City Delivery</h3>
              <p className="text-gray-600">
                Get authentic African meals delivered across major Russian cities
              </p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-african-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Vendors</h3>
              <p className="text-gray-600">
                All our vendors and home cooks are verified for quality and authenticity
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-african-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to satisfy your cravings
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;