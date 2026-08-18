import { motion, useReducedMotion } from "framer-motion";
import { Brain, Code, LineChart, Smartphone, Database, GraduationCap, Check } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

const serviceIcons = [Brain, Code, LineChart, Smartphone, Database, GraduationCap];

export const Services = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center"><div className="section-eyebrow">{t.services.eyebrow}</div><h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">{t.services.headingLead} <span className="text-gradient">{t.services.headingAccent}</span>.</h2><p className="mt-4 text-editorial text-lg">{t.services.description}</p></div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{t.services.items.map((service, index) => { const Icon = serviceIcons[index]; return <motion.div key={service.title} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} className="group relative overflow-hidden rounded-2xl glass p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"><div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-colors duration-500 group-hover:bg-primary/20" /><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/20 to-violet/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"><Icon size={22} className="text-primary-glow" /></div><h3 className="mb-3 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">{service.title}</h3><p className="mb-6 text-editorial text-[1.05rem]">{service.description}</p><ul className="space-y-3">{service.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80"><Check size={16} className="mt-0.5 shrink-0 text-primary opacity-80" /><span>{feature}</span></li>)}</ul></motion.div>; })}</div>
      </div>
    </section>
  );
};
