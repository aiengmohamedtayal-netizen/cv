import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Send, Twitter } from "lucide-react";
import { toast } from "sonner";

const socials = [
  { icon: Github, href: "https://github.com/mohamedtayal", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamedtayal", label: "LinkedIn" },
  { icon: Mail, href: "mailto:mota200615@gmail.com", label: "Email" },
];

export const Contact = () => {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send message");
      
      toast.success(result.message || "Your message has been sent successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "An error occurred while sending your message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container max-w-5xl">
        <div className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-drift" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet/20 blur-3xl animate-drift" />
          <div className="relative grid md:grid-cols-[1fr_1.1fr] gap-10 items-start">
            <div>
              <div className="section-eyebrow">Contact</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
                Let's build <span className="text-gradient">something intelligent</span>.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
                Have an AI feature, agent, or product idea? I love early conversations — the messier, the better.
              </p>

              <a
                href="https://wa.me/201067035421"
                target="_blank" rel="noreferrer"
                className="mt-7 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary/20 transition group"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                  <MessageCircle size={16} />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Quick connect</span>
                  <span className="block font-medium">WhatsApp me</span>
                </span>
              </a>

              <div className="mt-8 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href} target="_blank" rel="noreferrer"
                    aria-label={s.label}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-xl glass hover:border-primary/40 transition"
                  >
                    <s.icon size={16} className="text-muted-foreground group-hover:text-primary-glow transition" />
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition shadow-[0_0_25px_hsl(var(--primary)/0.4)]" />
                  </a>
                ))}
              </div>
            </div>

            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name *" name="name" required />
                <Field label="Email *" name="email" type="email" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Phone Number" name="phone" type="tel" />
                <Field label="Company/Organization" name="company" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Subject *" name="subject" select options={["AI Project", "Web Development", "Data Analysis", "Technical Consultation", "Collaboration / Partnership", "Other"]} required />
                <Field label="Budget" name="budget" select options={["Less than $500", "$500 - $1500", "$1500 - $5000", "More than $5000"]} />
              </div>
              <Field label="Message Details *" name="message" textarea required />
              <button
                disabled={sending}
                className="btn-magnetic w-full justify-center disabled:opacity-60"
              >
                {sending ? "Sending..." : <>Send message <Send size={16} /></>}
              </button>
            </motion.form>
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-mono text-muted-foreground">
          © {new Date().getFullYear()} Mohamed Tayal. All Rights Reserved. Better Call Tayal.
        </p>
      </div>
    </section>
  );
};

const Field = ({
  label, name, type = "text", required, textarea, select, options = [],
}: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean; select?: boolean; options?: string[] }) => (
  <label className="block group">
    <span className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
    {textarea ? (
      <textarea
        name={name} required={required} rows={4} minLength={30}
        placeholder={name === "message" ? "Write details about your project or inquiry here..." : ""}
        className="w-full rounded-xl bg-background/40 border border-foreground/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none px-4 py-3 text-sm resize-none transition"
      />
    ) : select ? (
      <select
        name={name} required={required}
        className="w-full rounded-xl bg-background/40 border border-foreground/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none px-4 py-3 text-sm transition appearance-none"
      >
        <option value="">Select an option</option>
        {options.map((opt) => <option key={opt} value={opt} className="bg-background">{opt}</option>)}
      </select>
    ) : (
      <input
        name={name} type={type} required={required}
        className="w-full rounded-xl bg-background/40 border border-foreground/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none px-4 py-3 text-sm transition"
      />
    )}
  </label>
);
