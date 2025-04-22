import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section id="CTA">
      <div className="max-w-screen-xl sm:px-7 px-4 py-10 lg:py-20 mx-auto">
        <div className="p-10 lg:p-20 bg-gradient-to-b from-white to-gray-300 rounded-lg">
          <div className="lg:grid lg:grid-cols-12 items-center">
            <div className="text-black lg:col-span-8 flex flex-col">
              <h2 className="font-semibold text-gray-400 lg:col-span-12">AI-powered no code apps</h2>
              <h2 className="text-4xl font-medium lg:text-7xl"><span className="text-purple-500 font-bold"
                  style={{fontFamily: '"Nothing You Could Do", cursive'}}>Ready</span> to get started ?</h2>
              <span className="text-gray-600 pt-4 text-[20px] leading-[26px]">
                We have a generous free tier available to get you started right away.
              </span>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-start-9 lg:col-span-4 flex">
              <a href=""
                className="ml-0 lg:ml-auto bg-purple-500 text-white font-bold py-2 px-8 rounded-3xl text-2xl hover:bg-purple-600">
                Get started for free
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
