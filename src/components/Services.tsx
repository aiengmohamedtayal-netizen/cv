import { motion, useReducedMotion } from "framer-motion";
import { Brain, Code, LineChart, Smartphone, Database, GraduationCap, Check } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Developing ML/DL models to solve complex problems and automate processes",
    features: ["Image and text classification", "Prediction and data analysis", "Natural language processing"],
  },
  {
    icon: Code,
    title: "Full Stack Web Development",
    description: "Building complete web applications from frontend to backend",
    features: ["Interactive and fast websites", "Advanced admin dashboards", "Professional APIs"],
  },
  {
    icon: LineChart,
    title: "Data Analysis",
    description: "Extracting valuable insights from data and visualizing them professionally",
    features: ["Data cleaning and processing", "Data visualization", "Analytical reports"],
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Developing mobile apps with modern technologies",
    features: ["React Native", "UI/UX Design", "API Integration"],
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Designing and managing efficient and secure databases",
    features: ["Schema Design", "Performance Optimization", "Backup Solutions"],
  },
  {
    icon: GraduationCap,
    title: "Training & Education",
    description: "Helping others learn programming and AI",
    features: ["Concept Explanation", "Project Assistance", "Code Review"],
  },
];

export const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="section-eyebrow">Services</div>
          <h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">What I Can <span className="text-gradient">Offer</span>.</h2>
          <p className="mt-4 text-editorial text-lg">Diverse services in AI and software development</p>
        </div>
        
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-8 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
              
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet/20 border border-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300 mb-6">
                <s.icon size={22} className="text-primary-glow" />
              </div>
              
              <h3 className="font-display text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-editorial text-[1.05rem] mb-6">{s.description}</p>
              
              <ul className="space-y-3">
                {s.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check size={16} className="text-primary shrink-0 mt-0.5 opacity-80" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
