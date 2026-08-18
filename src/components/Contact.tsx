import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { useLocale } from "@/i18n/LocaleProvider";

const socials = [
  { icon: Github, href: "https://github.com/mohamedtayal", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamedtayal", label: "LinkedIn" },
  { icon: Mail, href: "mailto:mota200615@gmail.com", label: "Email" },
];

export const Contact = () => {
  const { t, locale } = useLocale();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/ai4241379@deltauniv.edu.eg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `New Portfolio Inquiry: ${data.subject || "Contact"}`, _template: "table" }),
      });
      const result = await response.json();
      if (result.success !== "true" && !result.success) throw new Error(t.contact.error);
      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : t.contact.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="container max-w-5xl lg:max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.8fr_1.2fr]">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 shadow-2xl md:p-12">
            <div className={`absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl ${shouldReduceMotion ? "" : "animate-drift"}`} />
            <div className={`absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet/20 blur-3xl ${shouldReduceMotion ? "" : "animate-drift"}`} />

            <div className="relative grid items-start gap-12 md:grid-cols-[1fr_1.1fr]">
              <div>
                <div className="section-eyebrow">{t.contact.eyebrow}</div>
                <h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">
                  {t.contact.headingLead} <span className="text-gradient">{t.contact.headingAccent}</span>.
                </h2>
                <p className="mt-5 text-editorial text-[1.05rem]">{t.contact.description}</p>

                <a href="https://wa.me/201067035421" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-4 rounded-full border border-primary/40 bg-primary/10 px-6 py-4 outline-none transition-all duration-300 hover:scale-105 hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]"><MessageCircle size={18} /></span>
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">{t.contact.quickConnect}</span>
                    <span className="mt-0.5 block font-medium">{t.contact.whatsapp}</span>
                  </span>
                </a>

                <div className="mt-10 flex gap-4">
                  {socials.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="group relative flex h-12 w-12 items-center justify-center rounded-xl glass outline-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary">
                      <social.icon size={18} className="text-muted-foreground transition-colors group-hover:text-primary-glow" />
                      <span className="absolute inset-0 rounded-xl opacity-0 shadow-[0_0_25px_hsl(var(--primary)/0.4)] transition group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative">
                <AnimatePresence>
                  {success && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl glass-strong p-8 text-center" role="status" aria-live="polite">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]"><CheckCircle2 size={40} /></div>
                      <h3 className="mb-2 font-display text-2xl font-bold">{t.contact.messageSent}</h3>
                      <p className="text-muted-foreground">{t.contact.success}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatingLabelField label={t.contact.name} name="name" required />
                    <FloatingLabelField label={t.contact.email} name="email" type="email" required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatingLabelField label={t.contact.phone} name="phone" type="tel" />
                    <FloatingLabelField label={t.contact.company} name="company" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatingLabelField label={t.contact.subject} name="subject" select options={t.contact.subjectOptions} required />
                    <FloatingLabelField label={t.contact.budget} name="budget" select options={t.contact.budgetOptions} />
                  </div>
                  <FloatingLabelField label={t.contact.message} name="message" textarea required />
                  <button type="submit" disabled={sending} className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 py-3.5 font-medium text-background outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
                      {sending ? <><svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>{t.contact.sending}</> : <>{t.contact.sendMessage} <Send size={16} /></>}
                    </span>
                  </button>
                </motion.form>
              </div>
            </div>
          </div>

          <div className="relative hidden h-[550px] w-full lg:block">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 glass-strong shadow-2xl">
              <InteractiveRobotSpline scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode" className="h-full w-full" />
            </div>
            <div className="pointer-events-none absolute -inset-4 -z-10 animate-pulse-glow rounded-[2.5rem] bg-gradient-to-tr from-primary/30 to-violet/20 opacity-60 blur-2xl" />
          </div>
        </div>

        <p className="mt-12 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">© {new Date().getFullYear()} Mohamed Tayal. {t.contact.allRights}</p>
      </div>
    </section>
  );
};

const FloatingLabelField = ({ label, name, type = "text", required, textarea, select, options = [] }: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean; select?: boolean; options?: readonly string[] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setIsFocused(false); setHasValue(event.target.value.length > 0); };
  const isFloating = isFocused || hasValue || select;

  return (
    <div className="group relative">
      <label htmlFor={name} className={`pointer-events-none absolute left-4 transition-all duration-200 ${isFloating ? "top-1.5 text-[10px] font-mono uppercase tracking-widest text-primary" : "top-3.5 text-sm text-muted-foreground"}`}>{label} {required && "*"}</label>
      {textarea ? <textarea id={name} name={name} required={required} rows={4} minLength={30} onFocus={() => setIsFocused(true)} onBlur={handleBlur} onChange={(event) => setHasValue(event.target.value.length > 0)} className={`w-full resize-none rounded-xl border border-foreground/10 bg-background/40 px-4 pb-3 pt-6 text-sm outline-none transition-all focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20 ${hasValue ? "border-primary/30 bg-background/60" : ""}`} /> : select ? <div className="relative"><select id={name} name={name} required={required} defaultValue="" onFocus={() => setIsFocused(true)} onBlur={handleBlur} onChange={(event) => setHasValue(event.target.value.length > 0)} className={`w-full appearance-none rounded-xl border border-foreground/10 bg-background/40 px-4 pb-2 pt-6 text-sm outline-none transition-all focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20 ${hasValue ? "border-primary/30 bg-background/60 text-foreground" : "text-foreground/70"}`}><option value="" disabled hidden />{options.map((option) => <option key={option} value={option} className="bg-background text-foreground">{option}</option>)}</select><div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-50"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></div></div> : <input id={name} name={name} type={type} required={required} onFocus={() => setIsFocused(true)} onBlur={handleBlur} onChange={(event) => setHasValue(event.target.value.length > 0)} className={`h-14 w-full rounded-xl border border-foreground/10 bg-background/40 px-4 pt-4 text-sm outline-none transition-all focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20 ${hasValue ? "border-primary/30 bg-background/60" : ""}`} />}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-primary/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
};
