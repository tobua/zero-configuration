import { expect, test } from '@playwright/test'
import { close, initialize } from './initialize'

let app: Awaited<ReturnType<typeof initialize>>

test.beforeEach(async () => {
  app = await initialize()
})

test.afterEach(async () => close(app))

const wait = () => new Promise((done) => setTimeout(done, 100))

test('Successfully launches the app with @playwright/test.', async () => {
  expect(await app.main.locator(`[aria-label="count"]`).innerText()).toBe('0')
  await app.main.locator(`[aria-label="message"]`).fill('first message')
  await app.main.locator(`[aria-label="send"]`).click()
  await wait()
  expect(await app.main.locator(`[aria-label="count"]`).innerText()).toBe('1')
  await app.main.locator(`[aria-label="message"]`).fill('second message')
  await app.main.locator(`[aria-label="send"]`).click()
  await wait()
  expect(await app.main.locator(`[aria-label="count"]`).innerText()).toBe('2')
})
