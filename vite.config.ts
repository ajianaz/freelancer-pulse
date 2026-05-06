import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  resolve: {
    alias: {
      $lib: resolve("./src/lib"),
      $popup: resolve("./src/popup"),
      $background: resolve("./src/background"),
      $content: resolve("./src/content"),
      $tests: resolve("./src/__tests__"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
      },
    },
  },
});
