import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Brain, Cpu, Layers, Rocket } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

const statMeta = [
  { icon: Rocket, value: 15, suffix: "+" },
  { icon: Cpu, value: 10, suffix: "+" },
  { icon: Brain, value: 8, suffix: "+" },
  { icon: Layers, value: 20, suffix: "+" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        if (!mountedRef.current) return;
        const progress = Math.min(1, (now - start) / duration);
        setValue(Math.floor((1 - Math.pow(1 - progress, 3)) * to));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => { mountedRef.current = false; observer.disconnect(); };
  }, [to]);
  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
};

const statItemVariants = { hover: { y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } } } as const;

export const Stats = () => {
  const { t } = useLocale();
  return <section className="relative py-20"><div className="container"><div className="relative overflow-hidden rounded-3xl glass p-8 md:p-10"><div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" /><div className="relative grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">{statMeta.map((stat, index) => <motion.div key={stat.value} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover="hover" variants={statItemVariants} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.6 }} className="group cursor-default rounded-2xl p-3 text-center transition-colors duration-200 hover:bg-foreground/[0.03] md:text-left"><stat.icon className="mx-auto mb-3 text-primary-glow transition-transform group-hover:scale-110 md:mx-0" size={22} /><div className="font-display text-fluid-h3 font-bold text-gradient"><Counter to={stat.value} suffix={stat.suffix} /></div><div className="mt-1 text-xs text-muted-foreground md:text-sm">{t.stats.items[index]?.label}</div></motion.div>)}</div></div></div></section>;
};
