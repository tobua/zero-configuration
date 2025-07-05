import { merge } from 'ts-deepmerge'

const base = (configuration: object) =>
  merge(
    {
      $schema: 'node_modules/@biomejs/biome/configuration_schema.json',
      linter: {
        enabled: true,
        domains: {
          project: 'all',
        },
        rules: {
          recommended: true,
          correctness: {
            useImportExtensions: 'off', // Always handled by bundler or runtime.
            noUndeclaredVariables: 'error',
            noPrivateImports: 'error',
            noUndeclaredDependencies: 'error',
            noRenderReturnValue: 'error', // React domain recommended.
            useJsxKeyInIterable: 'error', // React domain recommended.
            useHookAtTopLevel: 'error', // React domain recommended.
            useExhaustiveDependencies: 'error', // React domain recommended.
          },
          style: {
            noParameterAssign: 'error',
            useNamingConvention: 'info',
            noDefaultExport: 'warn',
          },
          nursery: {
            noNestedComponentDefinitions: 'error', // React domain optional.
            useUniqueElementIds: 'off', // React domain optional.
            noAwaitInLoop: 'info',
            noBitwiseOperators: 'off',
            noConstantBinaryExpression: 'error',
            noExcessiveLinesPerFunction: 'off', // No need to limit LOC per function.
            noFloatingPromises: 'warn',
            noGlobalDirnameFilename: 'error', // Usage outdated.
            noImplicitCoercion: 'error',
            noImportCycles: 'warn', // Application usually still works fine.
            // BETA noMagicNumbers: 'warn',
            // BETA noMisusedPromises: 'error',
            noNoninteractiveElementInteractions: 'error',
            noProcessGlobal: 'warn', // Possibly error in the future.
            noReactPropAssign: 'error',
            noSecrets: 'error',
            noShadow: 'error',
            noTsIgnore: 'off',
            noUnassignedVariables: 'error',
            noUnresolvedImports: 'error',
            noUselessBackrefInRegex: 'warn',
            noUselessEscapeInString: 'error',
            noUselessUndefined: 'error',
            useAdjacentGetterSetter: 'warn',
            useConsistentObjectDefinition: 'error',
            useConsistentResponse: 'error',
            useExhaustiveSwitchCases: 'warn',
            useExplicitType: 'off', // Might be useful for plugins to avoid costly inference.
            useExportsLast: 'off', // Fine to place exports first.
            useGoogleFontPreconnect: 'error',
            useIndexOf: 'error',
            useIterableCallbackReturn: 'error',
            useJsonImportAttribute: 'off', // Bundler specific, not standardized yet.
            useNumericSeparators: 'off', // Never do this.
            useObjectSpread: 'error',
            useParseIntRadix: 'error',
            useReadonlyClassProperties: 'error',
            useSingleJsDocAsterisk: 'error',
            useSortedClasses: 'off', // Makes no sense to sort classes.
            useSymbolDescription: 'error',
            useUnifiedTypeSignature: 'error',
          },
          suspicious: {
            noConsole: {
              level: 'error',
              fix: 'none', // Avoid removing on CMD + S in editor through quickfix.biome.
            },
            noDuplicateObjectKeys: 'error',
          },
          complexity: {
            noExcessiveCognitiveComplexity: {
              level: 'warn',
              options: {
                maxAllowedComplexity: 20,
              },
            },
            noForEach: 'error',
            noUselessStringConcat: 'error',
            noVoid: 'error',
            useSimplifiedLogicExpression: 'error',
            useWhile: 'error',
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
          noUndeclaredDependencies: 'off', // Absolute imports used.
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
          noExcessiveCognitiveComplexity: {
            level: 'warn',
            options: {
              maxAllowedComplexity: 10,
            },
          },
        },
      },
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
