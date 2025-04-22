import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <div className="mx-auto sm:px-7 px-4 max-w-screen-xl py-10">
        <nav className="flex px-4 xl:px-0" aria-label="Global">
          <Link className="text-2xl font-semibold" to="/">Scoop</Link>
          <div className="flex flex-row items-center gap-5 ml-auto">
            <Link className="font-medium" to="/" aria-current="page">Home</Link>
            <a className="font-medium text-gray-600 hover:text-white" href="#prices">Prices</a>
            <a className="font-medium text-gray-600 hover:text-white" href="#articles">Articles</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
