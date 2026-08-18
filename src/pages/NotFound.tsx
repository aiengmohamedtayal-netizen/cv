import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SeoHead from "@/components/SEO";
import { useLocale } from "@/i18n/LocaleProvider";

const NotFound = () => {
  const location = useLocation();
  const { t, localizedPath } = useLocale();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SeoHead title={`${t.common.notFoundTitle} | Mohamed Tayal`} description={t.common.notFoundDescription} path={location.pathname} noindex />
      <main className="flex min-h-screen items-center justify-center bg-muted" aria-labelledby="not-found-title">
        <div className="text-center">
          <h1 id="not-found-title" className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">{t.common.notFoundTitle}</p>
          <p className="mb-4 text-muted-foreground">{t.common.notFoundDescription}</p>
          <a href={localizedPath("/")} className="text-primary underline hover:text-primary/90">{t.common.backHome}</a>
        </div>
      </main>
    </>
  );
};

export default NotFound;
