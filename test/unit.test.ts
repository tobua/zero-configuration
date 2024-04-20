import { expect, test } from 'bun:test'
import { validate } from '../helper'

test('Configuration is validated properly.', () => {
  const configuration = {
    biome: 'recommended',
    prettier: true,
    typescript: 'test/tsconfig.json',
    tsconfig: 'my-module/tsconfig.json',
    removed: 'not-available',
  }

  const validated = validate(configuration)

  expect(validated).toBeDefined()
  expect(typeof validated).toBe('object')
  // Strips missing entries.
  expect(validated && Object.hasOwn(validated, 'removed')).toBe(false)
  // Keeps aliases.
  expect(typeof validated?.tsconfig).toBe('string')
})
