// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercelStatic from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://stay-liard.vercel.app",
  integrations: [mdx(), sitemap(), react()],
  output: "server",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: false,
    },
    maxDuration: 8,
  }),
  vite: {
    plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      external: [
        /^@prisma\/client\/runtime\/.*/,
      ],
    },
  },
  },
});
