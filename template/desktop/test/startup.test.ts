import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import electronPath from 'electron'
import { _electron as electron } from 'playwright'

// Regular way to start and electron application, not recommended.
test('Successfully launches the app with a custom driver.', async () => {
  const appProcess = spawn(electronPath as unknown as string, ['./main.js'], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    env: process.env,
  })

  appProcess.on('message', (message: string) => {
    // biome-ignore lint/suspicious/noConsoleLog: Developer debug information.
    console.log('message:', message)
  })

  appProcess.send({ my: 'message' })

  await new Promise((done) => setTimeout(done, 4000))

  appProcess.kill()

  expect(appProcess.killed).toBe(true)
})

// Start the application using the Playwright helper.
test('Successfully launches the app with @playwright/test.', async () => {
  // See https://playwright.dev/docs/api/class-electronapplication for ElectronApplication documentation.
  const electronApplication = await electron.launch({ args: ['./main.js'] })

  const { appPath, isPackaged } = await electronApplication.evaluate(({ app }) => {
    return { appPath: app.getAppPath(), isPackaged: app.isPackaged }
  })

  expect(appPath.endsWith('/electron-esm-template'))
  expect(isPackaged).toBe(false)

  const initialScreenshotPath = 'test/screenshots/initial.png'

  const window = await electronApplication.firstWindow()
  await window.screenshot({ path: initialScreenshotPath })

  expect(existsSync(initialScreenshotPath)).toBe(true)

  expect(await window.title()).toBe('Electron ESM Template')

  // Route electron console to CLI.
  window.on('console', console.log)

  await electronApplication.close()
})
