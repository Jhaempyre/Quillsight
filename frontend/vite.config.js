import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://quillsight-z192.onrender.com',  //for development server i guess other iption are creating problems 
        //other options of fallback will be written after mvp .

      },
    },
  },
  plugins: [react()],
});