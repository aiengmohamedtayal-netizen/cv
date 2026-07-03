import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Briefcase, Sparkles, Rocket } from "lucide-react";

const timeline = [
  {
    icon: Rocket, year: "2025 — Future", title: "Systems Architect & AI Engineer",
    org: "Professional Practice",
    text: "Architecting scalable AI infrastructure and high-performance React applications. Bridging the gap between complex ML models and consumer-facing products.",
  },
  {
    icon: GraduationCap, year: "2025 — Present", title: "BSc Artificial Intelligence & Computer Science",
    org: "Delta University for Science and Technology",
    text: "Advanced academic focus on machine learning algorithms, distributed systems, and computational optimization techniques.",
  },
  {
    icon: Sparkles, year: "2025", title: "AI Systems Engineering",
    org: "Production Research",
    text: "Designing intelligent agent architectures, neural networks, and retrieval-augmented generation (RAG) pipelines.",
  },
  {
    icon: Briefcase, year: "2025", title: "Advanced Frontend Architecture",
    org: "Engineering Focus",
    text: "Engineering highly interactive, GPU-accelerated frontend applications with strict TypeScript typing and global state management.",
  },
];

export const Experience = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="relative py-28">
      <div className="container max-w-4xl">
        <div className="text-center">
          <div className="section-eyebrow">Journey</div>
          <h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">From <span className="text-gradient">curiosity</span> to intelligent systems.</h2>
        </div>
        <div className="mt-14 relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          {timeline.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-10 pb-10 group ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`md:text-right ${i % 2 ? "md:text-left" : ""}`}>
                <div className="absolute left-3 md:left-1/2 -translate-x-1/2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-2 ring-primary/30 transition-all duration-300 group-hover:ring-primary/60 group-hover:scale-110">
                  <span className={`h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] ${shouldReduceMotion ? '' : 'animate-pulse-glow'}`} />
                </div>
                <div className="text-xs font-mono text-primary-glow">{e.year}</div>
                <div className="mt-1 font-display text-xl font-semibold">{e.title}</div>
                <div className="text-sm text-muted-foreground">{e.org}</div>
              </div>
              <div className={`mt-3 md:mt-1 glass rounded-2xl p-5 max-w-md transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/[0.02] ${i % 2 ? "md:mr-auto" : "md:ml-auto"}`}>
                <div className="flex items-start gap-3">
                  <e.icon size={18} className="mt-0.5 text-primary-glow shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{e.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
