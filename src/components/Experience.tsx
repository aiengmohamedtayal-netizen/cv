import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Briefcase, Sparkles, Rocket } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

const timelineIcons = [Rocket, GraduationCap, Sparkles, Briefcase];

export const Experience = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="relative py-28">
      <div className="container max-w-4xl">
        <div className="text-center"><div className="section-eyebrow">{t.experience.eyebrow}</div><h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">{t.experience.headingLead} <span className="text-gradient">{t.experience.headingAccent}</span> {t.experience.headingRest}</h2></div>
        <div className="relative mt-14"><div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:left-1/2" />{t.experience.items.map((entry, index) => { const Icon = timelineIcons[index]; return <motion.div key={`${entry.year}-${entry.title}`} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: index * 0.05 }} className={`group relative pb-10 pl-14 md:grid md:grid-cols-2 md:gap-10 md:pl-0 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}><div className={`md:text-right ${index % 2 ? "md:text-left" : ""}`}><div className="absolute left-3 mt-1 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-background ring-2 ring-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/60 md:left-1/2"><span className={`h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] ${shouldReduceMotion ? "" : "animate-pulse-glow"}`} /></div><div className="font-mono text-xs text-primary-glow">{entry.year}</div><div className="mt-1 font-display text-xl font-semibold">{entry.title}</div><div className="text-sm text-muted-foreground">{entry.org}</div></div><div className={`mt-3 max-w-md rounded-2xl glass p-5 transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/[0.02] md:mt-1 ${index % 2 ? "md:mr-auto" : "md:ml-auto"}`}><div className="flex items-start gap-3"><Icon size={18} className="mt-0.5 shrink-0 text-primary-glow transition-transform duration-300 group-hover:-translate-y-0.5" /><p className="text-sm leading-relaxed text-muted-foreground">{entry.text}</p></div></div></motion.div>; })}</div>
      </div>
    </section>
  );
};
