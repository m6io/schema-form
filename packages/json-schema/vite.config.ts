import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@react-formgen/json-schema",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "ajv", "ajv-formats", "json-schema"],
      output: {
        globals: {
          react: "React",
          ajv: "Ajv",
          "ajv-formats": "AjvFormats",
          "json-schema": "JsonSchema",
        },
      },
    },
    minify: true,
  },
  plugins: [
    react(),
    visualizer({
      filename: "stats.html",
      open: false, // true to open stats page on build
    }),
  ],
});
