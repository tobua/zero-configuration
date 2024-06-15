import 'react-native'
import { App } from '../App'
import { create } from 'react-test-renderer'

test('App renders without crashing.', () => {
  const app = create(<App />)
  expect(app).toBeDefined()
})
