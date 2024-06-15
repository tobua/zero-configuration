// Packaged app will not be able to import this as ESM.
const { ipcRenderer, contextBridge } = require('electron')

const listeners = {}

const electron = {
  message: (text) => {
    // Send a message to the Electron backend runtime.
    ipcRenderer.send('message', text)
  },
  register: (type, listener) => {
    // Register a listener from the UI thread.
    listeners[type] = listener
  },
  isWindows: process.platform === 'win32',
  versions: {
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron,
  },
}

ipcRenderer.on('count', (_, value) => {
  if (listeners.count) {
    listeners.count(value)
  }
})

// Expose this 'electron' object in the UI on the window object.
contextBridge.exposeInMainWorld('electron', electron)
