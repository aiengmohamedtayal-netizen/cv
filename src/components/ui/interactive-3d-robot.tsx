import { Suspense, lazy, useEffect, useRef } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

export interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hideAllSplineLogos = () => {
      const searchElement = (root: Element | ShadowRoot | null) => {
        if (!root) return;

        // Try finding logo element or spline links
        try {
          const logo = root.querySelector('#logo');
          if (logo) {
            (logo as HTMLElement).style.setProperty('display', 'none', 'important');
            (logo as HTMLElement).style.setProperty('opacity', '0', 'important');
            (logo as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
            (logo as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
          }
        } catch (e) {
          // Ignore errors
        }

        try {
          const links = root.querySelectorAll('a');
          links.forEach((a) => {
            if (a.href && (a.href.includes('spline') || a.href.includes('splinetool'))) {
              a.style.setProperty('display', 'none', 'important');
              a.style.setProperty('opacity', '0', 'important');
              a.style.setProperty('visibility', 'hidden', 'important');
              a.style.setProperty('pointer-events', 'none', 'important');
            }
          });
        } catch (e) {
          // Ignore errors
        }

        // Traverse children and find shadowRoots recursively
        try {
          const children = root.querySelectorAll('*');
          children.forEach((child) => {
            if (child.shadowRoot) {
              searchElement(child.shadowRoot);
            }
          });
        } catch (e) {
          // Ignore errors
        }
      };

      searchElement(container);
    };

    // Run periodically
    const interval = setInterval(hideAllSplineLogos, 200);

    // Run on mutations
    const observer = new MutationObserver(hideAllSplineLogos);
    observer.observe(container, { childList: true, subtree: true });

    // Initial run
    hideAllSplineLogos();

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-gray-900 text-white ${className}`}>
          <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
          </svg>
        </div>
      }
    >
      <div ref={containerRef} className="w-full h-full relative spline-container group">
        <Spline
          scene={scene}
          className={className} 
        />
        
        {/* Overlay element to obscure the Spline watermark */}
        <div className="absolute bottom-4 right-4 z-50 w-40 h-10 flex items-center justify-center bg-background/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg pointer-events-auto hover:bg-background/90 transition-all cursor-pointer">
          <svg 
            className="w-5 h-5 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </Suspense>
  );
}
