import { lazy, Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { CursorGlow } from "@/components/CursorGlow";

// Lazy load below-the-fold components to improve initial load performance
const About = lazy(() => import("@/components/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import("@/components/Projects").then(m => ({ default: m.Projects })));
const Stack = lazy(() => import("@/components/Stack").then(m => ({ default: m.Stack })));
const Experience = lazy(() => import("@/components/Experience").then(m => ({ default: m.Experience })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Services = lazy(() => import("@/components/Services").then(m => ({ default: m.Services })));
const Certificates = lazy(() => import("@/components/Certificates").then(m => ({ default: m.Certificates })));

const Index = () => {
  return (
    <>
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-primary focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <CursorGlow />
      <Nav />
      <main id="main" className="relative outline-none" tabIndex={-1}>
        <Hero />
        <Stats />
        
        <Suspense fallback={<div className="h-[20vh]" aria-hidden="true" />}>
          <About />
          <Stack />
          <Services />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
