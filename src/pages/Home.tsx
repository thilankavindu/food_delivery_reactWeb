import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedItems from '../components/FeaturedItems';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
const Home = () => {
  return <div className="w-full">
      <HeroSection />
      <FeaturedItems />
      <HowItWorks />
      <Testimonials />
    </div>;
};
export default Home;