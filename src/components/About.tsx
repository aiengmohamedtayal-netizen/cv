import { motion, useReducedMotion } from "framer-motion";
import { Brain, Code2, Rocket } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

export const About = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div className="container max-w-5xl">
        <div className="relative grid items-start gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative z-10">
            <div className="section-eyebrow mb-6">{t.about.eyebrow}</div>
            <h2 className="mb-8 font-display text-fluid-h2 font-bold text-foreground">
              {t.about.headingLead} <br />
              <span className="text-gradient">{t.about.highlightOne}</span> {t.about.conjunction} <span className="text-gradient">{t.about.highlightTwo}</span>.
            </h2>

            <div className="space-y-6 text-lg font-light leading-relaxed text-muted-foreground">
              {t.about.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="text-editorial text-[1.05rem]"
                >
                  {index === 0 ? <strong className="font-display font-medium tracking-tight text-foreground">{paragraph.split(".")[0]}.</strong> : null}
                  {index === 0 ? paragraph.slice(paragraph.indexOf(".") + 1) : paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-10 grid gap-6 perspective-1000 lg:mt-0">
            <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/10 via-violet/5 to-transparent blur-[100px]" />
            {[Brain, Code2, Rocket].map((Icon, index) => (
              <motion.div
                key={t.about.cards[index].title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`glass-strong rounded-3xl border border-foreground/5 p-8 transition-transform duration-500 hover:-translate-y-1 hover:border-primary/30 ${index === 1 ? "md:ml-12" : ""}`}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-glow transition-all duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold">{t.about.cards[index].title}</h3>
                </div>
                <p className="text-editorial text-[1.05rem]">{t.about.cards[index].text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
