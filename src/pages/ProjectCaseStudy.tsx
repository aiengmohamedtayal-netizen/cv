import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight, Github, Globe } from "lucide-react";
import { projectsData } from "@/data/projects";
import { getLocalizedProject } from "@/data/projectContent";
import { CursorGlow } from "@/components/CursorGlow";
import SeoHead, { SITE_URL, DEFAULT_OG_IMAGE } from "@/components/SEO";
import { useLocale } from "@/i18n/LocaleProvider";

export const ProjectCaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const { locale, t, localizedPath } = useLocale();
  const sourceProject = projectsData.find((project) => project.id === id);
  const project = sourceProject ? getLocalizedProject(sourceProject, locale) : undefined;

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <>
        <SeoHead title={t.caseStudy.projectNotFoundTitle} description={t.caseStudy.projectNotFoundDescription} path="/404" noindex />
        <Navigate to={localizedPath("/404")} replace />
      </>
    );
  }

  const { caseStudy } = project;
  const projectPath = `/project/${project.id}`;
  const projectUrl = `${SITE_URL}${localizedPath(projectPath)}`;
  const pageTitle = `${project.title} ${t.caseStudy.caseStudySuffix}`;
  const pageDescription = `${project.desc} ${t.caseStudy.descriptionSuffix}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CreativeWork", "@id": `${projectUrl}#case-study`, name: project.title, description: project.desc, url: projectUrl, image: DEFAULT_OG_IMAGE, author: { "@type": "Person", name: "Mohamed Tayal", url: SITE_URL }, about: project.tag, keywords: project.tech, mainEntityOfPage: projectUrl },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t.nav.home, item: `${SITE_URL}${localizedPath("/")}` },
        { "@type": "ListItem", position: 2, name: t.nav.projects, item: `${SITE_URL}${localizedPath("/#projects")}` },
        { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
      ] },
    ],
  };
  const chevronClass = locale === "ar" ? "rotate-180" : "";

  return (
    <>
      <SeoHead title={pageTitle} description={pageDescription} path={projectPath} image={DEFAULT_OG_IMAGE} type="article" jsonLd={structuredData} />
      <main className="relative min-h-screen pb-32">
        <CursorGlow />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-background" />
        <div className={`pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br ${project.gradient} opacity-20 blur-[150px]`} />
        <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay" />

        <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full glass-strong px-3 py-2 shadow-[0_10px_40px_-10px_hsl(230_50%_0%/0.5)]">
            <Link to={localizedPath("/")} className="group flex items-center gap-2 rounded-full py-1.5 pl-3 pr-4 outline-none transition-colors hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-primary">
              <ArrowLeft size={16} className={`text-muted-foreground transition-transform group-hover:-translate-x-1 ${chevronClass}`} />
              <span className="text-sm font-medium">{t.caseStudy.backToPortfolio}</span>
            </Link>
          </div>
        </nav>

        <div className="container max-w-4xl pt-32">
          <nav aria-label={t.caseStudy.breadcrumb} className="mb-10 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to={localizedPath("/")} className="transition-colors hover:text-foreground">{t.nav.home}</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} className={chevronClass} /></li>
              <li><Link to={localizedPath("/#projects")} className="transition-colors hover:text-foreground">{t.nav.projects}</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} className={chevronClass} /></li>
              <li aria-current="page" className="text-foreground">{project.title}</li>
            </ol>
          </nav>

          <header className="mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6 flex items-center gap-3 font-mono text-sm text-primary-glow"><span>{t.nav.projects}</span><ChevronRight size={14} className={`opacity-50 ${chevronClass}`} /><span>{project.tag}</span></div>
              <h1 className="mb-8 font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">{project.title}</h1>
              <p className="text-editorial text-xl md:text-2xl">{project.desc}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-magnetic outline-none focus-visible:ring-2 focus-visible:ring-primary">{t.caseStudy.liveDemo} <Globe size={16} className="ms-2" /></a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost-glow outline-none focus-visible:ring-2 focus-visible:ring-primary"><Github size={16} className="me-2" />{t.caseStudy.viewSource}</a>}
              </div>
            </motion.div>
          </header>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="group relative mb-24 flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border border-foreground/10 bg-black/40 glass-strong shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 transition-opacity duration-700 group-hover:opacity-70`} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10 px-6 text-center"><p className="font-display text-4xl font-bold uppercase tracking-widest opacity-30 mix-blend-overlay" aria-hidden="true">{t.caseStudy.architecturePlaceholder}</p></div>
          </motion.div>

          <div className="grid gap-24">
            <section className="grid gap-12 md:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}><div className="section-eyebrow mb-4">{t.caseStudy.overview}</div><p className="mb-6 text-editorial text-lg">{caseStudy.overview}</p><h2 className="mb-4 font-display text-2xl font-semibold">{t.caseStudy.challenge}</h2><p className="text-editorial text-lg">{caseStudy.problem}</p></motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }}><div className="section-eyebrow mb-4">{t.caseStudy.approach}</div><h2 className="mb-4 font-display text-2xl font-semibold">{t.caseStudy.solution}</h2><p className="text-editorial text-lg">{caseStudy.solution}</p></motion.div>
            </section>

            <section>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}><div className="section-eyebrow mb-4">{t.caseStudy.engineering}</div><h2 className="mb-10 font-display text-3xl font-semibold">{t.caseStudy.architecture}</h2></motion.div>
              <div className="grid gap-6 sm:grid-cols-3">{caseStudy.architecture.map((item, index) => <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.1 }} className="rounded-2xl glass p-6 transition-colors hover:border-primary/30"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-glow"><item.icon size={20} /></div><h4 className="mb-2 font-display text-lg font-semibold">{item.title}</h4><p className="text-editorial text-[1.05rem]">{item.description}</p></motion.div>)}</div>
            </section>

            <section className="grid gap-12 md:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}><div className="section-eyebrow mb-4">{t.caseStudy.stack}</div><h2 className="mb-6 font-display text-3xl font-semibold">{t.caseStudy.technologies}</h2><div className="flex flex-wrap gap-3">{project.tech.map((technology) => <span key={technology} className="chip border-foreground/10 px-4 py-2 text-sm">{technology}</span>)}</div></motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }}><div className="section-eyebrow mb-4">{t.caseStudy.results}</div><h2 className="mb-6 font-display text-3xl font-semibold">{t.caseStudy.performance}</h2><div className="space-y-4">{caseStudy.performance.map((metric, index) => <div key={index} className="flex items-center justify-between rounded-xl glass p-4"><span className="font-medium text-muted-foreground">{metric.metric}</span><span className="font-mono font-bold text-primary-glow">{metric.value}</span></div>)}</div></motion.div>
            </section>

            <section><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}><div className="section-eyebrow mb-4">{t.caseStudy.nextSteps}</div><h2 className="mb-8 font-display text-3xl font-semibold">{t.caseStudy.improvements}</h2><div className="max-w-3xl space-y-4">{caseStudy.future.map((item, index) => <div key={index} className="flex items-start gap-4 rounded-2xl glass p-5 transition-colors hover:border-primary/20"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" /><p className="text-editorial text-[1.05rem]">{item}</p></div>)}</div></motion.div></section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectCaseStudy;
