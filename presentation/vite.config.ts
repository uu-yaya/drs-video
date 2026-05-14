import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the site at https://<user>.github.io/drs-video/ — the
// "base" must match so that built asset URLs (and the audio file paths we
// construct via import.meta.env.BASE_URL) resolve correctly. Override with
// VITE_BASE=/ for non-Pages deployments (root domain / Vercel / etc).
const BASE = process.env.VITE_BASE ?? "/drs-video/";

export default defineConfig({
  base: BASE,
  plugins: [react()],
  server: {
    port: 5174,
    fs: { allow: [".."] },
  },
});
