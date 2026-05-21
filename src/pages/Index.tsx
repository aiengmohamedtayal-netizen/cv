import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { CursorGlow } from "@/components/CursorGlow";
import { Services } from "@/components/Services";
import { Certificates } from "@/components/Certificates";

const Index = () => {
  return (
    <main className="relative">
      <CursorGlow />
      <Nav />
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
  );
};

export default Index;
