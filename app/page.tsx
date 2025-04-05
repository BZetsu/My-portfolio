'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo, Suspense, lazy } from 'react';
import React from 'react';
import NavBar from './components/NavBar';
import SocialLinks from './components/SocialLinks';
import { useTheme } from './context/ThemeContext';
import CursorTrail from './components/CursorTrail';

// Lazy load heavy components
const ProjectsSection = dynamic(() => import('./sections/ProjectsSection'), {
  loading: () => <div className="h-[600px] flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading projects...</div>
  </div>,
  ssr: false
});

const AboutSection = dynamic(() => import('./sections/AboutSection'), {
  loading: () => <div className="h-[400px]"></div>,
  ssr: false
});

const ContactSection = dynamic(() => import('./sections/ContactSection'), {
  loading: () => <div className="h-[400px]"></div>,
  ssr: false
});

// Performance monitoring utility
const usePerformanceMode = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  useEffect(() => {
    // Check for low performance devices
    const checkPerformance = () => {
      // Detect mobile devices
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Use device memory API if available (Chrome only)
      const hasLowMemory = 'deviceMemory' in navigator && 
        // @ts-ignore - deviceMemory is not in the TypeScript navigator type
        (navigator.deviceMemory as number) < 4;
        
      // Check for slow CPU using hardwareConcurrency
      const hasLowCPU = navigator.hardwareConcurrency < 4;
      
      return isMobile || hasLowMemory || hasLowCPU;
    };
    
    setIsLowPerformance(checkPerformance());
    
    // Also detect if frames are dropping
    let frameTimes: number[] = [];
    let lastFrameTime = performance.now();
    
    const frameObserver = () => {
      const now = performance.now();
      const delta = now - lastFrameTime;
      lastFrameTime = now;
      
      frameTimes.push(delta);
      if (frameTimes.length > 10) {
        frameTimes.shift();
        
        // If average frame time is > 30ms (less than 33fps), enable low performance mode
        const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        if (avgFrameTime > 30) {
          setIsLowPerformance(true);
        }
      }
      
      if (!isLowPerformance) {
        requestAnimationFrame(frameObserver);
      }
    };
    
    requestAnimationFrame(frameObserver);
    
    return () => {
      frameTimes = [];
    };
  }, []);
  
  return isLowPerformance;
};

// Memoized cursor trail component to prevent unnecessary rerenders
const MemoizedCursorTrail = React.memo(CursorTrail);

// Optimized 3D scene loading with performance adaptations
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-black/50 dark:text-white/50">Loading 3D scene...</div>
    </div>
  )
});

// Custom hook for intersection observer
function useIntersectionObserver(
  elementRef: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) {
      return;
    }
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isIntersecting;
}

