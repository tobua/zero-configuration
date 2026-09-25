import { state } from '../state'
import type { Template } from '../types'

const getNameFromPackageJson = () => {
  if (typeof state.packageJson.author === 'string') {
    return state.packageJson.author
  }

  if (typeof state.packageJson.author === 'object' && typeof state.packageJson.author.name === 'string') {
    return state.packageJson.author.name
  }

  return state.packageJson.name
}

const bunProject = () => `# ${getNameFromPackageJson()}

This project is using the bun JavaScript runtime.

## Project Instructions

- Use \`bun\` for scripts and dependency commands.
  - Prefer \`bun run types\`, \`bun run check\`, \`bun install\`.
  -
  - Do not use \`npm\` unless explicitly asked. Bun is a full replacement for npm and node.

- Configuration is managed through \`zero-configuration\` and the configuration files are gitignored and generated dynamically from \`/configuration.ts\`, where changes should be made.
  - To regenerate static configuration files after changes run \`bun zero-configuration\`.
  - Specifically do not edit \`tsconfig.json\` but make changes to the \`configuration.typescript\` property in \`package.json\`.`

export const templates: Template<string> = {
  recommended: bunProject,
  bun: bunProject,
}

export function createFile(content: string) {
  return { name: 'AGENTS.md', contents: content }
}
