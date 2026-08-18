import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { CursorGlow } from "@/components/CursorGlow";
import SeoHead, { SITE_URL } from "@/components/SEO";
import { useLocale } from "@/i18n/LocaleProvider";

import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Services } from "@/components/Services";
import { Certificates } from "@/components/Certificates";

const Index = () => {
  const { locale, t } = useLocale();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name: "Mohamed Tayal",
    jobTitle: t.hero.headingPrimary + " " + t.hero.headingAccent,
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.jpg`,
    sameAs: [
      "https://github.com/mohamedtayal",
      "https://www.linkedin.com/in/mohamedtayal",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Delta University for Science and Technology",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "React.js",
      "Python",
      "Full Stack Development",
    ],
  };

  return (
    <>
      <SeoHead
        title={t.metadata.homeTitle}
        description={t.metadata.homeDescription}
        path={locale === "ar" ? "/ar" : "/"}
        jsonLd={structuredData}
      />
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-primary focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {t.common.skipToContent}
      </a>
      <CursorGlow />
      <Nav />
      <main id="main" className="relative outline-none" tabIndex={-1}>
        <Hero />
        <Stats />
        
        <About />
        <Stack />
        <Services />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
    </>
  );
};

export default Index;
