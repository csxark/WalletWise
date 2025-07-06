import { useState, useLayoutEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize state immediately from localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Apply theme to DOM immediately when component mounts
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setIsLoaded(true);
  }, []);

  // Apply theme changes to DOM whenever isDark changes
  useLayoutEffect(() => {
    if (isLoaded) {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, isLoaded]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      // Save to localStorage before reload
      localStorage.setItem('theme', next ? 'dark' : 'light');
      // Reload the page to force all styles to update
      window.location.reload();
      return next;
    });
  };

  return { isDark, toggleTheme, isLoaded };
};