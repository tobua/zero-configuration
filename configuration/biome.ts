import { merge } from 'ts-deepmerge'

const base = (configuration: object) =>
  merge(
    {
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
        // Bundled dist files will make Biome hang forever.
        ignore: ['node_modules', 'dist', 'package.json'],
      },
      formatter: {
        lineWidth: 140,
        formatWithErrors: true,
      },
    },
    configuration,
  )

export const templates = {
  recommended: base({}),
  ninja: base({
    linter: {
      rules: {
        style: {
          useNamingConvention: 'off',
          useBlockStatements: 'off',
          noImplicitBoolean: 'off',
        },
        correctness: {
          noNodejsModules: 'off',
        },
        complexity: {
          noForEach: 'off',
        },
      },
    },
    options: {
      maxAllowedComplexity: 10, // Default is 15.
    },
  }),
  test: base({
    linter: {
      rules: {
        style: {
          useNamingConvention: 'off',
          useBlockStatements: 'off',
          noImplicitBoolean: 'off',
          noDefaultExport: 'off',
          noNamespace: 'off',
          noParameterAssign: 'off',
        },
        correctness: {
          noNodejsModules: 'off',
          noUndeclaredVariables: 'off',
          noUnusedVariables: 'off',
        },
        suspicious: {
          noConsoleLog: 'off',
          noExplicitAny: 'off',
          noSkippedTests: 'off',
          noEmptyBlockStatements: 'off',
          noArrayIndexKey: 'off',
        },
        complexity: {
          noForEach: 'off',
          noBannedTypes: 'off',
        },
        performance: {
          noDelete: 'off',
        },
      },
    },
  }),
  server: base({
    linter: {
      rules: {
        style: {
          noNamespaceImport: 'off',
        },
        suspicious: {
          noConsoleLog: 'off',
        },
        correctness: {
          noNodejsModules: 'off',
        },
      },
    },
  }),
}

export function createFile(configuration: object) {
  return { name: 'biome.json', contents: JSON.stringify(configuration, null, 2) }
}
