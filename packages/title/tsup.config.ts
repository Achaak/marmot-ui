import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    minify: !options.watch,
    entry: ['src'],
    splitting: true,
    sourcemap: true,
    clean: true,
    dts: true,
    external: ['react', 'react-dom'],
    format: ['cjs', 'esm'],
    target: 'esnext',
    platform: 'browser',
    bundle: false,
  }
})
