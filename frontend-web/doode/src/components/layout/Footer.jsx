// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Utensils className="h-8 w-8 text-african-red" />
              <span className="text-2xl font-bold">Doode</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting food lovers with authentic African meals across multiple cities in Russia. 
              Discover the rich flavors of Africa from local vendors and home cooks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-african-red transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-african-red transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-african-red transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-african-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-300 hover:text-african-red transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/dishes" className="text-gray-300 hover:text-african-red transition-colors">
                  Dishes
                </Link>
              </li>
              <li>
                <Link to="/vendor" className="text-gray-300 hover:text-african-red transition-colors">
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-african-red" />
                <span className="text-gray-300">Multiple cities across Russia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-african-red" />
                <span className="text-gray-300">+7 (XXX) XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-african-red" />
                <span className="text-gray-300">support@doode.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Doode. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-african-red text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-african-red text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;