'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  isAnimating: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
  isAnimating: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Initialize theme from localStorage and system preference
  useEffect(() => {
    // Get saved theme or check system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Apply theme immediately
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
      applyDarkModeStyles(true);
    } else {
      document.documentElement.classList.remove('dark');
      applyDarkModeStyles(false);
    }
    
    setMounted(true);
  }, []);
  
  // Apply dark mode directly to body for immediate visual feedback
  const applyDarkModeStyles = (isDark: boolean) => {
    const body = document.body;
    
    if (isDark) {
      body.style.backgroundColor = '#000000'; // changed to pure black
      body.style.color = '#ffffff'; // changed to pure white
    } else {
      body.style.backgroundColor = '#ffffff'; // white
      body.style.color = '#111827'; // dark gray
    }
  };
  
  const toggleTheme = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsAnimating(true);
    
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      // Save to localStorage
      localStorage.setItem('theme', newTheme);
      
      // Apply dark mode class to document
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Apply immediate style changes
      applyDarkModeStyles(newTheme === 'dark');
      
      return newTheme;
    });
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1300);
  };
  
  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
      {children}
    </ThemeContext.Provider>
  );
}; 