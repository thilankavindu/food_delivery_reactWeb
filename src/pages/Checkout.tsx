import React, { useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCardIcon, LockIcon, MessageSquareIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
const Checkout = () => {
  const {
    state,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    total
  } = state;
  const shippingCost = 5.0;
  const orderTotal = total + shippingCost;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    whatsappNumber: '+94752079439',
    receiveUpdates: true
  });
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  // Function to format and send WhatsApp message
  const sendWhatsAppMessage = (orderNumber, orderSummary, customerName) => {
    // Format the WhatsApp message
    const message = encodeURIComponent(`
Hello QuickBite!
I've placed an order #${orderNumber}.
${orderSummary}
Customer: ${customerName}
Delivery Address: ${formData.address}, ${formData.city}
Please confirm my order. Thank you!
    `.trim());
    // Format the phone number correctly for WhatsApp
    let formattedNumber = formData.whatsappNumber.replace(/\D/g, '');
    // Handle different number formats
    if (formattedNumber.startsWith('0')) {
      // If starts with 0, assume it's a local number and add country code
      formattedNumber = '94' + formattedNumber.substring(1);
    } else if (formattedNumber.startsWith('94')) {
      // Already has Sri Lanka country code
      formattedNumber = formattedNumber;
    } else if (formattedNumber.startsWith('+94')) {
      // Remove the + if present
      formattedNumber = formattedNumber.substring(1);
    } else if (!formattedNumber.startsWith('94')) {
      // Add country code if not present
      formattedNumber = '94' + formattedNumber;
    }
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${message}`;
    // Store the WhatsApp URL for automatic opening on confirmation page
    localStorage.setItem('whatsappUrl', whatsappUrl);
    // Return the URL in case we want to open it immediately
    return whatsappUrl;
  };
  const handleSubmit = e => {
    e.preventDefault();
    setIsProcessing(true);
    // Generate random order number
    const orderNumber = `QB-${Math.floor(10000 + Math.random() * 90000)}`;
    // Store order data in localStorage for order confirmation page
    localStorage.setItem('whatsappNumber', formData.whatsappNumber);
    localStorage.setItem('customerName', formData.name);
    localStorage.setItem('orderNumber', orderNumber);
    localStorage.setItem('autoOpenWhatsApp', 'true');
    // Create order summary for WhatsApp message
    const orderItems = state.items.map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const orderSummary = `
Order Summary:
${orderItems}
Subtotal: $${total.toFixed(2)}
Shipping: $${shippingCost.toFixed(2)}
Total: $${orderTotal.toFixed(2)}
    `;
    localStorage.setItem('orderSummary', orderSummary.trim());
    // Prepare WhatsApp message URL
    if (formData.whatsappNumber && formData.receiveUpdates) {
      sendWhatsAppMessage(orderNumber, orderSummary.trim(), formData.name);
    }
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation');
    }, 2000);
  };
  if (state.items.length === 0) {
    navigate('/');
    return null;
  }
  return <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                      Postal code
                    </label>
                    <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select id="country" name="country" value={formData.country} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                      <option value="">Select a country</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center">
                      <MessageSquareIcon size={20} className="text-green-500 mr-2" />
                      <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                        WhatsApp Number (for order updates)
                      </label>
                    </div>
                    <input type="tel" id="whatsappNumber" name="whatsappNumber" placeholder="e.g. +94752079439" value={formData.whatsappNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    <div className="mt-2 flex items-center">
                      <input id="receiveUpdates" name="receiveUpdates" type="checkbox" checked={formData.receiveUpdates} onChange={handleChange} className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded" />
                      <label htmlFor="receiveUpdates" className="ml-2 text-sm text-gray-600">
                        Receive order updates via WhatsApp
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium text-gray-900 mb-6">
                  Payment Information
                </h2>
                <div className="flex items-center mb-4">
                  <CreditCardIcon size={20} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    Secure payment processing
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                      Name on card
                    </label>
                    <input type="text" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card number
                    </label>
                    <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required placeholder="1234 5678 9012 3456" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                      Expiry date (MM/YY)
                    </label>
                    <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required placeholder="MM/YY" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required placeholder="123" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <LockIcon size={16} className="text-green-500 mr-2" />
                  <span className="text-sm text-gray-500">
                    Your payment information is secure and encrypted
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <button type="submit" disabled={isProcessing} className={`w-full flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg transition-colors ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-orange-600'}`}>
                  {isProcessing ? 'Processing...' : `Pay $${orderTotal.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {state.items.map(item => <li key={item.id} className="py-4 flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Qty {item.quantity}
                        </p>
                      </div>
                    </li>)}
                </ul>
              </div>
              <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${shippingCost.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${orderTotal.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Checkout;