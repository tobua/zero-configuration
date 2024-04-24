// NOTE imports will fail in fixture.

/** @type {import('vite').UserConfig} */
export const vite = {
  publicDir: 'files',
}

// import { defineConfig } from '@rsbuild/core'
export const rsbuild = {
  source: {
    entry: 'index.ts',
  },
}

/** @type {import('next').NextConfig} */
export const next = {
  appDir: 'application',
}

export const playwright = {
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
}
