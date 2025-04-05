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
      className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden focus:outline-none group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        background: isDark 
          ? 'linear-gradient(to top right, rgba(79, 70, 229, 0.2), rgba(124, 58, 237, 0.2))'
          : 'linear-gradient(to top right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))'
      }}
    >
      {/* Button highlight effect */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: isDark 
            ? 'radial-gradient(circle at center, rgba(129, 140, 248, 0.2) 0%, transparent 70%)' 
            : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
        }}
        initial={false}
        animate={{ scale: [0.8, 1.1, 1] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
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
      
      {/* Icon container with enhanced visibility */}
      <div className="relative z-10 w-6 h-6">
        {/* Sun icon with improved visibility */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: isDark ? 0 : 1 }}
          animate={{ 
            rotate: isDark ? 180 : 0, 
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-yellow-500 drop-shadow-md" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        </motion.div>
        
        {/* Moon icon with improved visibility */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: isDark ? 1 : 0 }}
          animate={{ 
            rotate: !isDark ? -180 : 0, 
            opacity: !isDark ? 0 : 1,
            scale: !isDark ? 0.5 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-indigo-200 drop-shadow-lg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </div>
      
      {/* Button glow effect on hover */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: isDark 
            ? '0 0 15px rgba(129, 140, 248, 0.5)' 
            : '0 0 15px rgba(99, 102, 241, 0.3)',
          transition: 'opacity 0.3s ease'
        }}
      />
    </button>
  );
} 