import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { type LucideIcon, Brain, Code2, Database, Wrench, X, Target, Briefcase, Calendar } from "lucide-react";

type Skill = {
  name: string;
  usage: string;
  experience: string;
  projects: string[];
  description: string;
};

type Group = {
  title: string;
  icon: LucideIcon;
  items: Skill[];
};

const skillGroups: Group[] = [
  { 
    title: "Artificial Intelligence", 
    icon: Brain,
    items: [
      { name: "Python", usage: "Core language for ML pipelines, backend services, and data manipulation.", experience: "3+ Years", projects: ["Image Classification", "Smart Chatbot", "Sales Analysis", "Recommendation System"], description: "Primary ecosystem for data science and AI logic." },
      { name: "TensorFlow / Keras", usage: "Designing and training deep neural networks (CNNs, NLP models).", experience: "2+ Years", projects: ["Image Classification"], description: "Used for high-performance deep learning models and scalable inference." },
      { name: "PyTorch", usage: "Research and dynamic graph computation for complex models.", experience: "2 Years", projects: ["AI Automation Kickstart"], description: "Preferred for rapid prototyping and academic research implementations." },
      { name: "Scikit-learn", usage: "Traditional machine learning algorithms and data preprocessing.", experience: "3 Years", projects: ["Recommendation System"], description: "Go-to library for classification, regression, and clustering baselines." },
    ]
  },
  { 
    title: "Frontend Engineering", 
    icon: Code2,
    items: [
      { name: "React.js", usage: "Building interactive, stateful Single Page Applications.", experience: "2+ Years", projects: ["E-Commerce Store", "Task Management"], description: "Core UI library used for all modern web interfaces." },
      { name: "TypeScript", usage: "Adding static typing for robust, enterprise-grade architecture.", experience: "2 Years", projects: ["Task Management"], description: "Essential for catching errors at compile-time and improving DX." },
      { name: "Tailwind CSS", usage: "Rapid UI development with utility-first classes and design systems.", experience: "2+ Years", projects: ["E-Commerce Store", "Task Management", "Portfolio"], description: "Used for creating highly customized, responsive, and performant designs." },
      { name: "JavaScript / DOM", usage: "Core logic, web animations, and browser API integrations.", experience: "4 Years", projects: ["E-Commerce Store", "Task Management"], description: "Fundamental web language used across all frontend projects." }
    ]
  },
  { 
    title: "Backend & Systems", 
    icon: Database,
    items: [
      { name: "Node.js / Express", usage: "Building fast, non-blocking REST APIs and microservices.", experience: "2+ Years", projects: ["E-Commerce Store", "Task Management"], description: "Primary backend technology for JavaScript-heavy stacks." },
      { name: "PostgreSQL", usage: "Relational data modeling, complex querying, and transaction safety.", experience: "2 Years", projects: ["Task Management"], description: "Used for data-intensive applications requiring strict ACID compliance." },
      { name: "MongoDB", usage: "Flexible document storage for rapid iteration and unstructured data.", experience: "2+ Years", projects: ["E-Commerce Store"], description: "Ideal for product catalogs and user profile data." },
      { name: "Django / Flask", usage: "Python-based web APIs heavily integrated with ML models.", experience: "2+ Years", projects: ["Smart Chatbot", "Recommendation System"], description: "Flask is used for lightweight ML microservices; Django for robust MVC applications." }
    ]
  },
  { 
    title: "DevOps & Tooling", 
    icon: Wrench,
    items: [
      { name: "Git / GitHub", usage: "Version control, code collaboration, and CI/CD pipelines.", experience: "3+ Years", projects: ["All Projects"], description: "Standard version control system for all source code." },
      { name: "Docker", usage: "Containerizing ML models and backend services for uniform deployment.", experience: "1.5 Years", projects: ["Image Classification"], description: "Ensures parity between development and production environments." },
      { name: "Linux", usage: "Server management, shell scripting, and environment configuration.", experience: "3 Years", projects: ["Server Deployments"], description: "Standard OS for all production servers and ML training rigs." }
    ]
  },
];

export const Stack = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <section id="stack" className="relative py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="section-eyebrow">Technology DNA</div>
          <h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">
            Tools I use to <span className="text-gradient">build the future</span>.
          </h2>
          <p className="mt-5 text-editorial text-[1.05rem] mx-auto text-center">
            Interactive technology clusters. Click on any skill to explore real-world usage, experience levels, and associated projects.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-6 relative">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass rounded-3xl p-8 border border-foreground/5 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-violet/20 border border-primary/20 text-primary-glow shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                  <group.icon size={20} />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight">{group.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, idx) => (
                  <motion.button
                    key={skill.name}
                    onClick={() => setActiveSkill(skill)}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border focus-visible:ring-2 focus-visible:ring-primary outline-none ${
                      activeSkill?.name === skill.name 
                        ? "bg-primary/20 border-primary/50 text-primary-glow shadow-[0_0_15px_hsl(var(--primary)/0.3)]" 
                        : "bg-background/50 border-foreground/10 text-foreground/80 hover:bg-primary/10 hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    {skill.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Skill Detail Modal / Overlay */}
          <AnimatePresence>
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed inset-x-4 bottom-4 md:inset-auto md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-lg glass-strong shadow-2xl rounded-3xl p-6 md:p-8 border border-primary/20"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs font-mono text-primary-glow uppercase tracking-wider mb-2">Technology Profile</div>
                    <h4 className="font-display text-3xl font-bold">{activeSkill.name}</h4>
                  </div>
                  <button 
                    onClick={() => setActiveSkill(null)}
                    className="p-2 rounded-full hover:bg-foreground/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Close details"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-editorial text-[1.05rem] mb-8">
                  {activeSkill.description}
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-2xl bg-background/50 border border-foreground/5">
                    <Target size={20} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold mb-1">Real-world Application</div>
                      <div className="text-sm text-muted-foreground">{activeSkill.usage}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 rounded-2xl bg-background/50 border border-foreground/5">
                    <Calendar size={20} className="text-violet mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold mb-1">Experience Level</div>
                      <div className="text-sm text-muted-foreground">{activeSkill.experience}</div>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-background/50 border border-foreground/5">
                    <Briefcase size={20} className="text-pink mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold mb-2">Applied Projects</div>
                      <div className="flex flex-wrap gap-2">
                        {activeSkill.projects.map(p => (
                          <span key={p} className="text-xs py-1 px-2 rounded-md bg-foreground/5 border border-foreground/10">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Backdrop for mobile */}
          <AnimatePresence>
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveSkill(null)}
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
