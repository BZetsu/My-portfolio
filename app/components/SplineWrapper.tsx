'use client';

import React, { Suspense, useEffect, useState, lazy } from 'react';
// Removed: import dynamic from 'next/dynamic';

// Define prop types that match what Spline component will expect
type SplineProps = {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
};

// Define a placeholder component for loading/error states
const SplinePlaceholder = ({ message, className, style }: { message: string } & Omit<SplineProps, 'scene'>) => (
  <div className={`w-full h-full flex items-center justify-center ${className || ''}`} style={style}>
    <div className="text-black/50 dark:text-white/50">{message}</div>
  </div>
);

// Lazily load the Spline component using React.lazy with the base import path
const LazySpline = lazy(() => import('@splinetool/react-spline'));

/* Removed the old next/dynamic definition
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
*/

export default function SplineWrapper({ scene, className, style }: SplineProps) {
  const [isMounted, setIsMounted] = useState(false);
  // Removed loadError state as Suspense handles errors

  useEffect(() => {
    // Component did mount, safe to render client-side only component
    setIsMounted(true);
    
    // Error handling can be done via ErrorBoundary around Suspense if needed
    // Removed window error listener as it might not be reliable for lazy component errors
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

  // Render placeholder if not mounted yet
  if (!isMounted) {
    return <SplinePlaceholder message="Loading 3D scene..." className={className} style={style} />;
  }

  // Render the lazily loaded component within Suspense
  return (
    <Suspense 
      fallback={<SplinePlaceholder message="Loading 3D scene..." className={className} style={style} />}
    >
      {/* Render only when mounted to ensure client-side execution */}
      {isMounted && <LazySpline scene={scene} className={enhancedClassName} style={enhancedStyle} />}
    </Suspense>
  );
} 