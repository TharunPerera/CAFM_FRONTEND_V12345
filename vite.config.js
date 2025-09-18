// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     global: "window", // Polyfill global to window
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
  plugins: [
    react(),
    removeConsole(), // 🚀 Automatically removes console logs in production
  ],
  define: {
    global: "window",
  },
});
