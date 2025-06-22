import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get initial theme preference
    const getInitialTheme = () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved) {
          return saved === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    };

    const initialTheme = getInitialTheme();
    
    // Apply theme immediately to prevent flash
    const applyTheme = (dark: boolean) => {
      const root = document.documentElement;
      if (dark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    // Set theme synchronously
    setIsDark(initialTheme);
    applyTheme(initialTheme);
    
    // Mark as loaded after a brief delay to ensure smooth rendering
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Apply theme with transition
      const root = document.documentElement;
      root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      // Remove transition after animation
      setTimeout(() => {
        root.style.transition = '';
      }, 300);
    }
  }, [isDark, isLoaded]);

  const toggleTheme = () => {
    if (isLoaded) {
      setIsDark(prev => !prev);
    }
  };

  return { isDark, toggleTheme, isLoaded };
};