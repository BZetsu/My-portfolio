'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Optimized cursor trail component
const CursorTrail = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number; id: number }>>([]);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const trailElementsRef = useRef<{[key: number]: HTMLDivElement}>({});
  
  // More responsive settings
  const trailLength = 8;
  const trailUpdateFrequency = 16; // ms between updates (60fps target)
  const debounceTime = 4; // Reduced debounce time for more responsive tracking
  
  // Set up the initial trail elements
  useEffect(() => {
    // Create initial empty trail
    trailRef.current = Array(trailLength).fill(null).map((_, i) => ({ 
      x: 0, 
      y: 0, 
      id: i 
    }));
    
    // Initialize styles for better performance
    if (mainCursorRef.current) {
      mainCursorRef.current.style.transform = 'translate3d(0px, 0px, 0px) translate(-50%, -50%)';
      mainCursorRef.current.style.willChange = 'transform';
      mainCursorRef.current.style.position = 'absolute';
      
      // Apply theme-based colors
      const cursorColor = theme === 'dark' ? 'rgba(129, 140, 248, 0.7)' : 'rgba(99, 102, 241, 0.7)';
      const shadowColor = theme === 'dark' 
        ? "0 0 10px 2px rgba(129, 140, 248, 0.6)" 
        : "0 0 10px 2px rgba(99, 102, 241, 0.6)";
      
      mainCursorRef.current.style.backgroundColor = cursorColor;
      mainCursorRef.current.style.boxShadow = shadowColor;
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [theme]);
  
  // Optimized mouse tracking
  useEffect(() => {
    let lastCapturedPosition = { x: 0, y: 0 };
    let lastMoveTime = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Store position immediately
      lastCapturedPosition = { x: e.clientX, y: e.clientY };
      
      // Ultra-smooth direct DOM updates for main cursor
      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${lastCapturedPosition.x}px, ${lastCapturedPosition.y}px, 0) translate(-50%, -50%)`;
      }
      
      // Throttle state updates to avoid React rendering overhead
      const now = performance.now();
      if (now - lastMoveTime > debounceTime) {
        lastMoveTime = now;
        // Update React state only for position tracking
        setMousePosition(lastCapturedPosition);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [debounceTime]);
  
  // Optimized animation loop with direct DOM manipulation
  const animate = (time: number) => {
    if (!previousTimeRef.current) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - (previousTimeRef.current || 0);
    
    if (deltaTime > trailUpdateFrequency) {
      previousTimeRef.current = time;
      
      // Update the trail array
      const newPosition = { x: mousePosition.x, y: mousePosition.y, id: time };
      trailRef.current = [newPosition, ...trailRef.current.slice(0, trailLength - 1)];
      
      // Update DOM directly for each dot in the trail
      trailRef.current.forEach((dot, index) => {
        const element = trailElementsRef.current[index];
        if (element) {
          // Direct style manipulation for better performance
          const scale = 1 - index * 0.08;
          const opacity = 1 - index * 0.09;
          
          element.style.transform = `translate3d(${dot.x - 4}px, ${dot.y - 4}px, 0) scale(${scale})`;
          element.style.opacity = opacity.toString();
          
          // Apply more expensive shadow effects only to first few dots
          if (index < 3) {
            const shadowSize = 8 - index;
            const shadowBlur = index;
            const shadowIntensity = 0.6 - index * 0.05;
            const shadowColor = theme === 'dark' 
              ? `rgba(129, 140, 248, ${shadowIntensity})` 
              : `rgba(99, 102, 241, ${shadowIntensity})`;
              
            element.style.boxShadow = `0 0 ${shadowSize}px ${shadowBlur}px ${shadowColor}`;
            element.style.filter = `blur(${index * 0.3}px)`;
          } else {
            element.style.boxShadow = 'none';
            element.style.filter = 'none';
          }
        }
      });
    }
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  // Set up the animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition, theme]);
  
  // Theme-based colors
  const dotColor = theme === 'dark' ? 'bg-indigo-400/20' : 'bg-indigo-500/20';
  const cursorColor = theme === 'dark' ? 'bg-indigo-400/70' : 'bg-indigo-600/70';
  
  return (
    <div className="pointer-events-none fixed inset-0 z-50" ref={dotsContainerRef}>
      {/* Trail dots - pre-rendered and cached */}
      {Array(trailLength).fill(null).map((_, index) => (
        <div
          key={index}
          ref={el => {
            if (el) trailElementsRef.current[index] = el;
          }}
          className={`absolute w-3 h-3 rounded-full ${dotColor} will-change-transform will-change-opacity hardware-accelerated`}
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            transform: 'translate3d(0, 0, 0) scale(0)',
            opacity: 0,
            transition: 'opacity 0.05s ease-out',
          }}
        />
      ))}
      
      {/* Main cursor dot */}
      <div
        ref={mainCursorRef}
        className={`w-5 h-5 rounded-full ${cursorColor} will-change-transform hardware-accelerated`}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          animation: 'pulse 1.5s infinite alternate ease-in-out',
        }}
      />
      
      {/* Add a CSS animation for the pulse effect */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%) scale(1.2); opacity: 0.9; }
          100% { transform: translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%) scale(1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default CursorTrail; 