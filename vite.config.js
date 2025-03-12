import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: '/src/index.html',
        router: '/src/router/router.ts', // Убедись, что указал правильный путь к ts файлу
      },
    },
  },
});
