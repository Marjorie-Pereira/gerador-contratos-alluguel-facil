import { vi } from "vitest";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
// Mock global para o App Router do Next.js
vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => "",
    useSearchParams: () => new URLSearchParams(),
  };
});
