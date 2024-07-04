# zero-configuration

<img align="right" src="https://github.com/tobua/zero-configuration/raw/main/logo.png" width="20%" alt="zero-configuration Logo" />

Many web development projects often contain numerous configuration files in the project's root directory, with little to no actual source code. While many plugins nowadays require configuration files, this plugin aims to generate them without the necessity of committing anything to the source code.

- No configuration files in your source code.
- Support for **gitignore**, **TypeScript**, **ESLint**, **Prettier**, **Biome**, **VS Code**, **Playwright**, **Cypress**, **Tailwind**, **PostCSS**, **babel**, **Metro**, **Vercel** and **Vitest**.
- Quickly configure bundlers like **Vite** and **Rsbuild**.
- Generate boilerplate before publishing: **LICENSE.md**.
- JSON based configuration in `package.json`.
- Optional typed programmatic interface in `configuration.ts`.
- Recommended configurations to easily extend.
- Add your own shared configurations.

## Templates

The easiest way to get started is through a template. The following templates will be installed using [create-now](https://github.com/tobua/create-now) and are taken from the [`/template`](https://github.com/tobua/zero-configuration/tree/main/template) directory in this repository. The first argument specifies the destination directory and the second the template to pick.

```sh
bun create now zero-configuration # Default template (React app built and served with Bun)
bun create now zero-configuration . web # Fully featured React application using Rsbuild
bun create now zero-configuration . plugin-bun # TypeScript plugin
bun create now zero-configuration . plugin-react # Plugin with JSX
bun create now zero-configuration . desktop # Electron desktop application.
bun create now zero-configuration . mobile # React Native mobile application for Android and iOS.
```

## Integration and Usage

Add the plugin to an existing project using `bun install zero-configuration`. In your `package.json` list the configurations you would like to have added.

```json
{
    "name": "my-web-application",
    "configuration": {
        "biome": "recommended"
    }
}
```

Run `bunx zero-configuration` to create the necessary configuration files in your project. The files themselves will automatically be added to the `.gitignore` file, so there is never a need to edit or commit the whole configuration files with all the boilerplate in them. To automatically add the configurations during installation add the plugin as a `trustedDependency`.

```json
{
    "name": "my-web-application",
    "trustedDependencies": ["zero-configuration"]
}
```

When using the automatic Vercel build cache postinstall will only be called if the dependency has updated. To ensure your project is ready after installation use `bun install && bunx zero-configuration` as the **Install Command**.

## Configuration

In general there are four ways to add a configuration for any supported tool. The first is to simply enable the default configuration by setting it to `true`. The second is to use one of the suggested configurations included with this plugin. The third is to extend a shared configuration from your dependencies. The fourth, which can be combined with the first two, is to add write your own configuration specific to this project.

```ts
// configuration.ts
export const eslint = true
export const prettier = 'recommended'
export const biome = '@my-company/shared-configurations/biome'
export const typescript = {
    compilerOptions: {
        lib: ['ES2020', 'DOM']
    }
}
// Generate multiple files.
export const tsconfig = [
    {
        extends: 'recommended'
    },
    {
        extends: 'web',
        folder: 'test/demo', // <= Specify folder!
        compilerOptions: { skipLibCheck: false }
    },
    {
        extends: 'react-native',
        folder: 'app'
    }
]
```

### All Available Options

```ts
export const typescript = true | 'recommended' | 'plugin' | 'web' | { extends: 'web', include: ['index.tsx' ] }
export const tsconfig // Alias for typescript
export const biome = true | 'recommended' | 'ninja' | { extends: 'recommended', files: { ignore: ['demo'] } }
export const eslint = true | 'recommended' | [{ rules: { semi: 'error' } }]
export const prettier = true | 'recommended' | { extends: 'recommended', printWidth: 140, ignore: ['test/fixture'] }
export const vscode = true | 'biome' | 'prettier-eslint' | { settings: { ... }, extensions: { ... } } | { settings: { 'editor.defaultFormatter': 'biomejs.biome' } }
export const playwright = object | File
export const vite = object | File
export const rsbuild = object | File
export const next = object | File
export const vitest = object | File
export const cypress = object | File
export const tailwind = object | File
export const postcss = object | File
export const babel = object | File (JavaScript only)
export const metro = object | 'react-native' | File (JavaScript only)
export const reactNative = object | File
export const vercel = 'spa' | 'SPA' | 'single-page-application' | 'spa-routes' | 'github-silent' | { extends: 'spa', routes: { ... }}
export const license = 'MIT' | 'mit'
export const ignore = true | 'recommended' | 'bundle' | 'numic' | string[] | ['extends:bundle', ...]
export const gitignore = // Alias for ignore
```

For any configuration it also passible to pass an array to generate multiple files. Using the `folder` property the destination of the configuration file can be set.