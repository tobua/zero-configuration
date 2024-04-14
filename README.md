# zero-configuration

<img align="right" src="https://github.com/tobua/zero-configuration/raw/main/logo.png" width="30%" alt="zero-configuration Logo" />

Many web development projects often contain numerous configuration files in the project's root directory, with little to no actual source code. While many plugins nowadays require configuration files, this plugin aims to generate them without the necessity of committing anything to the source code.

- No configuration files in your source code.
- Support for **gitignore**, **TypeScript**, **ESLint**, **Prettier**, **Biome**, **VS Code** and **Playwright**.
- JSON based configuration in `package.json`.
- Optional typed programmatic interface in `configuration.ts`.
- Recommended configurations to easily extend.
- Add your own shared configurations.

## Integration and Usage

Add the plugin to an existing project using `bun install zero-configuration`. In your `package.json` list the configurations you would like to have added.

```json
{
    "name": "my-web-application",
    "configuration": {
        "prettier": "recommended"
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
```