import { merge } from 'ts-deepmerge'

const base = (configuration: object) =>
  merge(
    {
      $schema: 'node_modules/@biomejs/biome/configuration_schema.json',
      linter: {
        enabled: true,
        rules: {
          recommended: true,
          a11y: {
            noNoninteractiveElementInteractions: 'error',
          },
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
            noExcessiveLinesPerFunction: 'off', // No need to limit LOC per function.
            noImplicitCoercions: 'error',
            useIndexOf: 'error',
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
            noNestedComponentDefinitions: 'error', // React domain optional.
            useUniqueElementIds: 'off', // React domain optional.
            noGlobalDirnameFilename: 'error', // Usage outdated.
            noProcessGlobal: 'off', // Importing from Node will not work in client.
            noReactPropAssignments: 'error',
            useJsonImportAttributes: 'off', // Bundler specific, not standardized yet.
            useParseIntRadix: 'error',
            useSingleJsDocAsterisk: 'error',
          },
          nursery: {
            noFloatingPromises: 'warn',
            noImportCycles: 'warn', // Application usually still works fine.
            noMisusedPromises: 'error',
            noSecrets: 'off', // Not reliable at all yet.
            noShadow: 'error',
            noUnresolvedImports: 'off', // Doesn't support node dependencies yet, TypeScript does the same checks.
            noUselessUndefined: 'error',
            useExhaustiveSwitchCases: 'warn',
            useExplicitType: 'off', // Might be useful for plugins to avoid costly inference.
            useSortedClasses: 'off', // Makes no sense to sort classes.
          },
          performance: {
            noBarrelFile: 'off', // Difficult choice.
            noDelete: 'error',
            noNamespaceImport: 'off', // Makes some patterns much easier.
            noReExportAll: 'off',
            useTopLevelRegex: 'error',
            noDynamicNamespaceImportAccess: 'info',
            noAwaitInLoops: 'off',
            useGoogleFontPreconnect: 'error',
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
            useGroupedAccessorPairs: 'warn',
            useConsistentObjectDefinitions: 'error',
            useExportsLast: 'off', // Fine to place exports first.
            useNumericSeparators: 'off', // Never do this.
            useObjectSpread: 'error',
            useReadonlyClassProperties: 'error',
            useSymbolDescription: 'error',
            useUnifiedTypeSignatures: 'error',
            noMagicNumbers: 'warn',
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
            noBitwiseOperators: 'off',
            noConstantBinaryExpressions: 'error',
            noTsIgnore: 'off',
            noUnassignedVariables: 'error',
            noUselessRegexBackrefs: 'warn',
            noUselessEscapeInString: 'error',
            useStaticResponseMethods: 'error',
            useIterableCallbackReturn: 'error',
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
          noProcessGlobal: 'warn', // Possibly error in the future.
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
          noDynamicNamespaceImportAccess: 'off',
        },
        suspicious: {
          noConsole: 'off',
        },
        correctness: {
          noNodejsModules: 'off',
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
