import { motion } from "framer-motion";
import { Brain, Code2, Database, GraduationCap } from "lucide-react";

const pillars = [
  { icon: Brain, title: "AI Models", text: "Building AI models to solve real-world problems." },
  { icon: Code2, title: "Full Stack Web", text: "Developing full-stack web applications." },
  { icon: Database, title: "Data Analysis", text: "Transforming data into smart decisions." },
  { icon: GraduationCap, title: "Education", text: "Delta University for Science & Technology - Major in AI." },
];

export const About = () => (
  <section id="about" className="relative py-28">
    <div className="container grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
      <div>
        <div className="section-eyebrow">About</div>
        <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold leading-tight">
          Building the Future with <span className="text-gradient">AI and Code</span>.
        </h2>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Mohamed Tayal</strong> — AI Student at Delta University, combining academic research in Machine
          Learning with practical application as a Full Stack Developer.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          I don't just study theories, I turn them into real solutions. From machine learning models to full-stack
          web applications — I work on projects that make a tangible difference.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="glass rounded-2xl p-6 hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-violet/20 border border-primary/20 group-hover:scale-110 transition">
              <p.icon size={18} className="text-primary-glow" />
            </div>
            <div className="mt-4 font-display font-semibold text-lg">{p.title}</div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
