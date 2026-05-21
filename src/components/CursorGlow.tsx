import { useEffect, useState } from "react";

export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) { setEnabled(false); return; }
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[480px] w-[480px] rounded-full blur-3xl transition-transform duration-300 ease-out"
      style={{
        left: pos.x - 240,
        top: pos.y - 240,
        background: "radial-gradient(circle, hsl(175 85% 55% / 0.18), hsl(265 85% 65% / 0.08) 40%, transparent 70%)",
      }}
    />
  );
};
