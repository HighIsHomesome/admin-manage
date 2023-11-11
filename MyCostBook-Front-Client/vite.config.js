import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Gzip
import viteCompression from 'vite-plugin-compression'
// Vant
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    viteCompression({
      threshold: 1024000 // 对大于 1mb 的文件进行压缩 需要更改大小可以自己进行换算
    }),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  /**
   * 网络
   */
  server: {
    // 代理
    proxy: {
      // '/rabbit': {
      //   target: 'http://127.0.0.1:7001/api',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/rabbit/, '')
      // },
      '/rabbit': {
        target: 'http://localhost:8081/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rabbit/, '')
      },
      '/ws': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, '')
      },
      '/picture': {
        target: 'https://s2.loli.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/picture/, '')
      }
    }
  }
})
