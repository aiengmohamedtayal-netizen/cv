import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight, Github, Globe } from "lucide-react";
import { projectsData } from "@/data/projects";
import { CursorGlow } from "@/components/CursorGlow";

export const ProjectCaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find((p) => p.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const { caseStudy } = project;

  return (
    <main className="relative min-h-screen pb-32">
      <CursorGlow />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-background pointer-events-none" />
      <div className={`fixed inset-0 -z-10 opacity-20 blur-[150px] bg-gradient-to-br ${project.gradient} pointer-events-none`} />
      <div className="fixed inset-0 -z-10 grid-overlay pointer-events-none" />

      {/* Simplified Navigation for Case Study */}
      <nav className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <div className="flex items-center gap-2 rounded-full glass-strong px-3 py-2 pointer-events-auto shadow-[0_10px_40px_-10px_hsl(230_50%_0%/0.5)]">
          <Link to="/" className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full hover:bg-foreground/5 transition-colors group focus-visible:ring-2 focus-visible:ring-primary outline-none">
            <ArrowLeft size={16} className="text-muted-foreground group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
        </div>
      </nav>

      <div className="container max-w-4xl pt-32">
        {/* Header Section */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-sm font-mono text-primary-glow mb-6">
              <span>Projects</span>
              <ChevronRight size={14} className="opacity-50" />
              <span>{project.tag}</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
              {project.title}
            </h1>
            
            <p className="text-editorial text-xl md:text-2xl">
              {project.desc}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-magnetic focus-visible:ring-2 focus-visible:ring-primary outline-none">
                  Live Demo <Globe size={16} className="ml-2" />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost-glow focus-visible:ring-2 focus-visible:ring-primary outline-none">
                  <Github size={16} className="mr-2" /> View Source
                </a>
              )}
            </div>
          </motion.div>
        </header>

        {/* Abstract Mockup / Hero Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video w-full rounded-3xl overflow-hidden glass-strong border border-foreground/10 mb-24 shadow-2xl flex items-center justify-center bg-black/40 group"
        >
          {/* We use abstract tailwind gradients as premium placeholders since we don't have actual images */}
          <div className={`absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity duration-700 ${project.gradient}`} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 text-center px-6">
            <h2 className="font-display text-4xl font-bold opacity-30 tracking-widest uppercase mix-blend-overlay">System Architecture</h2>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="grid gap-24">
          
          {/* Overview & Problem */}
          <section className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="section-eyebrow mb-4">01. Overview</div>
              <h3 className="text-2xl font-display font-semibold mb-4">The Challenge</h3>
              <p className="text-editorial text-lg">{caseStudy.problem}</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }}>
              <div className="section-eyebrow mb-4">02. Approach</div>
              <h3 className="text-2xl font-display font-semibold mb-4">The Solution</h3>
              <p className="text-editorial text-lg">{caseStudy.solution}</p>
            </motion.div>
          </section>

          {/* Architecture */}
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="section-eyebrow mb-4">03. Engineering</div>
              <h3 className="text-3xl font-display font-semibold mb-10">System Architecture</h3>
            </motion.div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {caseStudy.architecture.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass rounded-2xl p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-glow mb-5">
                    <item.icon size={20} />
                  </div>
                  <h4 className="font-display font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-editorial text-[1.05rem]">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tech Stack & Performance */}
          <section className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="section-eyebrow mb-4">04. Stack</div>
              <h3 className="text-3xl font-display font-semibold mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span key={t} className="chip text-sm py-2 px-4 border-foreground/10">{t}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }}>
              <div className="section-eyebrow mb-4">05. Results</div>
              <h3 className="text-3xl font-display font-semibold mb-6">Performance Metrics</h3>
              <div className="space-y-4">
                {caseStudy.performance.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-xl glass">
                    <span className="font-medium text-muted-foreground">{metric.metric}</span>
                    <span className="font-mono text-primary-glow font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Future Work */}
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="section-eyebrow mb-4">06. Next Steps</div>
              <h3 className="text-3xl font-display font-semibold mb-8">Future Improvements</h3>
              
              <div className="space-y-4 max-w-3xl">
                {caseStudy.future.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl glass hover:border-primary/20 transition-colors">
                    <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-editorial text-[1.05rem]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default ProjectCaseStudy;
