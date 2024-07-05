const base = (rules: object) => ({
  $schema: 'node_modules/@biomejs/biome/configuration_schema.json',
  organizeImports: {
    enabled: true,
  },
  linter: {
    enabled: true,
    rules: {
      all: true,
      ...rules,
    },
  },
  javascript: {
    formatter: {
      semicolons: 'asNeeded',
      quoteStyle: 'single',
      indentStyle: 'space',
    },
  },
  files: {
    // Bundled dist files will make Biome hang forever.
    ignore: ['node_modules', 'dist', 'package.json'],
  },
  formatter: {
    lineWidth: 140,
    formatWithErrors: true,
  },
})

export const templates = {
  recommended: base({}),
  ninja: base({
    style: {
      useNamingConvention: 'off',
      useBlockStatements: 'off',
      noImplicitBoolean: 'off',
    },
  }),
}

export function createFile(configuration: object) {
  return { name: 'biome.json', contents: JSON.stringify(configuration, null, 2) }
}
