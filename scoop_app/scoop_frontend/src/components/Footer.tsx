import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl sm:px-7 px-4 py-10 lg:py-20 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h2 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">
              Subscribe our <span className="text-purple-500 font-bold" style={{fontFamily: '"Nothing You Could Do", cursive'}}>newsletter</span> to get update.
            </h2>
            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border focus:outline-purple-500 rounded-full" placeholder="Email Address" />
              <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transform md:w-auto md:mx-4 bg-purple-500 rounded-full hover:bg-purple-600">
                Subscribe
              </button>
            </div>
          </div>
          {/* Quick links and other footer content */}
        </div>
        <hr className="my-6 border-gray-200 md:my-8" />
        <div className="flex items-center justify-between">
          <a href="#" className="text-black text-2xl font-semibold">Scoop</a>
          <div className="flex -mx-2">
            {/* Social icons */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
