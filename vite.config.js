import { defineConfig } from 'vite';

export default defineConfig({
  base: 'https://guessver.tech', // if deploying to a subdirectory
  // OR use your custom domain if deploying to the root
  // base: 'https://yourcustomdomain.com/',

  build: {
    outDir: 'dist', // default, but you can change if needed
  },
  // other configurations...
});