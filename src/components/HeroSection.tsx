import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return <div className="bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Delicious Food <span className="text-orange-500">Delivered</span>{' '}
              To Your Door
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Fresh ingredients, tasty meals, fast delivery. Order your favorite
              food with just a few clicks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                Order Now <ArrowRightIcon size={18} className="ml-2" />
              </Link>
              <Link to="/menu" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                View Menu
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Delicious pizza" className="w-full rounded-lg shadow-xl" />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full w-3 h-3 mr-2"></div>
                <span className="font-medium">Fast Delivery</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">30 min or less</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;