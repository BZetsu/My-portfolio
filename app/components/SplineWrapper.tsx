'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Define prop types that match what Spline component will expect
type SplineProps = {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
};

// Define a placeholder component for when Spline can't be loaded
const SplinePlaceholder = ({ className, style }: Omit<SplineProps, 'scene'>) => (
  <div className={`w-full h-full flex items-center justify-center ${className || ''}`} style={style}>
    <div className="text-black/50 dark:text-white/50">3D scene unavailable</div>
  </div>
);

// Create a component that manually loads both dependencies
// This avoids relying on webpack to resolve the dependencies
const DynamicSpline = dynamic(
  async () => {
    // Explicitly handle loading both packages
    try {
      // First, ensure the runtime is loaded
      await import('@splinetool/runtime');
      
      // Then try to load the React component
      const SplineModule = await import('@splinetool/react-spline');
      return SplineModule.default;
    } catch (error) {
      console.error("Error loading Spline or its dependencies:", error);
      return SplinePlaceholder;
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

export default function SplineWrapper({ scene, className, style }: SplineProps) {
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
      <div className={`w-full h-full flex items-center justify-center ${className || ''}`} style={style}>
        <div className="text-black/50 dark:text-white/50">Failed to load 3D scene</div>
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className || ''}`} style={style}>
        <div className="animate-pulse text-black/50 dark:text-white/50">Loading 3D scene...</div>
      </div>
    );
  }

  return (
    <Suspense 
      fallback={
        <div className={`w-full h-full flex items-center justify-center ${className || ''}`} style={style}>
          <div className="animate-pulse text-black/50 dark:text-white/50">Loading 3D scene...</div>
        </div>
      }
    >
      <DynamicSpline scene={scene} className={className} style={style} />
    </Suspense>
  );
} 