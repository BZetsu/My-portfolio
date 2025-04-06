'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Match the props type from SplineWrapper
type SplineProps = {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackImage?: string;
};

export default function SplineFallback({ 
  scene,
  className, 
  style, 
  fallbackImage = '/NEXBOT - robot character concept - Copy@1-1536x695.png' 
}: SplineProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className || ''}`} style={style}>
        <div className="animate-pulse text-black/50 dark:text-white/50">Loading image...</div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex items-center justify-center ${className || ''}`} style={style}>
      <div className="relative w-full h-full">
        <Image
          src={fallbackImage}
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