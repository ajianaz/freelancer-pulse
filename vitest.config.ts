import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      $lib: resolve("./src/lib"),
      $popup: resolve("./src/popup"),
      $background: resolve("./src/background"),
      $content: resolve("./src/content"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,js}"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/background/**", "src/content/**"],
      exclude: ["src/__tests__/**"],
    },
  },
});
