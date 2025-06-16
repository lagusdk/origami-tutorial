import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "three/examples/jsm/loaders/MTLLoader",
      "three/examples/jsm/loaders/OBJLoader",
      "three/examples/jsm/loaders/FBXLoader",
    ],
  },
});
