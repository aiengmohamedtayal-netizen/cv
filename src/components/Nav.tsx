import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex items-center gap-2 rounded-full transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_10px_40px_-10px_hsl(230_50%_0%/0.5)]" : "glass"
        } px-3 py-2`}
      >
        <a href="#top" className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet">
            <span className="absolute inset-0 rounded-full blur-md bg-primary/50" />
            <span className="relative font-display font-bold text-primary-foreground text-sm">M</span>
          </span>
          <span className="font-display font-semibold tracking-tight hidden sm:inline">Tayal</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 px-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3.5 py-1.5 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 ml-1 px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-violet text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] hover:opacity-90 transition"
        >
          Hire me
        </a>
        <button onClick={() => setOpen((o) => !o)} className="md:hidden p-2 rounded-full hover:bg-foreground/5" aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-4 right-4 glass-strong rounded-2xl p-3"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-foreground/5 text-sm"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
