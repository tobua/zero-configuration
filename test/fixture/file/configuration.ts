import { devices } from '@playwright/test'

export const prettier = 'recommended'

export const playwright = {
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'bun start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
}
