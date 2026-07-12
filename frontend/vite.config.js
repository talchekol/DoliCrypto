import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  port: 5173, // Set the port for your app
  // base: "/DoliCrypto/", // Set the base path for your app
});
