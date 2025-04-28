import React from 'react';
import { useTransition } from '../context/TransitionContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { isTransitioning } = useTransition();

  return (
    <>
      {/* Overlay that appears during transitions */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-all duration-300">
          <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-800 font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Page content */}
      <div className={isTransitioning ? 'pointer-events-none' : ''}>
        {children}
      </div>
    </>
  );
};

export default PageTransition;