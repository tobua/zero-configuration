import { create } from 'logua'
import { z } from 'zod'
import { configurations } from './configuration'

export const log = create('zero-configuration', 'blue')

const keys = Object.fromEntries(configurations.map((current) => [current.name, z.union([z.string(), z.object({}), z.boolean()])]))

for (const configuration of configurations) {
  if (configuration.alias) {
    keys[configuration.alias] = z.union([z.string(), z.object({}), z.boolean()])
  }
}

const schema = z.object(keys).partial().strip()

export const validate = (configuration: unknown) => {
  try {
    return schema.parse(configuration)
  } catch (error) {
    log(`Invalid configuration provided: ${error}`, 'error')
  }
}
