import type { Template } from '../types'

export const templates: Template = {} // Has no templates, highly customizable.

export function createFile() {
  return {
    name: 'playwright.config.ts',
    contents: `import { defineConfig } from '@playwright/test'
import { playwright } from './configuration.ts'

export default defineConfig(playwright)`,
  }
}
