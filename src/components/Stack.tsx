import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Target, Briefcase, Calendar } from "lucide-react";
import type { LocalizedSkill } from "@/i18n/skillTranslations";
import { skillTranslations } from "@/i18n/skillTranslations";
import { useLocale } from "@/i18n/LocaleProvider";

export const Stack = () => {
  const { locale, t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState<LocalizedSkill | null>(null);
  const skillGroups = skillTranslations[locale];

  useEffect(() => setActiveSkill(null), [locale]);

  return (
    <section id="stack" className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-eyebrow">{t.stack.eyebrow}</div>
          <h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">{t.stack.headingLead} <span className="text-gradient">{t.stack.headingAccent}</span>.</h2>
          <p className="mx-auto mt-5 text-center text-editorial text-[1.05rem]">{t.stack.description}</p>
        </div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: groupIndex * 0.1, duration: 0.6 }} className="rounded-3xl border border-foreground/5 glass p-8 transition-colors hover:border-primary/20">
              <div className="mb-8 flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/20 to-violet/20 text-primary-glow shadow-[0_0_15px_hsl(var(--primary)/0.2)]"><group.icon size={20} /></div><h3 className="font-display text-2xl font-bold tracking-tight">{group.title}</h3></div>
              <div className="flex flex-wrap gap-3">{group.items.map((skill, index) => <motion.button key={skill.name} type="button" onClick={() => setActiveSkill(skill)} initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.05 }} className={`rounded-xl border px-4 py-2.5 text-sm font-medium outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary ${activeSkill?.name === skill.name ? "border-primary/50 bg-primary/20 text-primary-glow shadow-[0_0_15px_hsl(var(--primary)/0.3)]" : "border-foreground/10 bg-background/50 text-foreground/80 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"}`}>{skill.name}</motion.button>)}</div>
            </motion.div>
          ))}

          <AnimatePresence>
            {activeSkill && (
              <motion.div role="dialog" aria-modal="true" aria-labelledby="skill-detail-title" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="fixed inset-x-4 bottom-4 z-50 rounded-3xl border border-primary/20 glass-strong p-6 shadow-2xl md:absolute md:left-1/2 md:top-1/2 md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:p-8">
                <div className="mb-6 flex items-start justify-between"><div><div className="mb-2 font-mono text-xs uppercase tracking-wider text-primary-glow">{t.stack.technologyProfile}</div><h4 id="skill-detail-title" className="font-display text-3xl font-bold">{activeSkill.name}</h4></div><button type="button" onClick={() => setActiveSkill(null)} className="rounded-full p-2 outline-none transition-colors hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-primary" aria-label={t.stack.closeDetails}><X size={20} /></button></div>
                <p className="mb-8 text-editorial text-[1.05rem]">{activeSkill.description}</p>
                <div className="space-y-4">
                  <div className="flex gap-4 rounded-2xl border border-foreground/5 bg-background/50 p-4"><Target size={20} className="mt-0.5 shrink-0 text-primary" /><div><div className="mb-1 text-sm font-semibold">{t.stack.realWorldApplication}</div><div className="text-sm text-muted-foreground">{activeSkill.usage}</div></div></div>
                  <div className="flex gap-4 rounded-2xl border border-foreground/5 bg-background/50 p-4"><Calendar size={20} className="mt-0.5 shrink-0 text-violet" /><div><div className="mb-1 text-sm font-semibold">{t.stack.experienceLevel}</div><div className="text-sm text-muted-foreground">{activeSkill.experience}</div></div></div>
                  <div className="flex gap-4 rounded-2xl border border-foreground/5 bg-background/50 p-4"><Briefcase size={20} className="mt-0.5 shrink-0 text-pink" /><div><div className="mb-2 text-sm font-semibold">{t.stack.appliedProjects}</div><div className="flex flex-wrap gap-2">{activeSkill.projects.map((project) => <span key={project} className="rounded-md border border-foreground/10 bg-foreground/5 px-2 py-1 text-xs">{project}</span>)}</div></div></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>{activeSkill && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveSkill(null)} className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" />}</AnimatePresence>
        </div>
      </div>
    </section>
  );
};
