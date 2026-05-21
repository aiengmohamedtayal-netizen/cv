import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Brain, Cpu, GitBranch, Layers, Rocket } from "lucide-react";

const stats = [
  { icon: Rocket, value: 15, suffix: "+", label: "Projects Completed" },
  { icon: Cpu, value: 10, suffix: "+", label: "Programming Languages" },
  { icon: Brain, value: 8, suffix: "+", label: "Certificates" },
  { icon: Layers, value: 20, suffix: "+", label: "Project Iterations" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        const dur = 1400; const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          setV(Math.floor((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
};

export const Stats = () => (
  <section className="relative py-20">
    <div className="container">
      <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="text-center md:text-left group"
            >
              <s.icon className="mx-auto md:mx-0 mb-3 text-primary-glow group-hover:scale-110 transition-transform" size={22} />
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
