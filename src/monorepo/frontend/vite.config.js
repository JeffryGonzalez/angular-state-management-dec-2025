import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // https: true,
    port: 4200,
    strictPort: true, // exit if port is in use
    hmr: {
      clientPort: 4200, // point vite websocket connection to vite directly, circumventing .net proxy
    },
  },
  optimizeDeps: {
    force: true,
  },
});
