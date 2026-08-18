import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Nav } from "@/components/Nav";
import { LocaleProvider, resolveLocale, withLocale, withLocaleHash, useLocale } from "@/i18n/LocaleProvider";
import { getLocalizedProject } from "@/data/projectContent";
import { projectsData } from "@/data/projects";
import { ProjectCaseStudy } from "@/pages/ProjectCaseStudy";

const LocaleProbe = () => {
  const { locale, t, switchLocale } = useLocale();
  const location = useLocation();
  return <div><span data-testid="locale">{locale}</span><span data-testid="path">{location.pathname}</span><span data-testid="heading">{t.hero.headingPrimary}</span><button type="button" onClick={() => switchLocale()}>{locale === "ar" ? t.nav.switchToEnglish : t.nav.switchToArabic}</button></div>;
};

describe("localization foundation", () => {
  it("resolves and prefixes locale routes without losing hashes", () => {
    expect(resolveLocale("/ar/project/image-classification")).toBe("ar");
    expect(resolveLocale("/project/image-classification")).toBe("en");
    expect(withLocale("/project/image-classification", "ar")).toBe("/ar/project/image-classification");
    expect(withLocale("/ar/project/image-classification", "en")).toBe("/en/project/image-classification");
    expect(withLocaleHash("#contact", "ar")).toBe("/ar#contact");
  });

  it("sets RTL state and restores English LTR when switching locales", async () => {
    render(<MemoryRouter initialEntries={["/ar"]}><LocaleProvider><LocaleProbe /></LocaleProvider></MemoryRouter>);
    await waitFor(() => expect(document.documentElement).toHaveAttribute("lang", "ar"));
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    expect(screen.getByTestId("locale")).toHaveTextContent("ar");
    expect(screen.getByTestId("heading")).toHaveTextContent("منتجات ويب");

    fireEvent.click(screen.getByRole("button", { name: "English" }));
    await waitFor(() => expect(screen.getByTestId("locale")).toHaveTextContent("en"));
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    expect(screen.getByTestId("path")).toHaveTextContent("/en");
  });

  it("renders Arabic case-study content through the shared route and data model", async () => {
    const project = getLocalizedProject(projectsData[0], "ar");
    render(<MemoryRouter initialEntries={["/ar/project/image-classification"]}><LocaleProvider><Routes><Route path="/ar/project/:id" element={<ProjectCaseStudy />} /></Routes></LocaleProvider></MemoryRouter>);
    await waitFor(() => expect(document.documentElement).toHaveAttribute("dir", "rtl"));
    expect(screen.getByText(project.caseStudy.overview)).toBeInTheDocument();
    expect(screen.getByText(project.caseStudy.problem)).toBeInTheDocument();
    expect(screen.getByText(project.caseStudy.solution)).toBeInTheDocument();
  });

  it("exposes translated navigation labels under Arabic locale", async () => {
    render(<MemoryRouter initialEntries={["/ar"]}><LocaleProvider><Nav /></LocaleProvider></MemoryRouter>);
    await waitFor(() => expect(document.documentElement).toHaveAttribute("dir", "rtl"));
    expect(screen.getByRole("navigation", { name: "التنقل الرئيسي" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "نبذة" })).toHaveAttribute("href", "/ar#about");
    expect(screen.getByRole("button", { name: /اللغة: English/ })).toBeInTheDocument();
  });
});
