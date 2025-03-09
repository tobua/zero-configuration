import { configure } from 'epic-inline'
import { scale } from 'optica'

configure({
  colors: {
    highlight: '#3600E6',
    interact: '#F37E21',
  },
  size: (value: number) => scale(value),
})

export function styles() {
  document.body.style.margin = '0'
  document.body.style.fontFamily = 'sans-serif'

  document.documentElement.style.minHeight = '100vh'
  document.body.style.minHeight = '100vh' // Fallback if unsupported.
  if (window.CSS.supports('max-height', '100dvh')) {
    document.body.style.minHeight = '100dvh'
  }
}
