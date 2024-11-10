import { defineConfig } from 'vite';

export default defineConfig({
  // Set to '/' when deploying to the root of a custom domain
  base: '/',  // This is correct for a custom domain like guessver.tech

  build: {
    outDir: 'dist', // output directory for production build
  },
  // other configurations...
});