import { merge } from 'ts-deepmerge'

const base = (configuration: object) =>
  merge(
    {
      $schema: 'node_modules/@biomejs/biome/configuration_schema.json',
      linter: {
        enabled: true,
        rules: {
          recommended: true,
          // a11y All enabled in recommended.
          complexity: {
            noExcessiveCognitiveComplexity: {
              level: 'warn',
              options: {
                maxAllowedComplexity: 20,
              },
            },
            noExcessiveNestedTestSuites: 'error',
            noForEach: 'error',
            noUselessStringConcat: 'error',
            noVoid: 'error',
            useSimplifiedLogicExpression: 'error',
            useWhile: 'error',
          },
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
          nursery: {
            noNestedComponentDefinitions: 'error', // React domain optional.
            useUniqueElementIds: 'off', // React domain optional.
            noAwaitInLoop: 'off', // More of a performance rule.
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
            noProcessGlobal: 'off', // Importing from Node will not work in client.
            noReactPropAssign: 'error',
            noSecrets: 'off', // Not reliable at all yet.
            noShadow: 'error',
            noTsIgnore: 'off',
            noUnassignedVariables: 'error',
            noUnresolvedImports: 'off', // Doesn't support node dependencies yet, TypeScript does the same checks.
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
          performance: {
            noBarrelFile: 'off', // Difficult choice.
            noDelete: 'error',
            noNamespaceImport: 'off', // Makes some patterns much easier.
            noReExportAll: 'off',
            useTopLevelRegex: 'error',
            noDynamicNamespaceImportAccess: 'info',
          },
          // security All enabled in recommended.
          style: {
            noCommonJs: 'error', // No brainer at this point.
            noDefaultExport: 'off', // Decice on project-to-project basis.
            noDoneCallback: 'error',
            noEnum: 'off', // Debateable.
            noExportedImports: 'error',
            noImplicitBoolean: 'off',
            noInferrableTypes: 'error',
            noNamespace: 'error',
            noNegationElse: 'error',
            noNestedTernary: 'error',
            noNonNullAssertion: 'warn',
            noParameterAssign: 'error', // TODO continue here.
            noParameterProperties: 'warn',
            noProcessEnv: 'off',
            noRestrictedGlobals: 'off',
            noShoutyConstants: 'error',
            noSubstr: 'error',
            noUnusedTemplateLiteral: 'error',
            noUselessElse: 'error',
            noYodaExpression: 'error',
            useAsConstAssertion: 'error',
            useAtIndex: 'error',
            useBlockStatements: 'error',
            useCollapsedElseIf: 'error',
            useCollapsedIf: 'error',
            useComponentExportOnlyModules: 'warn',
            useConsistentArrayType: 'error',
            useConsistentBuiltinInstantiation: 'error',
            useConsistentCurlyBraces: 'error',
            useConsistentMemberAccessibility: 'error',
            useDefaultParameterLast: 'error',
            useDefaultSwitchClause: 'warn',
            useEnumInitializers: 'error',
            useExplicitLengthCheck: 'error',
            useFilenamingConvention: 'error', // ???
            useForOf: 'error',
            useFragmentSyntax: 'error',
            useNamingConvention: 'info',
            useNumberNamespace: 'error',
            useSelfClosingElements: 'error',
            useShorthandAssign: 'error',
            useSingleVarDeclarator: 'off',
            useThrowNewError: 'error',
            useThrowOnlyError: 'error',
            useTrimStartEnd: 'error',
          },
          suspicious: {
            noAlert: 'error',
            noConsole: {
              level: 'error',
              fix: 'none', // Avoid removing on CMD + S in editor through quickfix.biome.
            },
            noDuplicateTestHooks: 'error',
            noEmptyBlockStatements: 'error',
            noEvolvingTypes: 'error',
            noExportsInTest: 'error',
            noFocusedTests: 'error', // Should not be committed.
            noMisplacedAssertion: 'error',
            noSkippedTests: 'warn', // Warning is enough.
            noVar: 'error',
            useAwait: 'error',
            useErrorMessage: 'error',
            useGuardForIn: 'warn',
            useNumberToFixedDigitsArgument: 'error',
            useStrictMode: 'off',
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
        includes: ['**/*', '!dist'],
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
      rules: {
        correctness: {
          useJsxKeyInIterable: 'off',
          noUndeclaredDependencies: 'off', // Absolute imports used.
          noNodejsModules: 'error',
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
        nursery: {
          noProcessGlobal: 'warn', // Possibly error in the future.
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
        nursery: {
          noProcessGlobal: 'warn', // Possibly error in the future.
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
