import React from 'react';
import { MapPin, Phone, Mail, Edit3, Truck, Star } from 'lucide-react';

const VendorHeader = ({ vendor }) => {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Vendor Image */}
        <VendorAvatar name={vendor.name} />
        
        {/* Vendor Info */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <VendorBasicInfo vendor={vendor} />
            <VendorActions />
          </div>
          <VendorContactInfo vendor={vendor} />
        </div>
      </div>
    </div>
  );
};

const VendorAvatar = ({ name }) => (
  <div className="flex-shrink-0">
    <div className="w-24 h-24 bg-gradient-to-br from-african-red to-african-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
      {name.charAt(0)}
    </div>
  </div>
);

const VendorBasicInfo = ({ vendor }) => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
    <div className="flex items-center space-x-4 mt-2">
      <RatingDisplay 
        rating={vendor.averageRating} 
        totalRatings={vendor.totalRatings} 
      />
      <LocationInfo city={vendor.city} />
      {vendor.delivery && <DeliveryIndicator />}
    </div>
  </div>
);

const RatingDisplay = ({ rating, totalRatings }) => (
  <div className="flex items-center space-x-1">
    <Star className="h-5 w-5 text-yellow-400 fill-current" />
    <span className="text-lg font-semibold text-gray-900">
      {(rating || 0).toFixed(1)}
    </span>
    <span className="text-gray-500">({totalRatings || 0} reviews)</span>
  </div>
);

const LocationInfo = ({ city }) => (
  <div className="flex items-center space-x-1 text-gray-600">
    <MapPin className="h-4 w-4" />
    <span>{city}</span>
  </div>
);

const DeliveryIndicator = () => (
  <div className="flex items-center space-x-1 text-african-green">
    <Truck className="h-4 w-4" />
    <span>Delivery Available</span>
  </div>
);

const VendorActions = () => (
  <div className="flex space-x-3 mt-4 md:mt-0">
    <button className="btn-outline flex items-center space-x-2">
      <Edit3 className="h-4 w-4" />
      <span>Edit Profile</span>
    </button>
  </div>
);

const VendorContactInfo = ({ vendor }) => (
  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
    {vendor.address && (
      <ContactItem icon={MapPin} text={vendor.address} />
    )}
    {vendor.businessOwner?.phone && (
      <ContactItem icon={Phone} text={vendor.businessOwner.phone} />
    )}
    {vendor.businessOwner?.email && (
      <ContactItem icon={Mail} text={vendor.businessOwner.email} />
    )}
  </div>
);

const ContactItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-1">
    <Icon className="h-4 w-4" />
    <span>{text}</span>
  </div>
);

export default VendorHeader;