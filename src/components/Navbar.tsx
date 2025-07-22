import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, MenuIcon, XIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    state
  } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  return <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-orange-500">
                QuickBite
              </span>
            </Link>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-900 hover:text-orange-500 px-3 py-2 font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-gray-900 hover:text-orange-500 px-3 py-2 font-medium">
              Menu
            </Link>
            <Link to="/about" className="text-gray-900 hover:text-orange-500 px-3 py-2 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-900 hover:text-orange-500 px-3 py-2 font-medium">
              Contact
            </Link>
            <Link to="/cart" className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md font-medium flex items-center">
              <ShoppingBagIcon size={18} className="mr-1" />
              <span>Cart ({itemCount})</span>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none">
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-900 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link to="/menu" className="block px-3 py-2 text-gray-900 hover:text-orange-500 font-medium">
              Menu
            </Link>
            <Link to="/about" className="block px-3 py-2 text-gray-900 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-900 hover:text-orange-500 font-medium">
              Contact
            </Link>
            <Link to="/cart" className="block px-3 py-2 text-orange-500 font-medium flex items-center">
              <ShoppingBagIcon size={18} className="mr-1" />
              <span>Cart ({itemCount})</span>
            </Link>
          </div>
        </div>}
    </nav>;
};
export default Navbar;