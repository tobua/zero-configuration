// NOTE imports will fail in fixture.
const defineConfig = (configuration: unknown) => configuration

/** @type {import('vite').UserConfig} */
export const vite = defineConfig({
  publicDir: 'files',
})

// import { defineConfig } from '@rsbuild/core'
export const rsbuild = defineConfig({
  extends: 'web',
  source: {
    entry: 'index.ts',
  },
  output: {
    legalComments: 'linked',
  },
})

export const farm = {
  server: {
    hmr: false,
  },
  compilation: {
    lazyCompilation: false,
    persistentCache: false,
    minify: false,
    treeShake: false
  },
}

/** @type {import('next').NextConfig} */
export const next = defineConfig({
  appDir: 'application',
  serializable: () => false,
})

export const playwright = defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  projects: [
    {
      name: 'chromium',
    },
  ],
  webServer: {
    command: 'bun start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})

/** @type {import('tailwindcss').Config} */
export const tailwind = {
  // Globs which include node_modules will lead to poor performance here.
  content: ['./*.tsx', './markup/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
}
