import { join } from 'node:path'
import { BrowserWindow, app } from 'electron'
import { ipcMain } from 'electron'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(app.getAppPath(), 'bridge.cjs'),
    },
  })

  mainWindow.loadFile('dist/index.html')

  // mainWindow.openDevTools()

  const messages = []

  ipcMain.on('message', (_, message) => {
    // biome-ignore lint/suspicious/noConsoleLog: Useful for development, as it shows up in the initial console.
    console.log(`main.js: received message ${message}.`)
    messages.push(message)
    mainWindow.webContents.send('count', messages.length)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
