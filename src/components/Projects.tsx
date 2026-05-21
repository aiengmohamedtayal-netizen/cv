import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title: "Image Classification System",
    tag: "Artificial Intelligence",
    desc: "TensorFlow-based image classification workflow with a clean inference pipeline and deployable web integration.",
    tech: ["Python", "TensorFlow", "CNN"],
    gradient: "from-primary/40 via-violet/20 to-transparent",
  },
  {
    title: "E-Commerce Store",
    tag: "Web Development",
    desc: "Responsive storefront with product management, payments, and the backend flows needed to keep orders moving.",
    tech: ["React", "Node.js", "MongoDB"],
    gradient: "from-violet/40 via-pink/20 to-transparent",
  },
  {
    title: "Sales Data Analysis",
    tag: "Data Analysis",
    desc: "Sales analytics dashboard that turns raw data into clear trends, visual reports, and decision-ready summaries.",
    tech: ["Python", "Pandas", "Plotly"],
    gradient: "from-pink/40 via-primary/20 to-transparent",
  },
  {
    title: "Smart Chatbot",
    tag: "Artificial Intelligence",
    desc: "Arabic-friendly conversational assistant using NLP techniques and web integration for support use cases.",
    tech: ["Python", "NLP", "Flask"],
    gradient: "from-primary/40 via-pink/20 to-transparent",
  },
  {
    title: "Task Management System",
    tag: "Web Development",
    desc: "Project tracking app focused on team visibility, task ownership, and a faster workflow from backlog to completion.",
    tech: ["React", "Express", "PostgreSQL"],
    gradient: "from-violet/40 via-primary/20 to-transparent",
  },
  {
    title: "Recommendation System",
    tag: "Artificial Intelligence",
    desc: "Recommendation engine using collaborative filtering to improve relevance, discovery, and retention.",
    tech: ["Python", "Scikit-learn", "Flask"],
    gradient: "from-pink/40 via-violet/20 to-transparent",
  },
];

const Card = ({ p, i }: { p: typeof projects[number]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass rounded-3xl overflow-hidden p-7 md:p-9 hover:-translate-y-1 transition-transform duration-500"
      style={{
        backgroundImage: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.10), transparent 40%)",
      }}
    >
      <div className={`absolute -top-20 -right-20 h-60 w-60 rounded-full blur-3xl opacity-60 bg-gradient-to-br ${p.gradient}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-primary-glow">{p.tag}</div>
          <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold">{p.title}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full glass-strong group-hover:rotate-45 transition-transform">
          <ArrowUpRight size={18} />
        </div>
      </div>
      <p className="relative mt-4 text-muted-foreground leading-relaxed max-w-md">{p.desc}</p>
      <div className="relative mt-6 flex flex-wrap gap-2">
        {p.tech.map((t, idx) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.05 }}
            className="chip"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
};

export const Projects = () => (
  <section id="projects" className="relative py-28">
    <div className="container">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
        <div>
          <div className="section-eyebrow">Selected work</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
            Things I've <span className="text-gradient">shipped</span>.
          </h2>
        </div>
        <a href="https://github.com/mohamedtayal" target="_blank" rel="noreferrer" className="btn-ghost-glow text-sm">
          <Github size={16} /> All repos
        </a>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => <Card key={p.title} p={p} i={i} />)}
      </div>
    </div>
  </section>
);
