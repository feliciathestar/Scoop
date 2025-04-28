import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';

export function usePageTransition() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startTransition } = useTransition();

  const navigateWithTransition = useCallback(
    async (to: string) => {
      // Only apply transitions when going from login/signup to generate-podcast
      const shouldTransition = 
        (location.pathname === '/login' || location.pathname === '/signup') && 
        to === '/generate-podcast';

      if (shouldTransition) {
        // Start transition effect
        await startTransition();
        // Navigate to the new page after transition effect
        navigate(to);
      } else {
        // Navigate immediately without transition
        navigate(to);
      }
    },
    [navigate, startTransition, location.pathname]
  );

  return { navigateWithTransition };
}