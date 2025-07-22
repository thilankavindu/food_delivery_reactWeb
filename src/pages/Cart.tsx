import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, ArrowRightIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
const Cart = () => {
  const {
    state
  } = useCart();
  const {
    items,
    total
  } = state;
  if (items.length === 0) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBagIcon size={64} className="mx-auto text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-gray-600">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/" className="mt-8 inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>;
  }
  return <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            {items.map(item => <CartItem key={item.id} item={item} />)}
          </div>
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-sm text-gray-600">Shipping estimate</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${(total + 5).toFixed(2)}
                  </dd>
                </div>
              </dl>
              <div className="mt-6">
                <Link to="/checkout" className="w-full flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
                  Proceed to Checkout{' '}
                  <ArrowRightIcon size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Cart;