import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData, type Project } from "@/data/projects";
import { getLocalizedProject } from "@/data/projectContent";
import { useLocale } from "@/i18n/LocaleProvider";

const Card = ({ p, i }: { p: Project; i: number }) => {
  const { locale, t } = useLocale();
  const project = getLocalizedProject(p, locale);
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const onMove = (event: React.MouseEvent) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    element.style.setProperty("--mx", `${x}px`);
    element.style.setProperty("--my", `${y}px`);
    if (!shouldReduceMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      element.style.transform = `perspective(1000px) scale3d(1.015, 1.015, 1.015) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      element.style.boxShadow = "0 30px 60px -12px hsl(230 50% 0% / 0.5), inset 0 1px 1px hsl(210 30% 98% / 0.1)";
    }
  };

  const onLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "";
      ref.current.style.boxShadow = "";
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <Link to={project.href} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="group relative block h-full flex flex-col overflow-hidden rounded-3xl glass p-7 outline-none transition-all duration-500 ease-out will-change-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-9" style={{ backgroundImage: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.10), transparent 40%)", transformStyle: "preserve-3d" }}>
        <div className={`absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${project.gradient} opacity-60 blur-3xl`} />
        <div className="pointer-events-none relative flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary-glow">{project.tag}</div>
            <h3 className="mt-2 font-display text-2xl font-semibold transition-colors group-hover:text-primary md:text-3xl">{project.title}</h3>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full glass-strong transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary/20 group-hover:text-primary-glow group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"><ArrowUpRight size={18} /></div>
        </div>
        <p className="pointer-events-none relative mt-4 flex-grow text-editorial text-[1.05rem]">{project.desc}</p>
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/5 pt-6">
          <div className="pointer-events-none flex flex-wrap gap-2">{project.tech.map((technology, index) => <motion.span key={technology} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.05 }} className="chip">{technology}</motion.span>)}</div>
          <div className="pointer-events-none flex shrink-0 items-center gap-2 font-mono text-xs font-medium tracking-wide text-muted-foreground transition-colors group-hover:text-primary-glow">{t.projects.viewCaseStudy}</div>
        </div>
      </Link>
    </motion.div>
  );
};

export const Projects = () => {
  const { t } = useLocale();
  return (
    <section id="projects" className="relative py-28">
      <div className="container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div><div className="section-eyebrow">{t.projects.eyebrow}</div><h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">{t.projects.headingLead} <span className="text-gradient">{t.projects.headingAccent}</span>.</h2></div>
          <a href="https://github.com/mohamedtayal" target="_blank" rel="noreferrer" className="btn-ghost-glow text-sm"><Github size={16} /> {t.projects.allRepos}</a>
        </div>
        <div className="grid gap-5 md:grid-cols-2" style={{ perspective: "1000px" }}>{projectsData.map((project, index) => <Card key={project.id} p={project} i={index} />)}</div>
      </div>
    </section>
  );
};
