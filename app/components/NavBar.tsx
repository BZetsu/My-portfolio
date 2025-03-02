'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine styles based on scroll and theme
  const headerStyle = isScrolled
    ? `fixed w-full top-0 left-0 z-50 ${isDark 
        ? 'bg-black/90 backdrop-blur-sm shadow-md shadow-black/10' 
        : 'bg-white/90 backdrop-blur-sm shadow-md shadow-black/5'}`
    : `fixed w-full top-0 left-0 z-50 ${isDark 
        ? 'bg-transparent' 
        : 'bg-transparent'}`;

  const textColor = isDark 
    ? isScrolled ? 'text-white' : 'text-white'
    : isScrolled ? 'text-gray-800' : 'text-gray-800';

  const hoverColor = isDark
    ? 'hover:text-indigo-400'
    : 'hover:text-indigo-600';

  const mobileMenuBg = isDark
    ? 'bg-black'
    : 'bg-white';

  return (
    <header className={headerStyle}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className={`text-xl font-bold ${textColor}`}>
            JB.Zetsu
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#about" className={`${textColor} ${hoverColor} transition-colors duration-300`}>
              About
            </a>
            <a href="#projects" className={`${textColor} ${hoverColor} transition-colors duration-300`}>
              Projects
            </a>
            <a href="#contact" className={`${textColor} ${hoverColor} transition-colors duration-300`}>
              Contact
            </a>
            <ThemeToggle />
          </nav>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`ml-4 ${textColor} focus:outline-none`}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden ${mobileMenuBg} border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#about" 
                className={`${textColor} ${hoverColor} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#projects" 
                className={`${textColor} ${hoverColor} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className={`${textColor} ${hoverColor} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default NavBar; 