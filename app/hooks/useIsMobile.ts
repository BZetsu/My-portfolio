import { useState, useEffect } from 'react';

// Custom hook to detect if the current device is mobile
// This handles both screen size and touch capabilities for better detection
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the device is mobile
    const checkIsMobile = () => {
      // Check window width (common breakpoint for mobile devices)
      const isMobileWidth = window.innerWidth < 768;
      
      // Check if device has touch capabilities
      const isTouchDevice = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0;
      
      // Check user agent for mobile devices
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // Set mobile if any of these conditions are true
      setIsMobile(isMobileWidth || (isTouchDevice && isMobileUserAgent));
    };

    // Check on initial load
    checkIsMobile();
    
    // Add event listener for resize events
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
} 