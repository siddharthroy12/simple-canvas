// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')
import dts from 'vite-plugin-dts';

module.exports = defineConfig({
  plugins: [
    dts(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'simpleCanvas2d',
      fileName: (format) => `index.${format}.js`
    }
  }
})
