import React from 'react';
import { usePageTransition } from '../hooks/usePageTransition';

const Header: React.FC = () => {
  const { navigateWithTransition } = usePageTransition();

  return (
    <header className="bg-black">
      <div className="mx-auto sm:px-7 px-4 max-w-screen-xl py-6">
        <nav className="flex px-4 xl:px-0" aria-label="Global">
          <a 
            className="text-3xl font-bold text-white cursor-pointer" 
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition('/');
            }}
          >
            Scoop
          </a>
          <div className="flex flex-row items-center gap-8 ml-auto">
            <a className="font-medium text-gray-200 hover:text-white relative group" href="#prices">
              Prices
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              className="font-medium text-gray-200 hover:text-white relative group cursor-pointer" 
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition('/login');
              }}
            >
              Log in
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
