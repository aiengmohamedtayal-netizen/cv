import { motion } from "framer-motion";

const groups = [
  { title: "Artificial Intelligence & Machine Learning", items: [
    { name: "Python", pct: 90 },
    { name: "TensorFlow / Keras", pct: 80 },
    { name: "PyTorch", pct: 75 },
    { name: "Scikit-learn", pct: 85 },
    { name: "Data Analysis (Pandas/NumPy)", pct: 88 }
  ]},
  { title: "Frontend Development", items: [
    { name: "HTML / CSS", pct: 95 },
    { name: "JavaScript", pct: 85 },
    { name: "React.js", pct: 80 },
    { name: "Bootstrap / Tailwind", pct: 90 },
    { name: "TypeScript", pct: 70 }
  ]},
  { title: "Backend Development", items: [
    { name: "Node.js / Express", pct: 82 },
    { name: "Django / Flask", pct: 78 },
    { name: "REST APIs", pct: 85 },
    { name: "PostgreSQL / MongoDB", pct: 80 }
  ]},
  { title: "Tools & Technologies", items: [
    { name: "Git / GitHub", pct: 90 },
    { name: "Docker", pct: 70 },
    { name: "Linux", pct: 75 },
    { name: "Jupyter / Colab", pct: 92 }
  ]},
];

export const Stack = () => (
  <section id="stack" className="relative py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <div className="section-eyebrow">Toolkit</div>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold">Technologies I <span className="text-gradient">Master</span>.</h2>
      </div>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <div className="font-display font-semibold mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
              {g.title}
            </div>
            <div className="flex flex-col gap-3.5">
              {g.items.map((t, idx) => (
                <div key={t.name}>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>{t.name}</span>
                    <span className="text-muted-foreground">{t.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.pct}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 + idx * 0.05 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-primary to-violet rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
