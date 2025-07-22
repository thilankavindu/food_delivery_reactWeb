import React, { useEffect, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, HomeIcon, MessageSquareIcon, AlertCircleIcon } from 'lucide-react';
const OrderConfirmation = () => {
  // Get order number from localStorage or generate a new one
  const [orderNumber, setOrderNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderSummary, setOrderSummary] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  useEffect(() => {
    // Retrieve data from localStorage
    const storedOrderNumber = localStorage.getItem('orderNumber') || `QB-${Math.floor(10000 + Math.random() * 90000)}`;
    const storedWhatsappNumber = localStorage.getItem('whatsappNumber') || '+94752079439';
    const storedCustomerName = localStorage.getItem('customerName') || '';
    const storedOrderSummary = localStorage.getItem('orderSummary') || '';
    const storedWhatsappUrl = localStorage.getItem('whatsappUrl') || '';
    const autoOpenWhatsApp = localStorage.getItem('autoOpenWhatsApp') === 'true';
    setOrderNumber(storedOrderNumber);
    setWhatsappNumber(storedWhatsappNumber);
    setCustomerName(storedCustomerName);
    setOrderSummary(storedOrderSummary);
    setWhatsappUrl(storedWhatsappUrl);
    // Automatically open WhatsApp when the page loads
    if (autoOpenWhatsApp && storedWhatsappUrl) {
      setTimeout(() => {
        window.open(storedWhatsappUrl, '_blank');
        setMessageSent(true);
        // Reset the auto-open flag so it doesn't open again on page refresh
        localStorage.setItem('autoOpenWhatsApp', 'false');
      }, 1000);
    }
  }, []);
  // Function to handle WhatsApp message
  const handleSendWhatsAppMessage = () => {
    if (!whatsappNumber) {
      setPhoneError('Please enter a WhatsApp number to send a message');
      return;
    }
    // Format the WhatsApp message
    const message = encodeURIComponent(`
Hello QuickBite!
I've placed an order #${orderNumber}.
${orderSummary}
Customer: ${customerName}
Delivery Address: 123 Delivery Street, Cityville
Please confirm my order. Thank you!
    `.trim());
    // Format the phone number correctly for WhatsApp
    let formattedNumber = whatsappNumber.replace(/\D/g, '');
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
    window.open(whatsappUrl, '_blank');
    setMessageSent(true);
    localStorage.setItem('whatsappUrl', whatsappUrl);
  };
  // Function to update WhatsApp number manually if needed
  const updateWhatsAppNumber = e => {
    setWhatsappNumber(e.target.value);
    setPhoneError('');
  };
  return <div className="bg-gray-50 min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center">
            <CheckCircleIcon size={64} className="text-green-500" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-xl text-gray-600">
            Your order has been confirmed
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Order number: {orderNumber}
          </p>
          {messageSent ? <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center text-green-600 mb-4">
                <CheckCircleIcon size={24} className="mr-2" />
                <h2 className="text-lg font-medium">WhatsApp Message Sent</h2>
              </div>
              <p className="text-gray-600">
                Your order details have been sent to WhatsApp. If you need to
                send it again, use the button below.
              </p>
              <button onClick={handleSendWhatsAppMessage} className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors">
                <MessageSquareIcon size={18} className="mr-2" />
                Send Again via WhatsApp
              </button>
            </div> : <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                WhatsApp Order Updates
              </h2>
              <div className="mb-4">
                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm your WhatsApp number:
                </label>
                <div className="flex items-center">
                  <input type="tel" id="whatsappNumber" value={whatsappNumber} onChange={updateWhatsAppNumber} placeholder="e.g. +94752079439" className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                </div>
                {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                  <AlertCircleIcon size={16} className="mr-1 text-orange-500" />
                  WhatsApp should open automatically. If not, click the button
                  below.
                </p>
              </div>
              <button onClick={handleSendWhatsAppMessage} className="w-full flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors">
                <MessageSquareIcon size={18} className="mr-2" />
                Send Order Details via WhatsApp
              </button>
            </div>}
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Order Details
          </h2>
          <div className="border-t border-gray-200 pt-4">
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Estimated Delivery Time
              </h3>
              <p className="text-gray-600">30-45 minutes</p>
            </div>
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Delivery Address
              </h3>
              <p className="text-gray-600">123 Delivery Street</p>
              <p className="text-gray-600">Cityville, State 12345</p>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-2">
                Order Status
              </h3>
              <div className="relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 mb-4">
                  <div className="w-1/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Order Received</span>
                  <span>Preparing</span>
                  <span>On the way</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
            <HomeIcon size={18} className="mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>;
};
export default OrderConfirmation;