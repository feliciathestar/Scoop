import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="bg-gradient-to-b from-black to-slate-950">
      <div className="mx-auto sm:px-7 px-4 max-w-screen-xl">
        <div className="gap-x-6 px-4 py-16 mx-auto lg:grid xl:px-0 lg:grid-cols-12">
          <h1 id="typing" className="font-sans font-semibold text-gray-500 lg:col-span-12">
            Personalized Industry News
          </h1>
          <div data-aos="fade-down" data-aos-delay="50" className="mt-3 text-white lg:col-span-8 lg:mt-6">
            <h2 className="text-5xl font-medium lg:text-7xl">
              Your news, <span className="text-purple-500 font-bold" 
                style={{fontFamily: '"Nothing You Could Do", cursive'}}>personalized</span>
              <br className="max-sm:hidden lg:hidden xl:block" />and simplified
            </h2>
          </div>
          <div data-aos="fade-down" data-aos-delay="100" className="lg:col-start-9 lg:col-span-4">
            <p className="max-w-3xl mt-4 text-gray-400 text-[20px] leading-[26px] lg:mt-8">
              Consolidate your industry news into customizable summaries or listen as podcasts. Stay informed, save time.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center pb-16">
          <Link to="/signup" className="bg-purple-500 text-white font-bold py-3 px-8 rounded-3xl hover:bg-purple-600 transition-colors">
            Get started for free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
