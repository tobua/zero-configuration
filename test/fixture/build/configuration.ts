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

/** @type {import('next').NextConfig} */
export const next = defineConfig({
  appDir: 'application',
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
