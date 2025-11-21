import { defineConfig, mergeConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig as defineVitestConfig } from "vitest/config";

const viteConfig = defineConfig({
  plugins: [tailwindcss()],
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});

export default mergeConfig(viteConfig, vitestConfig);
