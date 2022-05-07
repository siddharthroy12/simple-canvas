// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')
import dts from 'vite-plugin-dts';

module.exports = defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'simpleCanvas',
      fileName: (format) => `simpleCanvas.${format}.js`
    }
  }
})
