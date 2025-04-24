import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section id="CTA" className="bg-gradient-to-b from-white to-gray-300">
      <div className="max-w-screen-xl sm:px-7 px-4 py-8 lg:py-12 mx-auto">
        <div className="p-6 lg:p-12 rounded-lg">
          <div className="lg:grid lg:grid-cols-12 items-center">
            <div className="text-black lg:col-span-12 flex flex-col text-center">
              <h2 className="font-semibold text-gray-400">Personalized News Recommendations</h2>
              <h2 className="text-4xl font-medium lg:text-7xl"><span className="text-purple-500 font-bold"
                  style={{fontFamily: '"Nothing You Could Do", cursive'}}>Transform</span> your news experience</h2>
              <span className="text-gray-600 pt-4 text-[20px] leading-[26px]">
                Get industry-specific news tailored to your preferences, delivered as summaries or podcasts.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
