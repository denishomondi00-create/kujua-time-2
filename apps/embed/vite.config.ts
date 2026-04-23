import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
)

export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin({
      styleId: 'kujua-time-embed-styles',
    }),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
  ],

  define: {
    __KUJUA_EMBED_VERSION__: JSON.stringify(pkg.version),
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/widget-loader.ts'),
      name: 'KujuaTime',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'umd') return 'embed.umd.cjs'
        return 'embed.js'
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        passes: 2,
      },
      format: {
        comments: false,
      },
    },
    sourcemap: true,
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
  },

  server: {
    port: 3100,
    open: '/test.html',
  },
})