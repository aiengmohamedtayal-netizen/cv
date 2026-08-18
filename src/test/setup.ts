import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

class IntersectionObserverMock {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
vi.stubGlobal("scrollTo", vi.fn());
vi.stubGlobal("matchMedia", (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));
