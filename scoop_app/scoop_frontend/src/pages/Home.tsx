import React, { useEffect } from 'react';
import AOS from 'aos';
import Typewriter from 'typewriter-effect/dist/core';
import HeroSection from '../components/sections/HeroSection';
import ImageHeroSection from '../components/sections/ImageHeroSection';
import PricingSection from '../components/sections/PricingSection';
import ArticlesSection from '../components/sections/ArticlesSection';
import CTASection from '../components/sections/CTASection';

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
        .typeString('A personalized recommendation and news ingestion tool')
        .pauseFor(5000)
        .start();
    }
  }, []);

  return (
    <main>
      <HeroSection />
      <ImageHeroSection />
      <PricingSection />
      <ArticlesSection />
      <CTASection />
    </main>
  );
};

export default Home;
