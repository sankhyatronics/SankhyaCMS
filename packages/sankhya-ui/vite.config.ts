import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      name: "react-jp-ui",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"], //Specifies the formats for the library build.
    },
    rollupOptions: {
      // Match subpaths too (react/jsx-runtime, react-dom/client); otherwise Rolldown bundles them as CJS.
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/, /^react-router(\/.*)?$/],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-router": "ReactRouter",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(),
  libInjectCss(),
  dts({
    insertTypesEntry: true,
    exclude: ['**/*.test.ts', '**/*.test.tsx'],
    outDir: "dist",
  })],
});