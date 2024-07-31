import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  //for development server i guess other iption are creating problems 
        //other options of fallback will be written after mvp .

      },
    },
  },
  plugins: [react()],
});