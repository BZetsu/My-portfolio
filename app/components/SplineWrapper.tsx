'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Spline with fallback handling
// Use a function to explicitly resolve the import path to avoid webpack confusion
const SplineComponent = dynamic(
  () => {
    // Explicitly use a try-catch to handle potential import path issues
    try {
      return import('@splinetool/react-spline').then(mod => mod.default); 
    } catch (error) {
      console.error("Error loading Spline:", error);
      // Return a fallback component if the import fails
      return Promise.resolve(() => (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-black/50 dark:text-white/50">Failed to load 3D scene</div>
        </div>
      ));
    }
  },
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-black/50 dark:text-white/50">Loading 3D scene...</div>
      </div>
    )
  }
);

type SplineWrapperProps = {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function SplineWrapper({ scene, className, style }: SplineWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Handle potential window load errors
    const handleError = () => {
      setLoadError(true);
    };
    
    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (loadError) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`} style={style}>
        <div className="text-black/50 dark:text-white/50">Failed to load 3D scene</div>
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`} style={style}>
        <div className="animate-pulse text-black/50 dark:text-white/50">Loading 3D scene...</div>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        <div className={`w-full h-full flex items-center justify-center ${className}`} style={style}>
          <div className="animate-pulse text-black/50 dark:text-white/50">Loading 3D scene...</div>
        </div>
      }
    >
      <SplineComponent scene={scene} className={className} style={style} />
    </Suspense>
  );
} 