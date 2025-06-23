import { useState, useLayoutEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Handle theme changes with page reload
  const setTheme = (dark: boolean) => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    // Reload the page after setting the theme
    window.location.reload();
  };

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      setTheme(newTheme);
      return newTheme;
    });
  };

  return { isDark, toggleTheme, isLoaded };
};

