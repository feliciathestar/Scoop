import React, { useEffect } from 'react';
import AOS from 'aos';
import Typewriter from 'typewriter-effect/dist/core';
import HeroSection from '../components/sections/HeroSection';
import CTASection from '../components/sections/CTASection';
import PricingSection from '../components/sections/PricingSection';

const Home: React.FC = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init();
    
    // Initialize typewriter
    const app = document.getElementById('typing');
    if (app) {
      const typewriter = new Typewriter(app, {
        loop: true
      });
      
      typewriter
        .typeString('Stay up-to-date')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Listen on the move')
        .pauseFor(1000)
        .start();
    }
  }, []);

  return (
    <main>
      <HeroSection />
      <CTASection />
      <PricingSection />
    </main>
  );
};

export default Home;
