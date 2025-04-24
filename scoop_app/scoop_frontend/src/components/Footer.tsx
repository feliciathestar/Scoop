import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-black">
      <div className="max-w-screen-xl sm:px-7 px-4 py-5 lg:py-10 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-5 lg:grid-cols-4">
          
          {/* Quick links and other footer content */}
        </div>
        <hr className="my-4 border-gray-800 md:my-5" />
        <div className="flex items-center justify-between">
          <a href="#" className="text-white text-2xl font-semibold">Scoop</a>
          <div className="flex -mx-2">
            {/* Social icons */}
          </div>
        </div>
        <div className="text-center mt-4 text-gray-500 text-sm">
          <p>&copy; {currentYear} Scoop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
