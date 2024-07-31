import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import { codeInspectorPlugin } from 'code-inspector-plugin';
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/index.html'
    }
  },
  css: {
    postcss: {
      plugins: [
        // codeInspectorPlugin({
        //   bundler: 'vite',
        // }),
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        })
      ]
    }
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: resolve(__dirname, 'src')
    }]
  },
  plugins: [ codeInspectorPlugin({
    bundler: 'vite',
  }),vue(), WindiCSS()],
})
