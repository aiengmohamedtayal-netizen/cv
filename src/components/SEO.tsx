import { useEffect } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

export const SITE_URL = "https://www.tayal.me";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/profile.jpg`;

type JsonLd = Record<string, unknown> | null;

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd;
};

const normalizePath = (path: string) => {
  if (path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
};

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertLink = (id: string, rel: string, href: string, extra: Record<string, string> = {}) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link#${id}`);

  if (!element) {
    element = document.createElement("link");
    element.id = id;
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
  Object.entries(extra).forEach(([key, value]) => element?.setAttribute(key, value));
};

const SeoHead = ({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  jsonLd = null,
}: SeoHeadProps) => {
  const { locale, config, localizedPath } = useLocale();

  useEffect(() => {
    const rawPath = normalizePath(path);
    const canonicalUrl = `${SITE_URL}${localizedPath(rawPath)}`;
    const alternateEnglish = `${SITE_URL}${rawPath === "/" ? "/en" : `/en${rawPath}`}`;
    const alternateArabic = `${SITE_URL}${rawPath === "/" ? "/ar" : `/ar${rawPath}`}`;
    const robots = noindex ? "noindex,follow" : "index,follow";

    document.title = title;
    document.documentElement.lang = config.lang;
    document.documentElement.dir = config.dir;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    upsertMeta('meta[name="author"]', { name: "author", content: "Mohamed Tayal" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: config.ogLocale });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: locale === "ar" ? "محمد طيّال، مهندس ذكاء اصطناعي ومطور متكامل" : "Mohamed Tayal, AI Engineer and Full Stack Developer",
    });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: canonicalUrl });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    upsertLink("seo-canonical", "canonical", canonicalUrl);
    upsertLink("seo-hreflang-en", "alternate", alternateEnglish, { hreflang: "en" });
    upsertLink("seo-hreflang-ar", "alternate", alternateArabic, { hreflang: "ar" });
    upsertLink("seo-hreflang-default", "alternate", alternateEnglish, { hreflang: "x-default" });

    const structuredData = document.head.querySelector<HTMLScriptElement>("script#seo-jsonld");
    if (jsonLd) {
      const script = structuredData ?? document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      if (!structuredData) document.head.appendChild(script);
    } else {
      structuredData?.remove();
    }
  }, [config, description, image, jsonLd, locale, localizedPath, noindex, path, title, type]);

  return null;
};

export default SeoHead;
