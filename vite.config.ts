import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ include: "**/*.svg?react" }),
    checker({
      typescript: { buildMode: true },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
      overlay: {
        initialIsOpen: false,
        badgeStyle: "opacity: 0.5",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: "./",
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
