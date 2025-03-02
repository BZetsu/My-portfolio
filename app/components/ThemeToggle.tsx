'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme, isAnimating } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={(e) => toggleTheme(e)}
      className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden focus:outline-none"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        background: isDark 
          ? 'linear-gradient(to top right, rgba(79, 70, 229, 0.1), rgba(124, 58, 237, 0.1))'
          : 'linear-gradient(to top right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))'
      }}
    >
      <div className="absolute inset-0 rounded-full opacity-10" />
      
      {/* Container for the liquid animation */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {isAnimating && (
          <motion.div
            className="absolute inset-0"
            style={{ 
              backgroundColor: isDark ? '#111827' : '#ffffff'
            }}
            initial={{ y: isDark ? '100%' : '-100%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        )}
        
        {/* Liquid bubbles animation */}
        {isAnimating && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{ 
                  backgroundColor: isDark ? '#1f2937' : '#f3f4f6'
                }}
                initial={{ 
                  x: Math.random() * 48 - 8, 
                  y: isDark ? 48 : -16,
                  opacity: 1,
                  scale: 0
                }}
                animate={{ 
                  y: isDark ? -16 : 48,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 1 + Math.random() * 0.5,
                  ease: "easeOut",
                  delay: Math.random() * 0.3
                }}
              />
            ))}
          </>
        )}
      </div>
      
      {/* Icon container */}
      <div className="relative z-10">
        {/* Sun icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: isDark ? 0 : 1 }}
          animate={{ rotate: isDark ? 180 : 0, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-yellow-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        </motion.div>
        
        {/* Moon icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: isDark ? 1 : 0 }}
          animate={{ rotate: !isDark ? -180 : 0, opacity: !isDark ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-indigo-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        </motion.div>
      </div>
    </button>
  );
} 