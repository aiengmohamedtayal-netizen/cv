import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SeoHead from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SeoHead
        title="Page Not Found | Mohamed Tayal"
        description="The requested page could not be found. Return to Mohamed Tayal's portfolio."
        path={location.pathname}
        noindex
      />
      <main className="flex min-h-screen items-center justify-center bg-muted" aria-labelledby="not-found-title">
      <div className="text-center">
        <h1 id="not-found-title" className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
      </main>
    </>
  );
};

export default NotFound;
