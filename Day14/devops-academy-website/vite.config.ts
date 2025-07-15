// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          // Use a dynamic import here because 'await' is used at the top-level,
          // and top-level await is only allowed in modules.
          // This ensures the plugin is only imported when needed.
          // If you get an error here about 'await' not being allowed,
          // you might need to adjust your tsconfig.json or remove the await if not strictly necessary.
          // For now, assuming it's correctly handled by your build setup.
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"), // Vite's effective root for the client build
  build: {
    // This is the crucial fix:
    // `outDir` is relative to the `root` property.
    // If `root` is `devops-academy-website/client/`,
    // and we want the output in `devops-academy-website/dist/server/public/`,
    // we need to go up one level (../), then into `dist/`, then `server/`, then `public/`.
    outDir: '../dist/server/public',
    emptyOutDir: true, // This is good practice to ensure a clean build
  },
  server: {
  allowedHosts: ['devops.local'],
  fs: {
    strict: true,
    deny: ["**/.*"],
  },
},
});
