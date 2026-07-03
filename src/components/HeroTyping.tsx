import { useState, useEffect, useRef, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface HeroTypingProps {
  text: string;
  typingSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  loop?: boolean;
  cursorStyle?: string;
  className?: string;
}

export const HeroTyping = memo(({
  text,
  typingSpeed = 45,
  deleteSpeed = 20,
  pause = 2400,
  loop = true,
  cursorStyle = "|",
  className = "",
}: HeroTypingProps) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const stateRef = useRef({ isDeleting: false, length: 0 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    let timeout: NodeJS.Timeout;
    let running = true;

    // Reset state if text prop changes
    stateRef.current = { isDeleting: false, length: 0 };
    setDisplayedLength(0);

    const tick = () => {
      if (!running) return;

      const state = stateRef.current;

      if (!state.isDeleting) {
        if (state.length < text.length) {
          // Type next character
          state.length++;
          setDisplayedLength(state.length);
          // Smoother human typing: wider randomization for natural feel
          timeout = setTimeout(tick, typingSpeed + (Math.random() * 30 - 10));
        } else {
          // Reached end of text
          state.isDeleting = true;
          if (loop) {
            timeout = setTimeout(tick, pause + (Math.random() * 400));
          }
        }
      } else {
        if (state.length > 0) {
          // Delete character
          state.length--;
          setDisplayedLength(state.length);
          // Faster, smoother deletion
          timeout = setTimeout(tick, deleteSpeed + (Math.random() * 15 - 5));
        } else {
          // Finished deleting
          state.isDeleting = false;
          timeout = setTimeout(tick, 600 + (Math.random() * 200)); // brief pause before re-typing
        }
      }
    };

    // Initial startup delay
    timeout = setTimeout(tick, 800);

    return () => {
      running = false;
      clearTimeout(timeout);
    };
  }, [text, typingSpeed, deleteSpeed, pause, loop, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-flex items-center relative ${className}`}>
      {/* Invisible placeholder preserves max layout dimensions avoiding CLS entirely */}
      <span className="invisible select-none whitespace-pre flex items-center" aria-hidden="true">
        {text}
        <span className="ml-[2px]">{cursorStyle}</span>
      </span>

      {/* Absolute overlay for animated text ensuring DOM isolation */}
      <span className="absolute inset-0 left-0 flex items-center whitespace-pre" aria-hidden="true">
        {text.slice(0, displayedLength).split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(4px)", y: 2 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-foreground drop-shadow-[0_0_8px_hsl(var(--primary)/0.2)]"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}

        {/* Premium glowing blinking cursor inside the flow to perfectly tail the text */}
        <span 
          className="relative flex items-center text-primary-glow animate-blink ml-[1px] font-light" 
          style={{ textShadow: "0 0 10px hsl(var(--primary) / 0.8)", height: "1em" }}
        >
          {cursorStyle}
        </span>
      </span>
      
      {/* Screen Reader accessible text */}
      <span className="sr-only">{text}</span>
    </span>
  );
});

HeroTyping.displayName = "HeroTyping";
