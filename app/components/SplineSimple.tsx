'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Define prop types that match what Spline component would expect
type SplineProps = {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function SplineSimple({ scene, className, style }: SplineProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Try to dynamically load Spline if needed in the future
    const loadSpline = async () => {
      try {
        // We're not actually using these imports, just checking if they load
        await Promise.all([
          import('@splinetool/runtime'),
          import('@splinetool/react-spline')
        ]);
      } catch (err) {
        console.error('Error pre-loading Spline libraries:', err);
        setIsError(true);
      }
    };
    
    // For now, we'll just use the static image
    // loadSpline();
  }, []);
  
  if (!isMounted || isError) {
    // Simple fallback image that doesn't rely on any complex imports
    return (
      <div 
        className={`relative w-full h-full flex items-center justify-center ${className || ''}`}
        style={style}
      >
        <div className="relative w-full h-full">
          <Image
            src="/NEXBOT - robot character concept - Copy@1-1536x695.png"
            alt={`3D Scene Fallback for ${scene}`}
            fill
            style={{ objectFit: 'contain' }}
            priority
            onError={(e) => {
              // Handle error loading the fallback image
              const target = e.target as HTMLElement;
              if (target) {
                target.style.display = 'none';
              }
              
              // Show error message when the image fails to load
              const container = target.parentElement;
              if (container) {
                const errorDiv = document.createElement('div');
                errorDiv.textContent = 'Could not load 3D scene';
                errorDiv.className = 'text-black/70 dark:text-white/70 text-center';
                container.appendChild(errorDiv);
              }
            }}
          />
        </div>
      </div>
    );
  }
  
  // For now, we always return the simple image version
  // Later we could try to actually render the Spline scene
  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center ${className || ''}`}
      style={style}
    >
      <div className="relative w-full h-full">
        <Image
          src="/NEXBOT - robot character concept - Copy@1-1536x695.png"
          alt={`3D Scene for ${scene}`}
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
} 