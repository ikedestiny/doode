import React from 'react';

const AboutTab = ({ vendor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        About {vendor.name}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <BusinessInformation vendor={vendor} />
        <ContactInformation vendor={vendor} />
      </div>

      <DescriptionSection vendor={vendor} />
    </div>
  );
};

const BusinessInformation = ({ vendor }) => (
  <div>
    <SectionTitle>Business Information</SectionTitle>
    <dl className="space-y-3">
      <InfoItem 
        label="Owner" 
        value={vendor.businessOwner?.name || 'Not specified'} 
      />
      <InfoItem label="Location" value={vendor.city} />
      <InfoItem 
        label="Address" 
        value={vendor.address || 'Address not provided'} 
      />
      <InfoItem 
        label="Delivery" 
        value={vendor.delivery ? 'Available' : 'Not Available'} 
      />
    </dl>
  </div>
);

const ContactInformation = ({ vendor }) => (
  <div>
    <SectionTitle>Contact Information</SectionTitle>
    <dl className="space-y-3">
      {vendor.businessOwner?.phone && (
        <InfoItem label="Phone" value={vendor.businessOwner.phone} />
      )}
      {vendor.businessOwner?.email && (
        <InfoItem label="Email" value={vendor.businessOwner.email} />
      )}
    </dl>
  </div>
);

const DescriptionSection = ({ vendor }) => (
  <div className="mt-8">
    <SectionTitle>Our Story</SectionTitle>
    <p className="text-gray-600 leading-relaxed">
      {vendor.description || getDefaultDescription(vendor.name)}
    </p>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    {children}
  </h3>
);

const InfoItem = ({ label, value }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm text-gray-900">{value}</dd>
  </div>
);

const getDefaultDescription = (vendorName) => 
  `Welcome to ${vendorName}! We specialize in authentic African cuisine, bringing you the rich flavors and traditional recipes from across the continent. Every dish is prepared with care using fresh ingredients and traditional cooking methods.`;

export default AboutTab;