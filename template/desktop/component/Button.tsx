import type { JSX } from 'react'

const buttonStyles = {
  background: '#FF9E00',
  color: 'white',
  padding: 10,
  borderRadius: 5,
  border: 'none',
  cursor: 'pointer',
}

export function Button(props: JSX.IntrinsicElements['button']) {
  return <button type="button" style={buttonStyles} {...props} />
}
