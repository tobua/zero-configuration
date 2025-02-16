// NOTE imports will fail in fixture.

export const prettier = { extends: 'recommended', ignore: ['test'] }

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

export const biome = {
  extends: 'recommended',
  linter: {
    ignore: ['public'],
  },
  formatter: {
    ignore: ['public'],
  },
}

export const cypress = {
  e2e: {
    baseUrl: 'http://localhost:1234',
    dynamic: () => console.log("I'm not serializable."),
  },
}

export const vitest = {
  test: {
    globals: true,
  },
}

export const eslint = true

export const reactNative = {
  name: "break'a'bit",
  displayName: "break'a'bit",
}

export const drizzle = {
  dialect: 'postgresql',
}

export const license = {
  extends: 'MIT',
  authors: [{ name: 'Matthias' }, { name: "Who's this?", year: 2018 }],
}
