import 'react-native'
import { create } from 'react-test-renderer'
import { App } from '../App'

test('App renders without crashing.', () => {
  const app = create(<App />)
  expect(app).toBeDefined()
})
