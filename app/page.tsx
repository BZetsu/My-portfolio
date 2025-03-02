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
      
      {/* Main content layout with optimized rendering */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative">
        {/* Right side - Text content - BEHIND the robot */}
        <div className="col-span-1 lg:col-span-2 relative z-0 px-6 py-20 md:p-20 flex flex-col justify-center lg:justify-center items-center lg:items-end order-1">
          <div className="lg:w-1/2 lg:pr-20 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg"
            >
              <motion.span 
                className="inline-block mb-3 text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Portfolio
              </motion.span>
              
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  {roles[currentRoleIndex].showPrefix && (
                    <motion.span 
                      className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200 animate-gradient"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      I am a{" "}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white dark:text-glow inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        opacity: { duration: 0.3 },
                        y: { duration: 0.5 }
                      }
                    }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <span className="typewriter-container">
                      <span className="typewriter">
                        {roles[currentRoleIndex].text}
                      </span>
                    </span>
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <motion.p 
                className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 dark:text-glow-sm max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }} // Faster animation
              >
                Crafting immersive digital experiences through code and design.
                Specializing in interactive 3D web experiences and creative development.
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }} // Faster animation
              >
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all pointer-events-auto z-20 relative dark:text-glow-sm"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-transparent border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all pointer-events-auto z-20 relative flex items-center"
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
              
              {/* Tech Stack Logos - conditionally rendered based on performance */}
              {!isLowPerformance && (
                <motion.div
                  className="mt-8 flex flex-wrap gap-6 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">Tech I work with:</p>
                  
                  {/* Tech logos - simplified animations */}
                  {[
                    // Cursor Logo
                    <svg key="cursor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.0001 3.25C13.0001 2.55964 12.4154 2 11.6922 2C11.0521 2 10.5335 2.4223 10.4067 2.9723L5.47461 19.7198C5.31373 20.4256 5.83151 21.1049 6.55396 21.1049C6.98409 21.1049 7.36734 20.8505 7.52243 20.4591L9.16451 16.5H15.9394L17.5815 20.4591C17.7366 20.8505 18.1198 21.1049 18.55 21.1049C19.2724 21.1049 19.7902 20.4256 19.6293 19.7198L14.6972 2.9723C14.5704 2.4223 14.0518 2 13.4117 2C12.6885 2 12.1039 2.55964 12.1039 3.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.5498 12.5L15.9398 16.5H9.16479L12.5498 12.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>,
                    
                    // Figma Logo
                    <svg key="figma" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
                      <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill={theme === 'dark' ? '#1ABCFE' : '#1ABCFE'}/>
                      <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill={theme === 'dark' ? '#0ACF83' : '#0ACF83'}/>
                      <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill={theme === 'dark' ? '#FF7262' : '#FF7262'}/>
                      <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill={theme === 'dark' ? '#F24E1E' : '#F24E1E'}/>
                      <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill={theme === 'dark' ? '#A259FF' : '#A259FF'}/>
                    </svg>,
                    
                    // Spline Logo
                    <svg key="spline" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M375.743 150.501C393.169 150.501 407.32 136.364 407.32 118.924C407.32 101.485 393.169 87.348 375.743 87.348C358.317 87.348 344.166 101.485 344.166 118.924C344.166 136.364 358.317 150.501 375.743 150.501ZM278.902 90.3313C296.328 90.3313 310.479 76.1942 310.479 58.7548C310.479 41.3153 296.328 27.1782 278.902 27.1782C261.476 27.1782 247.325 41.3153 247.325 58.7548C247.325 76.1942 261.476 90.3313 278.902 90.3313ZM185.043 89.8361C202.469 89.8361 216.62 75.6989 216.62 58.2595C216.62 40.8201 202.469 26.6829 185.043 26.6829C167.617 26.6829 153.466 40.8201 153.466 58.2595C153.466 75.6989 167.617 89.8361 185.043 89.8361ZM115.762 168.435C133.188 168.435 147.339 154.298 147.339 136.859C147.339 119.419 133.188 105.282 115.762 105.282C98.336 105.282 84.1846 119.419 84.1846 136.859C84.1846 154.298 98.336 168.435 115.762 168.435ZM107.527 258.312C124.953 258.312 139.104 244.175 139.104 226.735C139.104 209.296 124.953 195.159 107.527 195.159C90.1008 195.159 75.9494 209.296 75.9494 226.735C75.9494 244.175 90.1008 258.312 107.527 258.312ZM133.267 348.189C150.693 348.189 164.844 334.052 164.844 316.612C164.844 299.173 150.693 285.036 133.267 285.036C115.841 285.036 101.69 299.173 101.69 316.612C101.69 334.052 115.841 348.189 133.267 348.189ZM208.385 413.326C225.811 413.326 239.962 399.189 239.962 381.749C239.962 364.31 225.811 350.173 208.385 350.173C190.959 350.173 176.808 364.31 176.808 381.749C176.808 399.189 190.959 413.326 208.385 413.326ZM304.214 423.203C321.64 423.203 335.791 409.066 335.791 391.626C335.791 374.187 321.64 360.05 304.214 360.05C286.788 360.05 272.637 374.187 272.637 391.626C272.637 409.066 286.788 423.203 304.214 423.203ZM376.727 374.187C394.153 374.187 408.304 360.05 408.304 342.61C408.304 325.171 394.153 311.034 376.727 311.034C359.301 311.034 345.15 325.171 345.15 342.61C345.15 360.05 359.301 374.187 376.727 374.187ZM427.076 286.294C444.502 286.294 458.653 272.157 458.653 254.717C458.653 237.278 444.502 223.141 427.076 223.141C409.65 223.141 395.499 237.278 395.499 254.717C395.499 272.157 409.65 286.294 427.076 286.294ZM435.312 194.911C452.738 194.911 466.889 180.774 466.889 163.334C466.889 145.895 452.738 131.758 435.312 131.758C417.886 131.758 403.735 145.895 403.735 163.334C403.735 180.774 417.886 194.911 435.312 194.911Z" fill={theme === 'dark' ? '#FF5533' : '#FF3A00'}/>
                      <path d="M172.256 189.176L230.568 211.089M125.984 232.678L213.138 270.951M309.12 113.971L254.376 196.198M354.648 147.527L277.824 255.32M243.432 347.684L165.384 301.029M371.016 212.583L293.952 250.857M366.888 270.951L304.704 319.125M329.784 351.169L263.736 392.626" stroke={theme === 'dark' ? '#FF5533' : '#FF3A00'} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>,
                    
                    // Framer Logo
                    <svg key="framer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21V13.5L4.5 21H12ZM4.5 3V13.5L12 3H4.5ZM12 3L12 10.5L19.5 3L12 3ZM12 10.5V18L19.5 10.5H12Z" fill={theme === 'dark' ? '#ffffff' : '#000000'}/>
                    </svg>
                  ].map((logo, index) => (
                    <motion.div
                      key={index}
                      className={`w-7 h-7 ${index === 0 ? 'w-8 h-8' : ''}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 15 
                      }}
                    >
                      {logo}
                    </motion.div>
                  ))}
                </motion.div>
              )}
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
          className="mx-4 md:mx-8 lg:mx-12 rounded-3xl bg-white dark:bg-black dark:backdrop-blur-sm dark:border dark:border-white/10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] dark:shadow-[0_20px_50px_rgba(255,_255,_255,_0.15)] overflow-hidden relative group"
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
