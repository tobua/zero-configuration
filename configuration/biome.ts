import { merge } from 'ts-deepmerge'

const base = (configuration: object) =>
  merge(
    {
      $schema: 'node_modules/@biomejs/biome/configuration_schema.json',
      linter: {
        enabled: true,
        domains: {
          react: 'all',
          project: 'all',
        },
        rules: {
          recommended: true,
          correctness: {
            useImportExtensions: 'off', // Always handled by bundler or runtime.
          },
          style: {
            noParameterAssign: 'error',
            useNamingConvention: 'info',
          },
          nursery: {
            noImportCycles: 'off',
          },
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
        includes: ['!node_modules/**', '!dist/**', '!package.json'],
      },
      formatter: {
        lineWidth: 140,
        formatWithErrors: true,
      },
      overrides: [
        {
          includes: ['**/package.json'],
          json: {
            formatter: {
              trailingCommas: 'none',
              indentStyle: 'space',
              indentWidth: 2,
            },
          },
        },
      ],
    },
    configuration,
  )

export const templates = {
  recommended: base({}),
  epic: base({
    linter: {
      domains: {
        react: 'all',
      },
      rules: {
        correctness: {
          useJsxKeyInIterable: 'off',
        },
      },
    },
  }),
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
      domains: {
        test: 'all',
      },
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
          noConsole: 'off',
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
          useTopLevelRegex: 'off', // Often used in playwright tests.
          noNamespaceImport: 'off',
        },
        a11y: {
          noSvgWithoutTitle: 'off',
          useButtonType: 'off',
        },
      },
    },
  }),
  server: base({
    linter: {
      rules: {
        performance: {
          noNamespaceImport: 'off',
        },
        suspicious: {
          noConsole: 'off',
        },
        correctness: {
          noNodejsModules: 'off',
        },
      },
    },
  }),
}

export function createFile(configuration: object) {
  return {
    name: 'biome.json',
    contents: JSON.stringify(configuration, null, 2),
  }
}
