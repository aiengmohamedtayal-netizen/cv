import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { Certificates } from "@/components/Certificates";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { projectsData } from "@/data/projects";
import { ProjectCaseStudy } from "@/pages/ProjectCaseStudy";
import { LocaleProvider } from "@/i18n/LocaleProvider";

vi.mock("@splinetool/react-spline", () => ({
  default: ({ className }: { className?: string }) => (
    <canvas data-testid="spline-canvas" className={className} />
  ),
}));

describe("project case-study remediation", () => {
  it("renders the authored overview while preserving the problem and solution", () => {
    const project = projectsData[0];

    render(
      <MemoryRouter initialEntries={[`/project/${project.id}`]}>
        <LocaleProvider>
          <Routes>
            <Route path="/project/:id" element={<ProjectCaseStudy />} />
          </Routes>
        </LocaleProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(project.caseStudy.overview)).toBeInTheDocument();
    expect(screen.getByText(project.caseStudy.problem)).toBeInTheDocument();
    expect(screen.getByText(project.caseStudy.solution)).toBeInTheDocument();
  });
});

describe("certificate preview remediation", () => {
  it("opens an accessible dialog, closes on Escape, and restores focus", async () => {
    render(
      <MemoryRouter>
        <LocaleProvider>
          <Certificates />
        </LocaleProvider>
      </MemoryRouter>,
    );

    const previewTrigger = screen.getByRole("button", { name: /Preview.*Vibe Coding/i });
    previewTrigger.focus();
    fireEvent.click(previewTrigger);

    const dialog = await screen.findByRole("dialog", { name: /Vibe Coding/i });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveFocus();
    expect(screen.getByRole("button", { name: "Close certificate preview" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(previewTrigger).toHaveFocus();
  });
});

describe("Spline overlay remediation", () => {
  it("keeps the decorative overlay out of the accessibility tree and pointer hit testing", async () => {
    const { container } = render(
      <InteractiveRobotSpline scene="https://example.com/scene.splinecode" />,
    );

    await waitFor(() => expect(screen.getByTestId("spline-canvas")).toBeInTheDocument());

    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).not.toBeNull();
    expect(overlay).toHaveClass("pointer-events-none");
    expect(overlay).not.toHaveClass("pointer-events-auto");
  });
});
