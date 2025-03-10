import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './', // Указываем базовый URL
  build: {
    outDir: 'dist', // Папка для сборки
    assetsDir: 'assets', // Папка для ресурсов
  },
});