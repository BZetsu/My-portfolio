'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LinkModal = ({ isOpen, onClose }: LinkModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Link items with staggered animation
  const links = [
    {
      name: "My LinkedIn",
      url: "https://linkedin.com/in/jamesbzetsu",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      url: "https://twitter.com/jamesbzetsu",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: "30 Minute Meeting - James Peter",
      url: "https://calendly.com/jamesbzetsu/30min",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] 
                       w-[90%] max-w-md rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'} 
                       overflow-hidden shadow-2xl border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header with gradient */}
            <div className="relative">
              <motion.button
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-full 
                          bg-black/10 hover:bg-black/20 text-white
                          transition-colors z-10`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              
              <div className={`p-8 text-center bg-gradient-to-br from-gray-900 to-black text-white`}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">JZ</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">James</h2>
                  <p className="text-sm text-gray-300">
                    I build stuff
                  </p>
                </motion.div>
              </div>
            </div>
            
            {/* Links with staggered animation */}
            <div className="p-6 space-y-3">
              {links.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-lg w-full
                            ${isDark 
                              ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} 
                            transition-all`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: isDark 
                      ? '0 4px 12px rgba(0,0,0,0.4)' 
                      : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center">
                    <div className="mr-3 p-2 rounded-full bg-black/10 text-gray-800 dark:text-white">
                      {link.icon}
                    </div>
                    <span>{link.name}</span>
                  </div>
                  <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
              ))}
            </div>
            
            {/* Footer */}
            <motion.div 
              className={`p-4 text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              © {new Date().getFullYear()} James Zetsu
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LinkModal; 