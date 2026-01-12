import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-jp-ui",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"], //Specifies the formats for the library build.
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-router"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-router": "ReactRouter",
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
    outDir: "dist",
  })],
});