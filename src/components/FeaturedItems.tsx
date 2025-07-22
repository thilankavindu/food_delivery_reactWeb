import React from 'react';
import { StarIcon, ShoppingCartIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
const FeaturedItems = () => {
  const {
    addToCart
  } = useCart();
  const featuredItems = [{
    id: 1,
    name: 'Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 12.99,
    rating: 4.8,
    description: 'Classic cheese pizza with tomato sauce and fresh basil'
  }, {
    id: 2,
    name: 'Chicken Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 9.99,
    rating: 4.6,
    description: 'Juicy chicken patty with lettuce, tomato, and special sauce'
  }, {
    id: 3,
    name: 'Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 14.99,
    rating: 4.7,
    description: 'Creamy pasta with pancetta, egg, and parmesan cheese'
  }, {
    id: 4,
    name: 'Vegetable Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 8.99,
    rating: 4.5,
    description: 'Fresh mixed vegetables with house dressing'
  }];
  const handleAddToCart = item => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
  };
  return <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Items
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Our most loved dishes that keep customers coming back
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map(item => <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                  <div className="flex items-center px-2 py-1">
                    <StarIcon size={16} className="text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </span>
                  <button className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors" onClick={() => handleAddToCart(item)}>
                    <ShoppingCartIcon size={18} />
                  </button>
                </div>
              </div>
            </div>)}
        </div>
        <div className="mt-12 text-center">
          <button className="px-6 py-3 border border-orange-500 text-orange-500 font-medium rounded-lg hover:bg-orange-50 transition-colors">
            View Full Menu
          </button>
        </div>
      </div>
    </section>;
};
export default FeaturedItems;