import { useEffect, useState, useRef } from "react";
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
  const [activeHash, setActiveHash] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll and active section observer
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial check
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Intersection observer for active links
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    // Observe all sections that have IDs matching our links
    links.forEach((link) => {
      const id = link.href.substring(1);
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Mobile menu body lock and escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pointer-events-none"
    >
      <nav
        className={`flex items-center gap-2 rounded-full transition-all duration-500 pointer-events-auto ${
          scrolled ? "glass-strong shadow-[0_10px_40px_-10px_hsl(230_50%_0%/0.5)]" : "glass"
        } px-3 py-2`}
        aria-label="Main navigation"
      >
        <a 
          href="#top" 
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-[44px]"
          aria-label="Home"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet">
            <span className="absolute inset-0 rounded-full blur-md bg-primary/50" />
            <span className="relative font-display font-bold text-primary-foreground text-sm">M</span>
          </span>
          <span className="font-display font-semibold tracking-tight hidden sm:inline">Tayal</span>
        </a>
        
        <ul className="hidden md:flex items-center gap-1 px-2">
          {links.map((l) => {
            const isActive = activeHash === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm transition-colors min-h-[44px] flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background text-muted-foreground hover:text-foreground hover:bg-foreground/5 ${
                    isActive 
                      ? "bg-foreground/10 text-foreground font-medium" 
                      : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
        
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 ml-1 px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-violet text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] hover:opacity-90 transition min-h-[44px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Hire me
        </a>
        
        <button 
          onClick={() => setOpen((o) => !o)} 
          className="md:hidden p-2 rounded-full hover:bg-foreground/5 min-h-[44px] min-w-[44px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" 
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-4 right-4 glass-strong rounded-2xl p-3 shadow-2xl pointer-events-auto origin-top"
          >
            {links.map((l) => {
              const isActive = activeHash === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm transition-colors min-h-[44px] flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-foreground/5 text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {l.label}
                </a>
              );
            })}
            <div className="mt-2 pt-2 border-t border-foreground/5">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-violet text-primary-foreground text-center min-h-[44px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
