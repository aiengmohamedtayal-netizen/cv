import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData, type Project } from "@/data/projects";

const Card = ({ p, i }: { p: Project; i: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; 
    if (!el) return;
    
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    
    // Background radial gradient tracking
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    // 3D Tilt effect
    if (!shouldReduceMotion) {
      const centerX = r.width / 2;
      const centerY = r.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3; // max 3deg
      const rotateY = ((x - centerX) / centerX) * 3;  // max 3deg
      
      el.style.transform = `perspective(1000px) scale3d(1.015, 1.015, 1.015) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      el.style.boxShadow = "0 30px 60px -12px hsl(230 50% 0% / 0.5), inset 0 1px 1px hsl(210 30% 98% / 0.1)";
    }
  };

  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "";
      ref.current.style.boxShadow = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={p.href}
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative glass rounded-3xl overflow-hidden p-7 md:p-9 hover:-translate-y-1 transition-all duration-500 ease-out will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background block h-full flex flex-col"
        style={{
          backgroundImage: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.10), transparent 40%)",
          transformStyle: "preserve-3d"
        }}
      >
        <div className={`absolute -top-20 -right-20 h-60 w-60 rounded-full blur-3xl opacity-60 bg-gradient-to-br ${p.gradient}`} />
        <div className="relative flex items-start justify-between gap-4 pointer-events-none">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-primary-glow">{p.tag}</div>
            <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold group-hover:text-primary transition-colors">{p.title}</h3>
          </div>
          <div className="flex shrink-0 h-11 w-11 items-center justify-center rounded-full glass-strong group-hover:rotate-45 group-hover:bg-primary/20 group-hover:text-primary-glow group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300">
            <ArrowUpRight size={18} />
          </div>
        </div>
        <p className="relative mt-4 text-editorial text-[1.05rem] pointer-events-none flex-grow">{p.desc}</p>
        
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/5 pt-6">
          <div className="flex flex-wrap gap-2 pointer-events-none">
            {p.tech.map((t, idx) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="chip"
              >
                {t}
              </motion.span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-primary-glow transition-colors pointer-events-none shrink-0 font-medium tracking-wide">
            View Case Study
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const Projects = () => (
  <section id="projects" className="relative py-28">
    <div className="container">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
        <div>
          <div className="section-eyebrow">Selected work</div>
          <h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">
            Things I've <span className="text-gradient">shipped</span>.
          </h2>
        </div>
        <a href="https://github.com/mohamedtayal" target="_blank" rel="noreferrer" className="btn-ghost-glow text-sm">
          <Github size={16} /> All repos
        </a>
      </div>
      <div className="grid md:grid-cols-2 gap-5" style={{ perspective: "1000px" }}>
        {projectsData.map((p, i) => <Card key={p.id} p={p} i={i} />)}
      </div>
    </div>
  </section>
);
