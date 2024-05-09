import { create } from 'logua'

export const log = create('zero-configuration', 'blue')

function isObject(object: unknown) {
  return Object.prototype.toString.call(object) === '[object Object]'
}

// npm: is-plain-object
export function isPlainObject(object: object) {
  if (isObject(object) === false) {
    return false
  }

  // If has modified constructor
  const ctor = object.constructor
  if (ctor === undefined) {
    return true
  }

  const prot = ctor.prototype
  if (isObject(prot) === false) {
    return false
  }

  if (Object.hasOwn(prot, 'isPrototypeOf') === false) {
    return false
  }

  return true
}

// NOTE cyclical imports when this is placed in helpers.
// biome-ignore lint/suspicious/noExplicitAny: Best option here.
export function isSerializable(object: any) {
  let isNestedSerializable: boolean
  function isPlain(value: object) {
    return (
      typeof value === 'undefined' ||
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      typeof value === 'number' ||
      Array.isArray(value) ||
      isPlainObject(value)
    )
  }
  if (!isPlain(object)) {
    return false
  }

  for (const property in object) {
    if (Object.hasOwn(object, property)) {
      if (!isPlain(object[property])) {
        return false
      }
      if (typeof object[property] === 'object') {
        isNestedSerializable = isSerializable(object[property])
        if (!isNestedSerializable) {
          return false
        }
      }
    }
  }
  return true
}
