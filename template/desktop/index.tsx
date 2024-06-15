import { createRoot } from 'react-dom/client'
import { Bridge } from './component/Bridge'
import { Header } from './component/Header'
import { Stack } from './component/Stack'

if (typeof window.electron === 'undefined') {
  // @ts-ignore Polyfill to run UI in the browser.
  window.electron = {
    versions: {
      chrome: 'web',
      node: 'web',
      electron: 'web',
    },
    register: () => false,
  }
}

document.body.style.margin = '0'

const { chrome, node, electron } = window.electron.versions

createRoot(document.body).render(
  <div style={{ fontFamily: 'sans-serif', height: '100vh' }}>
    <Header />
    <main
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 20,
      }}
    >
      <div>
        We are using Node.js <span id="node-version">{node}</span>, Chromium <span id="chrome-version">{chrome}</span>, and Electron{' '}
        <span id="electron-version">{electron}</span>.
      </div>
      <h2 style={{ margin: 0 }}>Electron Bridge</h2>
      <div>Use this form to send a message to the backend process.</div>
      <Bridge />
    </main>
    <Stack />
  </div>,
)
