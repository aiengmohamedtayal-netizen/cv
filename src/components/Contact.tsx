import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

const socials = [
  { icon: Github, href: "https://github.com/mohamedtayal", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamedtayal", label: "LinkedIn" },
  { icon: Mail, href: "mailto:mota200615@gmail.com", label: "Email" },
];

export const Contact = () => {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://formsubmit.co/ajax/ai4241379@deltauniv.edu.eg", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...data,
          _subject: `New Portfolio Inquiry: ${data.subject || 'Contact'}`,
          _template: "table"
        }),
      });
      
      const result = await res.json();
      if (result.success !== "true" && !result.success) throw new Error("Failed to send message");
      
      setSuccess(true);
      form.reset();
      
      // Reset success state after animation
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred while sending your message.";
      toast.error(errorMsg);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="container max-w-5xl lg:max-w-7xl">
        <div className="grid lg:grid-cols-[1.8fr_1.2fr] gap-8 items-center">
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
          <div className={`absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl ${shouldReduceMotion ? '' : 'animate-drift'}`} />
          <div className={`absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet/20 blur-3xl ${shouldReduceMotion ? '' : 'animate-drift'}`} />
          
          <div className="relative grid md:grid-cols-[1fr_1.1fr] gap-12 items-start">
            <div>
              <div className="section-eyebrow">Contact</div>
              <h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">
                Hire a <span className="text-gradient">Systems Architect</span>.
              </h2>
              <p className="mt-5 text-editorial text-[1.05rem]">
                I architect production-grade AI platforms and frontend experiences for high-growth startups and enterprise teams. If you need a scalable application built from the ground up, let's talk.
              </p>

              <a
                href="https://wa.me/201067035421"
                target="_blank" rel="noreferrer"
                className="mt-8 inline-flex items-center gap-4 px-6 py-4 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 hover:scale-105 transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
                  <MessageCircle size={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground uppercase tracking-widest font-mono">Quick connect</span>
                  <span className="block font-medium mt-0.5">WhatsApp me</span>
                </span>
              </a>

              <div className="mt-10 flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href} target="_blank" rel="noreferrer"
                    aria-label={s.label}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-xl glass hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary outline-none"
                  >
                    <s.icon size={18} className="text-muted-foreground group-hover:text-primary-glow transition-colors" />
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition shadow-[0_0_25px_hsl(var(--primary)/0.4)]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative">
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center glass-strong rounded-2xl p-8 text-center"
                  >
                    <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">I've received your inquiry and will get back to you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.form
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingLabelField label="Name" name="name" required />
                  <FloatingLabelField label="Email" name="email" type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingLabelField label="Phone Number" name="phone" type="tel" />
                  <FloatingLabelField label="Company/Organization" name="company" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingLabelField label="Subject" name="subject" select options={["AI Project", "Web Development", "Data Analysis", "Technical Consultation", "Collaboration / Partnership", "Other"]} required />
                  <FloatingLabelField label="Budget" name="budget" select options={["Less than $500", "$500 - $1500", "$1500 - $5000", "More than $5000"]} />
                </div>
                <FloatingLabelField label="Message Details" name="message" textarea required />
                <button
                  disabled={sending}
                  className="w-full relative overflow-hidden group rounded-xl bg-foreground text-background font-medium py-3.5 px-6 transition-all duration-300 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background outline-none flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2 text-background group-hover:text-white transition-colors">
                    {sending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Sending...
                      </>
                    ) : (
                      <>Send message <Send size={16} /></>
                    )}
                  </span>
                </button>
              </motion.form>
            </div>
          </div>
        </div>

        {/* Interactive 3D Robot Container */}
        <div className="relative lg:block hidden w-full h-[550px]">
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 glass-strong shadow-2xl flex items-center justify-center bg-black/40">
            <InteractiveRobotSpline 
              scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
              className="w-full h-full"
            />
          </div>
          {/* Ambient decorative glowing elements behind the robot card */}
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-primary/30 to-violet/20 blur-2xl opacity-60 -z-10 pointer-events-none animate-pulse-glow" />
        </div>
      </div>

      <p className="mt-12 text-center text-xs font-mono text-muted-foreground tracking-widest uppercase">
        © {new Date().getFullYear()} Mohamed Tayal. All Rights Reserved.
      </p>
    </div>
  </section>
  );
};

const FloatingLabelField = ({
  label, name, type = "text", required, textarea, select, options = [],
}: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean; select?: boolean; options?: string[] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };

  const isFloating = isFocused || hasValue || select;

  return (
    <div className="relative group">
      <label 
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFloating 
            ? "top-1.5 text-[10px] text-primary font-mono uppercase tracking-widest" 
            : "top-3.5 text-sm text-muted-foreground"
        }`}
      >
        {label} {required && "*"}
      </label>
      
      {textarea ? (
        <textarea
          id={name}
          name={name} 
          required={required} 
          rows={4} 
          minLength={30}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`w-full rounded-xl bg-background/40 border border-foreground/10 focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20 outline-none px-4 text-sm resize-none transition-all pb-3 pt-6 ${
            hasValue ? "border-primary/30 bg-background/60" : ""
          }`}
        />
      ) : select ? (
        <div className="relative">
          <select
            id={name}
            name={name} 
            required={required}
            defaultValue=""
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
            className={`w-full rounded-xl bg-background/40 border border-foreground/10 focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20 outline-none px-4 text-sm transition-all appearance-none pb-2 pt-6 ${
              hasValue ? "border-primary/30 bg-background/60 text-foreground" : "text-foreground/70"
            }`}
          >
            <option value="" disabled hidden></option>
            {options.map((opt) => <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      ) : (
        <input
          id={name}
          name={name} 
          type={type} 
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`w-full rounded-xl bg-background/40 border border-foreground/10 focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20 outline-none px-4 text-sm transition-all h-14 pt-4 ${
            hasValue ? "border-primary/30 bg-background/60" : ""
          }`}
        />
      )}
      
      {/* Interactive border glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 pointer-events-none blur-md transition-opacity duration-500 -z-10" />
    </div>
  );
};
