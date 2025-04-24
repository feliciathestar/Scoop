import React from 'react';
import { Link } from 'react-router-dom';

const PricingSection: React.FC = () => {
  return (
    <section id="prices" className="bg-slate-950">
      <div className="max-w-screen-xl sm:px-7 px-4 py-10 lg:py-16 mx-auto">
        <div className="xl:items-center xl:-mx-8 xl:flex">
          <div className="flex flex-col items-center xl:items-start xl:mx-8">
            <h2 className="text-4xl font-medium lg:text-5xl max-w-[400px] text-white">
              Our <span className="text-purple-500 font-bold"
                style={{fontFamily: '"Nothing You Could Do", cursive'}}>Pricing</span> Plan
            </h2>
            <div className="mt-4">
              <span className="inline-block w-40 h-1 bg-purple-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-purple-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-purple-500 rounded-full"></span>
            </div>
          </div>

          <div className="flex-1 xl:mx-8">
            <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
              {/* Essential plan card */}
              <div className="max-w-sm mx-auto border rounded-lg md:mx-4 bg-white">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl">Essential</h2>
                  <p className="mt-4 text-gray-500">
                    Daily news summaries tailored to your industry, packaged into a customizable podcast
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl">
                    $0.00 <span className="text-base font-medium">/Month</span>
                  </h2>
                  <p className="mt-1 text-gray-500">Free</p>
                  <Link to="/signup" className="block w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transform bg-purple-500 rounded-full hover:bg-purple-600 focus:outline-none focus:bg-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-80 text-center">
                    Start Now
                  </Link>
                </div>
                <hr className="border-gray-200" />
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-700 capitalize lg:text-xl">What's included:</h2>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Daily news summaries
                    </li>
                    <li className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      1 industry focus
                    </li>
                    <li className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Basic customization
                    </li>
                  </ul>
                </div>
              </div>

              {/* Premium plan card */}
              <div className="max-w-sm mx-auto border rounded-lg md:mx-4 bg-white">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl">Premium</h2>
                  <p className="mt-4 text-gray-500">
                    Enhanced news experience with audio podcasts and multiple industry coverage
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl">
                    $10.00 <span className="text-base font-medium">/month</span>
                  </h2>
                  <p className="mt-1 text-gray-500">Monthly Payment</p>
                  <Link to="/signup" className="block w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transform bg-purple-500 rounded-full hover:bg-purple-600 focus:outline-none focus:bg-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-80 text-center">
                    Start Now
                  </Link>
                </div>
                <hr className="border-gray-200" />
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-700 capitalize lg:text-xl">What's included:</h2>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Daily news summaries
                    </li>
                    <li className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Audio podcast versions
                    </li>
                    <li className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Multiple industry focus
                    </li>
                    <li className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Advanced customization
                    </li>
                    <li className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Priority updates
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
