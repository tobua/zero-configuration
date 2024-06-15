import { useCallback, useEffect, useState } from 'react'
import { Button } from './Button'

// Implemented in bridge.cjs
declare global {
  interface Window {
    electron: {
      message: (text: string) => void
      // biome-ignore lint/complexity/noBannedTypes: Generic function declaration.
      register: (type: string, listener: Function) => void
      isWindows: boolean
      versions: { chrome: string; node: string; electron: string }
    }
  }
}

const inputStyles = {
  borderWidth: 2,
  borderColor: '#FF9E00',
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
}

export function Bridge() {
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)
  const sendMessage = useCallback(() => {
    window.electron.message(message)
    setMessage('')
  }, [message])
  useEffect(() => {
    window.electron.register('count', (value: number) => {
      setCount(value)
    })
  }, [])

  return (
    <form style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <input
        aria-label="message"
        style={inputStyles}
        placeholder="Enter message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button aria-label="send" onClick={sendMessage}>
        Send Message
      </Button>
      <div>
        Count: <span aria-label="count">{count}</span>
      </div>
    </form>
  )
}
