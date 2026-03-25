import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx)$/,
    }),
    tailwindcss(),
    cloudflare(),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
      data: path.resolve(__dirname, "data"),
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
  },
});
