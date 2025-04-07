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

// Load Spline with proper next.js dynamic import
// No direct import of @splinetool packages here to avoid require issues
const DynamicSpline = dynamic(
  () => import('@splinetool/react-spline/next'),
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
    // Ensure we only load Spline on the client side
    setIsMounted(true);
    
    // Preload the runtime separately to ensure it's available
    // This is done in useEffect to ensure it only runs on client
    
    // Handle potential window load errors
    const handleError = (event: ErrorEvent) => {
      // Only handle Spline-related errors
      if (event.message.includes('Spline') || event.message.includes('require')) {
        console.error("Spline load error:", event);
        setLoadError(true);
      }
    };
    
    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  // Ensure cursor events work by applying these styles to the wrapper
  const enhancedStyle = {
    ...style,
    pointerEvents: 'auto' as const,
    position: style?.position || 'relative' as const,
    zIndex: style?.zIndex || 5,
  };

  // Ensure cursor events work by enhancing the className
  const enhancedClassName = `${className || ''} pointer-events-auto`;

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
      {isMounted && <DynamicSpline scene={scene} className={enhancedClassName} style={enhancedStyle} />}
    </Suspense>
  );
} 