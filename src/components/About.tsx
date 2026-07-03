import { motion, useReducedMotion } from "framer-motion";
import { Brain, Code2, Rocket, Zap } from "lucide-react";

export const About = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="container max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start relative">
          
          {/* Left Column: Storytelling */}
          <div className="relative z-10">
            <div className="section-eyebrow mb-6">The Journey</div>
            <h2 className="font-display text-fluid-h2 font-bold mb-8 text-foreground">
              Engineering with <br />
              <span className="text-gradient">precision</span> & <span className="text-gradient">purpose</span>.
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-editorial text-[1.05rem]"
              >
                <strong className="text-foreground font-medium font-display tracking-tight">I architect intelligent systems from the ground up.</strong> Formally trained in Artificial Intelligence & Computer Science at Delta University, I bridge the gap between complex machine learning research and scalable, production-grade applications.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-editorial text-[1.05rem]"
              >
                My engineering philosophy is rooted in deployment reality. A sophisticated model is useless if it's bottlenecked by poor infrastructure. That's why I engineer the entire stack—ensuring that intelligent features are delivered through hyper-fast, secure, and intuitive frontend architectures.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-editorial text-[1.05rem]"
              >
                Whether I'm optimizing a neural network's inference latency or designing a GPU-accelerated React interface, I treat software engineering as an exact science. The goal is never just to make it work; it's to make it resilient, scalable, and world-class.
              </motion.p>
            </div>
          </div>

          {/* Right Column: Philosophy Blocks */}
          <div className="grid gap-6 relative z-10 perspective-1000 mt-10 lg:mt-0">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[120%] bg-gradient-to-br from-primary/10 via-violet/5 to-transparent rounded-full blur-[100px] -z-10" />

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-3xl p-8 hover:-translate-y-1 hover:border-primary/30 transition-transform duration-500 group border border-foreground/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-glow group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Brain size={24} />
                </div>
                <h3 className="font-display text-xl font-bold">AI Vision</h3>
              </div>
              <p className="text-editorial text-[1.05rem]">
                Transforming complex data into smart decisions. I believe AI should be invisible, acting as an intuitive extension of the user experience rather than a novelty.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="glass-strong rounded-3xl p-8 hover:-translate-y-1 hover:border-violet/30 transition-transform duration-500 group border border-foreground/5 md:ml-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/10 text-violet group-hover:bg-violet/20 group-hover:scale-110 transition-all duration-300">
                  <Code2 size={24} />
                </div>
                <h3 className="font-display text-xl font-bold">Architecture</h3>
              </div>
              <p className="text-editorial text-[1.05rem]">
                Building the scaffolding that makes AI usable. Clean code, strict typings, and component-driven design ensure that the foundation never crumbles under scale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glass-strong rounded-3xl p-8 hover:-translate-y-1 hover:border-emerald-500/30 transition-transform duration-500 group border border-foreground/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                  <Rocket size={24} />
                </div>
                <h3 className="font-display text-xl font-bold">Delivery</h3>
              </div>
              <p className="text-editorial text-[1.05rem]">
                Shipping products that are ready for the real world. Performance, SEO, and accessibility aren't afterthoughts—they are embedded in my delivery process from day one.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
