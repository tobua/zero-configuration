import type { Config } from 'drizzle-kit'

export const gitignore = ['extends:bundle', 'test-results']
export const vscode = 'biome'
export const biome = {
  extends: 'server',
  files: {
    ignore: ['drizzle.config.ts'],
  },
  linter: {
    rules: {
      correctness: {
        useImportExtensions: 'off',
      },
      suspicious: {
        noConsole: 'off',
      },
    },
  },
}

export const typescript = [
  {
    extends: 'server',
    include: ['index.ts'],
  },
]

export const drizzle = {
  dialect: 'postgresql',
  schema: './schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config
