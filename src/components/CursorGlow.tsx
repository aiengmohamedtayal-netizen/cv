import { useEffect, useRef } from "react";

export const CursorGlow = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (blobRef.current) blobRef.current.style.display = "none";
      return;
    }

    // Disable if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (blobRef.current) blobRef.current.style.display = "none";
      return;
    }

    let mouseX = -300;
    let mouseY = -300;
    let currentX = -300;
    let currentY = -300;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth interpolation with rAF
    const animate = () => {
      // Ease factor (0.1 = smooth trailing, 1 = instant follow)
      const ease = 0.15;
      
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;
      
      if (blobRef.current) {
        // GPU accelerated transform instead of left/top
        // -240px to center the 480px width/height blob
        blobRef.current.style.transform = `translate3d(${currentX - 240}px, ${currentY - 240}px, 0)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[480px] w-[480px] rounded-full blur-3xl will-change-transform"
      style={{
        transform: "translate3d(-300px, -300px, 0)",
        background: "radial-gradient(circle, hsl(175 85% 55% / 0.15), hsl(265 85% 65% / 0.08) 40%, transparent 70%)",
      }}
    />
  );
};
