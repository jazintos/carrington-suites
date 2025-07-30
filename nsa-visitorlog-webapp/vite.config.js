import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': 'http://localhost:5000',
     // '/admin': 'http://localhost:5000',
     // '/nsa': 'http://localhost:5000',
    //  '/security': 'http://localhost:5000',
    //  '/dashboard': 'http://localhost:5000',
    '/visitors': 'http://localhost:5000',
    '/login': 'http://localhost:5000',
    },
  },
});
