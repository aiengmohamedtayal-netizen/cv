import { Component, type ReactNode, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { LocaleProvider, useLocale } from "./i18n/LocaleProvider";

const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy.tsx"));
const RobotDemo = lazy(() => import("./components/ui/demo.tsx").then((m) => ({ default: m.Section })));

class ErrorBoundary extends Component<
  { children: ReactNode; title: string; description: string; refresh: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <div className="max-w-md px-6 text-center">
            <h1 className="mb-4 font-display text-4xl font-bold">{this.props.title}</h1>
            <p className="mb-6 text-muted-foreground">{this.props.description}</p>
            <button onClick={() => window.location.reload()} className="btn-magnetic">
              {this.props.refresh}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = ({ label }: { label: string }) => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  </div>
);

const AppRoutes = () => {
  const { t } = useLocale();

  return (
    <ErrorBoundary title={t.common.errorTitle} description={t.common.errorDescription} refresh={t.common.refresh}>
      <Suspense fallback={<LoadingFallback label={t.common.loading} />}>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/en" element={<Index />} />
          <Route path="/ar" element={<Index />} />
          <Route path="/en/demo" element={<RobotDemo />} />
          <Route path="/ar/demo" element={<RobotDemo />} />
          <Route path="/demo" element={<Navigate to="/en/demo" replace />} />
          <Route path="/en/project/:id" element={<ProjectCaseStudy />} />
          <Route path="/ar/project/:id" element={<ProjectCaseStudy />} />
          <Route path="/project/:id" element={<ProjectCaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <LocaleProvider>
      <TooltipProvider>
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </LocaleProvider>
  </BrowserRouter>
);

export default App;
