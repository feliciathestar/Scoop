import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: () => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

interface TransitionProviderProps {
  children: ReactNode;
  transitionDuration?: number;
}

export const TransitionProvider: React.FC<TransitionProviderProps> = ({
  children,
  transitionDuration = 800 // Default transition time in milliseconds
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback(async () => {
    setIsTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, transitionDuration));
    setIsTransitioning(false);
  }, [transitionDuration]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};