// Optimized Home component with performance improvements
export default function Home() {
  const { theme } = useTheme();
  const isLowPerformance = usePerformanceMode();
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const is3DVisible = useIntersectionObserver(splineContainerRef, { threshold: 0.1 });
  
  // Simplified roles array
  const roles = useMemo(() => [
    { text: "Designer", showPrefix: true }, 
    { text: "Fullstack Developer", showPrefix: true }, 
    { text: "Manager", showPrefix: true }, 
    { text: "Founder", showPrefix: true },
    { text: "I am James", showPrefix: false },
    { text: "You can call me Zetsu", showPrefix: false },
    { text: "Nice to meet you", showPrefix: false }
  ], []);
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  // Role switching with performance adaptation
  useEffect(() => {
    // Longer intervals on low-performance devices
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, isLowPerformance ? 4000 : 3000);
    
    return () => clearInterval(interval);
  }, [roles.length, isLowPerformance]);

  // Get isDark directly from theme for styling
  const isDark = theme === 'dark';

  // Performance-optimized render with direct styles
  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        backgroundColor: isDark ? '#000000' : '#ffffff',
        color: isDark ? '#ffffff' : '#171717',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      {/* Always render cursor trail */}
      <MemoizedCursorTrail />
      
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main content layout - completely redesigned */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative">
        {/* Text content - redesigned with new animation style */}
        <div className="col-span-1 lg:col-span-2 relative z-10 px-6 py-12 md:py-16 flex flex-col justify-center lg:justify-center items-center lg:items-end">
          <div className="lg:w-1/2 lg:pr-20 mt-24 md:mt-20 lg:mt-16">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-lg"
            >
              {/* Heading with role - removed portfolio label */}
              <div className="mb-8">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {roles[currentRoleIndex].showPrefix && (
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-black dark:from-gray-300 dark:to-gray-100">
                      I am a{" "}
                    </span>
                  )}
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentRoleIndex}
                      className="inline-block"
                      initial={{ opacity: 0, filter: "blur(8px)" }}
                      animate={{ 
                        opacity: 1, 
                        filter: "blur(0px)",
                        transition: { duration: 0.6 }
                      }}
                      exit={{ 
                        opacity: 0,
                        filter: "blur(8px)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-black dark:from-gray-200 dark:to-white relative inline-block gradient-text focus-in pb-2 overflow-visible">
                        {roles[currentRoleIndex].text}
                        <motion.span
                          className="absolute -right-4 top-0 bottom-0 w-[3px] bg-black dark:bg-white"
                          animate={{ 
                            opacity: [1, 0, 1],
                            transition: { 
                              repeat: Infinity, 
                              duration: 0.8
                            }
                          }}
                        />
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </motion.h1>
              </div>
              
              {/* Description */}
              <div className="mt-4">
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.5', 
                  color: theme === 'dark' ? '#DDDDDD' : '#000000',
                  fontWeight: 500,
                }}>
                  Crafting immersive digital experiences through code and design.
                  <br />
                  Specializing in interactive 3D web experiences and creative development.
                </p>
              </div>
              
              {/* Call to action buttons */}
              <motion.div 
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-800 to-black dark:from-gray-700 dark:to-gray-900 text-white font-medium transition-all relative overflow-hidden group hover:shadow-lg"
                >
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-gray-900 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
                
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-lg bg-transparent border border-gray-700 dark:border-gray-400 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all flex items-center hover:shadow-lg"
                >
                  Get in Touch
                  <svg 
                    className="ml-2 w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </motion.div>
              
              {/* Tech logos - fixed positioning and better visibility */}
              <motion.div
                className="mt-14 flex items-center flex-wrap gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-1 block w-full md:w-auto mb-2 md:mb-0 opacity-80">
                  Tech I work with:
                </span>
                
                <div className="flex flex-wrap gap-6 items-center">
                  {/* Logo 1: Cursor */}
                  <motion.div
                    whileHover={{ scale: 1.1, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-7 h-7 text-gray-700 dark:text-gray-300"
                  >
                    <img 
                      src="/cursor.svg" 
                      alt="Cursor" 
                      className="w-full h-full"
                    />
                  </motion.div>
                  
                  {/* Logo 2: Figma */}
                  <motion.div
                    whileHover={{ scale: 1.1, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-6 h-6"
                  >
                    <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill={isDark ? "#1ABCFE" : "#1ABCFE"}/>
                      <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill={isDark ? "#0ACF83" : "#0ACF83"}/>
                      <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill={isDark ? "#FF7262" : "#FF7262"}/>
                      <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill={isDark ? "#F24E1E" : "#F24E1E"}/>
                      <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill={isDark ? "#A259FF" : "#A259FF"}/>
                    </svg>
                  </motion.div>
                  
                  {/* Logo 3: Spline */}
                  <motion.div
                    whileHover={{ scale: 1.1, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-7 h-7"
                  >
                    <img 
                      src="/idpEx9OuCE_1743870884923.png" 
                      alt="Spline" 
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  
                  {/* Logo 4: Framer */}
                  <motion.div
                    whileHover={{ scale: 1.1, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-6 h-6"
                  >
                    <img 
                      src="/framer-svgrepo-com.svg" 
                      alt="Framer" 
                      className="w-full h-full"
                      style={{ filter: isDark ? 'invert(1)' : 'none' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Left side - 3D Spline component with optimized loading */}
        <div 
          ref={splineContainerRef}
          className="absolute inset-0 lg:inset-auto lg:left-0 lg:w-1/2 h-[70vh] lg:h-full z-10 pointer-events-auto"
        >
          <div className="absolute inset-0 w-[150%] lg:w-[140%] h-[110%] left-0 lg:left-[20%] bottom-[-5%] flex items-center justify-center will-change-transform transform-gpu">
            {/* Only load Spline when visible and not in low performance mode on mobile */}
            {is3DVisible && (
              <>
                {isLowPerformance && window.innerWidth < 768 ? (
                  // Simple fallback for low-performance mobile
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src="/robot-fallback.png" 
                      alt="3D Robot" 
                      className="object-contain max-w-full max-h-full"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-pulse text-black/50 dark:text-white/50">Loading 3D scene...</div>
                    </div>
                  }>
                    <div className="transform-gpu will-change-transform hardware-accelerated w-full h-full">
                      <Spline 
                        scene="https://prod.spline.design/1WM5NpYvXC5G168Z/scene.splinecode"
                        className="w-full h-full scale-[1.2] lg:scale-[1.35] will-change-transform hardware-accelerated"
                        style={{
                          transformOrigin: 'center center',
                          transform: 'translate3d(0, 0, 0)',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          perspective: '1000px',
                        }}
                      />
                    </div>
                  </Suspense>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Projects Section with optimized loading */}
      <div 
        className="relative z-10 -mt-10 mb-10"
      >
        <motion.div 
          className={`mx-4 md:mx-8 lg:mx-12 rounded-3xl ${
            isDark 
              ? 'bg-black backdrop-blur-sm border border-white/10 shadow-[0_20px_50px_rgba(255,_255,_255,_0.15)]' 
              : 'bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]'
          } overflow-hidden relative group`}
          whileHover={{ 
            y: -5, // Reduced movement for better performance
            boxShadow: theme === 'dark' 
              ? "0 30px 60px rgba(255, 255, 255, 0.2)" 
              : "0 30px 60px rgba(8, 112, 184, 0.3)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Ghost shiny message - conditionally rendered */}
          {!isLowPerformance && (
            <motion.div 
              className="absolute top-4 md:top-6 inset-x-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <motion.div
                className="text-xl md:text-2xl font-bold ghost-message whitespace-nowrap"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 8, 
                  ease: "linear" 
                }}
              >
                I like to build cool stuff
              </motion.div>
            </motion.div>
          )}
          
          <ProjectsSection />
        </motion.div>
      </div>
      
      {/* Remaining sections with optimized loading */}
      <AboutSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
        <SocialLinks />
        <p className="mt-4">© {new Date().getFullYear()} James Zetsu. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
