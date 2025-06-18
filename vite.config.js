import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base: "./", // ✅ This is important
  plugins: [tailwindcss()],
  build: {
    outDir: "docs", // 👈 Output goes here
  },

  define: {
    "process.env": {},
    global: "window",
  },
  optimizeDeps: {
    include: ["buffer"],
  },
});
