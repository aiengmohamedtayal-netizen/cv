import { useRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type MagneticButtonProps = {
  variant?: "primary" | "ghost";
} & (
  | ({ as: "button" } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>)
);

export const MagneticButton = ({ variant = "primary", className = "", ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;

    // GPU-accelerated transform
    el.style.transform = `translate3d(${x * 0.18}px, ${y * 0.25}px, 0)`;
    
    // Pass coordinates for background radial gradient glow
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  const baseClass = variant === "primary" ? "btn-magnetic" : "btn-ghost-glow";
  const combinedClassName = `${baseClass} ${className}`.trim();

  // We wrap the actual element in a div to handle the magnetic transform safely
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block w-full sm:w-auto transition-transform duration-300 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {props.as === "a" ? (
        <a {...props} className={combinedClassName}>
          {props.children}
        </a>
      ) : (
        <button {...props} className={combinedClassName}>
          {props.children}
        </button>
      )}
    </div>
  );
};
