/// <reference types="vite-plugin-svgr/client" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    target: "esnext",
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
      },
    }),
    nodePolyfills(),
    tsconfigPaths(),
    TanStackRouterVite(),
    Unfonts({
      google: {
        families: [
          {
            name: "Jersey+25",
            defer: true,
          },
          {
            name: "Inter",
            styles: "ital,opsz,wght@0,14..32,100..900",
            defer: true,
          },
        ],
      },
    }),
  ],
  envDir: "env",
  server: {
    proxy: {
      "/api": {
        target: "https://tax-farm-be-dev.nysm.work/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    },
  },
});
