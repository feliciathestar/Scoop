import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="bg-gradient-to-b from-black to-slate-950">
      <div className="mx-auto sm:px-7 px-4 max-w-screen-xl">
        <div className="gap-x-6 px-4 py-16 pb-64 mx-auto lg:grid xl:px-0 lg:grid-cols-12">
          <h1 id="typing" className="font-sans font-semibold text-gray-600 lg:col-span-12">
            Super tool overpowered by AI
          </h1>
          <div data-aos="fade-down" data-aos-delay="50" className="mt-3 text-white lg:col-span-8 lg:mt-6">
            <h2 className="text-5xl font-medium lg:text-7xl">
              Create tools with <span className="text-purple-500 font-bold" 
                style={{fontFamily: '"Nothing You Could Do", cursive'}}>AI</span>
              <br className="max-sm:hidden lg:hidden xl:block" />you actually want
            </h2>
          </div>
          <div data-aos="fade-down" data-aos-delay="100" className="lg:col-start-9 lg:col-span-4">
            <p className="max-w-3xl mt-4 text-gray-400 text-[20px] leading-[26px] lg:mt-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus et dolor filis!
            </p>
            <div className="flex mt-8 space-x-2 md:space-x-6">
              <a href="" className="bg-purple-500 text-white font-bold py-2 px-6 rounded-3xl">
                Get started for free
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
