'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import useIsMobile from '../hooks/useIsMobile';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

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
        ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/20' 
        : 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/10'}`
    : `fixed w-full top-0 left-0 z-50 ${isDark 
        ? 'bg-black/70 backdrop-blur-sm' 
        : 'bg-white/70 backdrop-blur-sm'}`;

  const textColor = isDark 
    ? 'text-white' 
    : 'text-gray-800';

  const hoverColor = isDark
    ? 'hover:text-indigo-400'
    : 'hover:text-indigo-600';

  const mobileMenuBg = isDark
    ? 'bg-black/95'
    : 'bg-white/95';

  return (
    <>
      {/* Construction Banner */}
      <div className="fixed w-full top-0 left-0 z-[51] bg-yellow-400 p-2" 
           style={{
             background: 'repeating-linear-gradient(45deg, #f7b500, #f7b500 10px, #000000 10px, #000000 20px)'
           }}>
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="flex items-center bg-black/80 px-4 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm md:text-base font-bold text-yellow-400 tracking-wide uppercase">
              This site is still under construction, But you can walk with me
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-yellow-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Main Navigation - Adjusted top position to accommodate banner */}
      <header className={`${headerStyle} mt-10`}>
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a 
              href="#" 
              className={`text-lg md:text-xl font-bold ${textColor}`}
              style={{ fontFamily: "'Space Mono', monospace", letterSpacing: '0.15em' }}
            >
              JAMES
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
                className={`ml-4 ${textColor} p-2 focus:outline-none`}
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
            className={`md:hidden ${mobileMenuBg} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-lg`}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#about" 
                  className={`${textColor} ${hoverColor} py-3 px-2 text-lg font-medium transition-colors duration-300`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#projects" 
                  className={`${textColor} ${hoverColor} py-3 px-2 text-lg font-medium transition-colors duration-300`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </a>
                <a 
                  href="#contact" 
                  className={`${textColor} ${hoverColor} py-3 px-2 text-lg font-medium transition-colors duration-300`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
};

export default NavBar; 