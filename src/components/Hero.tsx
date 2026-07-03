import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { HeroTyping } from "./HeroTyping";

const codeLines = [
  { t: "class ", c: "Developer", k: ":" },
  { t: "  def ", c: "__init__", k: "(self):" },
  { t: "    self.name = ", k: "\"Mohamed Tayal\"" },
  { t: "    self.role = ", k: "\"Full Stack Developer\"" },
  { t: "    self.skills = ", k: "{ \"AI/ML\", \"Frontend\", \"Backend\" }" },
  { t: "✓ ", k: "Developer initialized successfully" },
];

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Parallax effects (disabled if reduced motion is preferred)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  
  const [lineIdx, setLineIdx] = useState(1);

  useEffect(() => {
    // Skip typing animation if reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLineIdx(codeLines.length + 1);
      return;
    }

    const id = setInterval(() => setLineIdx((i) => {
      // Stop typing once complete to save CPU
      if (i >= codeLines.length) {
        clearInterval(id);
        return i + 1;
      }
      return i + 1;
    }), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-aurora)" }} />
      <div className="absolute inset-0 -z-10 grid-overlay" />
      <div className="noise -z-10" />

      {/* Floating orbs with reduced Vercel-style saturation */}
      <motion.div 
        style={{ y: y1 }} 
        className={`absolute top-32 -left-32 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px] ${shouldReduceMotion ? '' : 'animate-drift'}`} 
      />
      <motion.div 
        style={{ y: y2 }} 
        className={`absolute bottom-10 -right-32 h-[460px] w-[460px] rounded-full bg-violet/10 blur-[120px] ${shouldReduceMotion ? '' : 'animate-drift'}`} 
      />

      <motion.div style={{ opacity }} className="container relative grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-eyebrow"
          >
            <Sparkles size={12} /> // AI Developer in Egypt / Machine Learning / Full Stack Delivery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-fluid-hero text-foreground tracking-[-0.03em]"
          >
            <span className="font-medium text-foreground"><HeroTyping text="Mohamed Tayal" /> builds</span>
            <br />
            <span className="font-semibold text-foreground">AI-powered </span>
            <span className="font-semibold text-gradient">web products.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 text-editorial text-lg md:text-xl"
          >
            Architecting intelligent user experiences and AI-powered systems. I specialize in full-stack architecture and frontend engineering to deliver scalable, production-grade software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <MagneticButton as="a" href="#contact" className="group w-full sm:w-auto">
              Hire Me <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton as="a" href="#projects" variant="ghost" className="w-full sm:w-auto">
              View Projects
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="mt-10 flex items-center gap-6 text-xs font-mono text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inset-0 rounded-full bg-primary opacity-75 ${shouldReduceMotion ? '' : 'animate-ping'}`} />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to remote · Egypt → Worldwide
            </div>
            <div className="hidden sm:block opacity-60">Python · TensorFlow · React · Node.js</div>
          </motion.div>
        </div>

        {/* Terminal card with Floating Duotone Avatar */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, rotateX: shouldReduceMotion ? 0 : 8 }} 
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:ml-auto w-full max-w-[480px] mt-12 lg:mt-0"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Floating Premium Portrait (Duotone) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{ 
              opacity: { delay: 0.8, duration: 0.8 },
              scale: { delay: 0.8, duration: 0.8, type: "spring", bounce: 0.4 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }
            }}
            className="absolute -top-10 -right-4 md:-top-16 md:-right-10 z-30"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full p-1 glass-strong shadow-2xl shadow-black/80 border border-white/10 group">
              {/* Ambient Glow */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors duration-500" />
              
              {/* Portrait Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                <img 
                  src="/images/profile.jpg" 
                  alt="Mohamed Tayal" 
                  className="w-full h-full object-cover transform scale-[1.25] translate-y-3 group-hover:scale-[1.35] transition-transform duration-700"
                />
              </div>
              
              {/* Rim Light */}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-primary-glow/40 pointer-events-none" />
              
              {/* Status Dot */}
              <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 h-4 w-4 md:h-5 md:w-5 bg-emerald-500 rounded-full border-2 border-background shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
              </div>
            </div>
          </motion.div>

          <div className={`absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/30 via-violet/20 to-transparent blur-2xl opacity-70 ${shouldReduceMotion ? '' : 'animate-pulse-glow'} z-0`} />
          
          <div className="relative z-10 glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/5 bg-black/20">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
              <span className="ml-2 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Terminal size={12} /> developer.py
              </span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed min-h-[260px]">
              {codeLines.slice(0, lineIdx).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }} 
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex whitespace-pre"
                >
                  <span className={l.t.includes("✓") ? "text-primary" : "text-violet"}>{l.t}</span>
                  {l.c && <span className="text-primary-glow">{l.c}</span>}
                  <span className="text-foreground/90">{l.k}</span>
                </motion.div>
              ))}
              {lineIdx <= codeLines.length && (
                <div className="flex mt-1">
                  <span className="text-primary">$</span>
                  <span className={`ml-2 inline-block w-2 h-4 bg-primary ${shouldReduceMotion ? '' : 'animate-blink'}`} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
