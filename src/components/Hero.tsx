import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Sparkles, Terminal } from "lucide-react";

const codeLines = [
  { t: "class ", c: "Developer", k: ":" },
  { t: "  def ", c: "__init__", k: "(self):" },
  { t: "    self.name = ", k: "\"Mohamed Tayal\"" },
  { t: "    self.role = ", k: "\"Full Stack Developer\"" },
  { t: "    self.skills = ", k: "{ \"AI/ML\", \"Frontend\", \"Backend\" }" },
  { t: "✓ ", k: "Developer initialized successfully" },
];

const MagneticButton = ({ children, href, variant = "primary" }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={variant === "primary" ? "btn-magnetic" : "btn-ghost-glow"}
    >
      {children}
    </a>
  );
};

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [lineIdx, setLineIdx] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setLineIdx((i) => (i + 1) % (codeLines.length + 1)), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
      {/* Aurora */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-aurora)" }} />
      <div className="absolute inset-0 -z-10 grid-overlay" />
      <div className="noise -z-10" />

      {/* Floating orbs */}
      <motion.div style={{ y: y1 }} className="absolute top-32 -left-32 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px] animate-drift" />
      <motion.div style={{ y: y2 }} className="absolute bottom-10 -right-32 h-[460px] w-[460px] rounded-full bg-violet/20 blur-[120px] animate-drift" />

      <motion.div style={{ opacity }} className="container relative grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="section-eyebrow"
          >
            <Sparkles size={12} /> // AI Developer in Egypt / Machine Learning / Full Stack Delivery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-bold leading-[0.95] tracking-tight text-[clamp(2.6rem,7vw,5.5rem)]"
          >
            Mohamed Tayal builds
            <br />
            <span className="text-gradient">AI-powered web products.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            I turn machine learning ideas into usable products - from intelligent features and dashboards to
            full-stack web applications that are ready for real users, not just demos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact">
              Hire Me <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton href="#projects" variant="ghost">
              View Projects
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-10 flex items-center gap-6 text-xs font-mono text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" /><span className="relative h-2 w-2 rounded-full bg-primary" /></span>
              Open to remote · Egypt → Worldwide
            </div>
            <div className="hidden sm:block opacity-60">Python · TensorFlow · React · Node.js</div>
          </motion.div>
        </div>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/30 via-violet/20 to-transparent blur-2xl opacity-70 animate-pulse-glow" />
          <div className="relative glass-strong rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              <span className="ml-2 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Terminal size={12} /> developer.py
              </span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[260px]">
              {codeLines.slice(0, lineIdx).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  className="flex"
                >
                  <span className={l.t.includes("✓") ? "text-primary" : "text-violet"}>{l.t}</span>
                  {l.c && <span className="text-primary-glow">{l.c}</span>}
                  {l.c && <span className="text-muted-foreground mx-1.5">:</span>}
                  <span className="text-foreground/90">{l.k}</span>
                </motion.div>
              ))}
              {lineIdx <= codeLines.length && (
                <div className="flex"><span className="text-primary">$</span><span className="ml-2 inline-block w-2 h-4 bg-primary animate-blink" /></div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
