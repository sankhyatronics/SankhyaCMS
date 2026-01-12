import { useState, useEffect, useRef } from 'react';

export interface TouchDeviceOptions {
  /**
   * Screen width breakpoint (in pixels) below which device is considered touch/mobile
   * @default 768
   */
  breakpoint?: number;
  
  /**
   * Whether to use actual touch detection in addition to breakpoint
   * @default true
   */
  useActualDetection?: boolean;
  
  /**
   * Class name to add to HTML element when device is considered touch
   * @default 'touch-device'
   */
  touchClassName?: string;
}

export const useTouchDevice = (options: TouchDeviceOptions = {}) => {
  const {
    breakpoint = 768,
    useActualDetection = true,
    touchClassName = 'touch-device'
  } = options;
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const previousValueRef = useRef<boolean | null>(null);
  
  useEffect(() => {
    const checkTouchDevice = () => {
      let isTouch = false;
      
      // Check 1: Actual touch detection (if enabled)
      if (useActualDetection) {
        isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      }
      
      // Check 2: Screen width breakpoint (if not already touch)
      if (!isTouch && window.innerWidth <= breakpoint) {
        isTouch = true;
      }
      
      // Check 3: Check for touch events capability
      if (!isTouch && 'ontouchstart' in window) {
        isTouch = true;
      }
      
      // Only update if value changed
      if (previousValueRef.current !== isTouch) {
        setIsTouchDevice(isTouch);
        previousValueRef.current = isTouch;
        
        // Manage class on HTML element
        if (isTouch) {
          document.documentElement.classList.add(touchClassName);
        } else {
          document.documentElement.classList.remove(touchClassName);
        }
      }
    };

    // Initial check
    checkTouchDevice();
    
    // Set up resize listener with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkTouchDevice, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      document.documentElement.classList.remove(touchClassName);
    };
  }, [breakpoint, useActualDetection, touchClassName]);
  
  return isTouchDevice;
};

// Pre-configured hooks for common breakpoints
export const useMobileTouchDevice = () => useTouchDevice({ breakpoint: 768 });
export const useTabletTouchDevice = () => useTouchDevice({ breakpoint: 1024 });
export const useDesktopTouchDevice = () => useTouchDevice({ breakpoint: 1280 });