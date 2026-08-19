import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /* The Mailbird host sends no Access-Control-Allow-Origin, so a direct
     browser call from localhost is blocked. Proxying through the dev
     server makes it same-origin for local testing. Set
     VITE_MAILBIRD_URL=/mailbird in .env to route through this.
     Production does not use it - see .env.example. */
  server: {
    /* Vite does not read PORT on its own. Honouring it lets the dev server
       move off 5173 when that port is already taken, without needing a
       --port flag on the command. Falls back to Vite's default. */
    port: Number(process.env.PORT) || undefined,
    proxy: {
      '/mailbird': {
        target: 'https://mailbird.techbird.in',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/mailbird/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom')) return 'vendor';
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-router')) return 'vendor';
          if (id.includes('node_modules/gsap')) return 'gsap';
          if (id.includes('node_modules/three')) return 'three';
        },
      },
    },
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
  },
})
