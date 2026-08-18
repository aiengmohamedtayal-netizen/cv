/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { localeConfig, translations, type Locale, type Translation } from "./translations";

const localePattern = /^\/(en|ar)(?=\/|$)/;

export const resolveLocale = (pathname: string): Locale => {
  const match = pathname.match(localePattern);
  return match?.[1] === "ar" ? "ar" : "en";
};

export const stripLocale = (pathname: string) => pathname.replace(localePattern, "") || "/";

export const withLocale = (pathname: string, locale: Locale) => {
  const path = stripLocale(pathname);
  return `/${locale}${path === "/" ? "" : path}`;
};

export const withLocaleHash = (hash: string, locale: Locale) => `/${locale}${hash || ""}`;

export type LocaleContextValue = {
  locale: Locale;
  config: (typeof localeConfig)[Locale];
  t: Translation;
  switchLocale: (nextLocale?: Locale) => void;
  localizedPath: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const locale = resolveLocale(location.pathname);
  const config = localeConfig[locale];
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = config.lang;
    document.documentElement.dir = config.dir;
    document.documentElement.dataset.locale = locale;

    let ogLocale = document.head.querySelector<HTMLMetaElement>('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement("meta");
      ogLocale.setAttribute("property", "og:locale");
      document.head.appendChild(ogLocale);
    }
    ogLocale.content = config.ogLocale;
  }, [config, locale]);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    config,
    t,
    localizedPath: (path) => withLocale(path, locale),
    switchLocale: (nextLocale = locale === "en" ? "ar" : "en") => {
      const nextPath = withLocale(location.pathname, nextLocale);
      navigate(`${nextPath}${location.search}${location.hash}`);
    },
  }), [config, location.hash, location.pathname, location.search, locale, navigate, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
};
