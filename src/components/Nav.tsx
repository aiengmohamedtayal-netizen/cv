import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";

const sectionIds = ["about", "projects", "stack", "experience", "contact"];

export const Nav = () => {
  const { t, locale, localizedPath, switchLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#stack", label: t.nav.stack },
    { href: "#experience", label: t.nav.journey },
    { href: "#contact", label: t.nav.contact },
  ];

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

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) setOpen(false);
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

  const languageButton = (
    <button
      type="button"
      onClick={() => switchLocale()}
      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`${t.nav.language}: ${locale === "en" ? t.nav.switchToArabic : t.nav.switchToEnglish}`}
      title={locale === "en" ? t.nav.switchToArabic : t.nav.switchToEnglish}
    >
      <Languages size={15} aria-hidden="true" />
      <span>{locale === "en" ? t.nav.switchToArabic : t.nav.switchToEnglish}</span>
    </button>
  );

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
        aria-label={t.nav.ariaLabel}
      >
        <a
          href={localizedPath("#top")}
          className="flex min-h-[44px] items-center gap-2 rounded-full px-2 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={t.nav.home}
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet">
            <span className="absolute inset-0 rounded-full bg-primary/50 blur-md" />
            <span className="relative font-display text-sm font-bold text-primary-foreground">M</span>
          </span>
          <span className="hidden font-display font-semibold tracking-tight sm:inline">Tayal</span>
        </a>

        <ul className="hidden items-center gap-1 px-2 md:flex">
          {links.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <li key={link.href}>
                <a
                  href={localizedPath(link.href)}
                  className={`flex min-h-[44px] items-center rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-foreground/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? "bg-foreground/10 font-medium text-foreground" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={localizedPath("#contact")}
          className="hidden min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-primary to-violet px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
        >
          {t.nav.hireMe}
        </a>

        <div className="hidden md:block">{languageButton}</div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 outline-none hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
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
            aria-label={t.nav.mobileMenu}
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto absolute left-4 right-4 top-20 origin-top rounded-2xl glass-strong p-3 shadow-2xl md:hidden"
          >
            {links.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={localizedPath(link.href)}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-[44px] items-center rounded-xl px-4 py-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? "bg-primary/10 font-medium text-primary" : "text-foreground hover:bg-foreground/5"}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="mt-2 space-y-2 border-t border-foreground/5 pt-2">
              <a
                href={localizedPath("#contact")}
                onClick={() => setOpen(false)}
                className="block min-h-[44px] rounded-xl bg-gradient-to-r from-primary to-violet px-4 py-3 text-center text-sm font-medium text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t.nav.hireMe}
              </a>
              <div className="flex justify-center">{languageButton}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
