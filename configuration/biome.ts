export const templates = {
  recommended: {
    $schema: 'node_modules/@biomejs/biome/configuration_schema.json',
    organizeImports: {
      enabled: true,
    },
    linter: {
      enabled: true,
      rules: {
        all: true,
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
      ignore: ['test/fixture', 'node_modules', 'package.json'],
    },
    formatter: {
      lineWidth: 140,
    },
  },
}

export function createFile(configuration: object) {
  return { name: 'biome.json', contents: JSON.stringify(configuration, null, 2) }
}
