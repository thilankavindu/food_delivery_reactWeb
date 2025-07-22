import React from 'react';
import { SearchIcon, ClipboardListIcon, TruckIcon } from 'lucide-react';
const HowItWorks = () => {
  const steps = [{
    id: 1,
    icon: <SearchIcon size={32} className="text-orange-500" />,
    title: 'Browse Menu',
    description: 'Choose from our wide variety of delicious meals'
  }, {
    id: 2,
    icon: <ClipboardListIcon size={32} className="text-orange-500" />,
    title: 'Place Order',
    description: 'Customize your meal and add it to your cart'
  }, {
    id: 3,
    icon: <TruckIcon size={32} className="text-orange-500" />,
    title: 'Fast Delivery',
    description: 'Get your food delivered in 30 minutes or less'
  }];
  return <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Order your favorite food in just 3 simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(step => <div key={step.id} className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-orange-100 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorks;