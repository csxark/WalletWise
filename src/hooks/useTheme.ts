import { useState, useLayoutEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use useLayoutEffect to apply theme before paint to prevent flash
  useLayoutEffect(() => {
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

    // Apply theme immediately
    const root = document.documentElement;
    if (initialTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setIsDark(initialTheme);
    setIsLoaded(true);
  }, []);

  // Handle theme changes with transition
  const setTheme = (dark: boolean) => {
    const root = document.documentElement;
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  const toggleTheme = () => {
    setIsDark(prev => {
      setTheme(!prev);
      return !prev;
    });
  };

  return { isDark, toggleTheme, isLoaded };
};