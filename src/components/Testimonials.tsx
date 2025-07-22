import React from 'react';
import { StarIcon } from 'lucide-react';
const Testimonials = () => {
  const testimonials = [{
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
    text: 'The food is always fresh and delivered quickly. My go-to for lunch during busy workdays!'
  }, {
    id: 2,
    name: 'Michael Chen',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'Amazing variety and great quality. The app is also super easy to use. Highly recommend!'
  }, {
    id: 3,
    name: 'Emma Wilson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    text: 'Consistently good food and reliable delivery. Their customer service is also excellent.'
  }];
  return <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Don't just take our word for it
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} size={16} className={i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Testimonials;