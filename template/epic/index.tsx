import { render } from 'epic-jsx'
import { plugin, state } from 'epic-state'
import { connect } from 'epic-state/connect'
import { tag } from 'epic-tag'
import { styles } from 'style'

styles() // Configure and apply global styles.
plugin(connect) // Connect state to renderer.

const Header = tag('header', 'flex center m-huge')
const Content = tag('main', 'flex col gap-medium p-large center')
const Text = tag('p', 'normal')
const Lead = tag(Text, 'fontSize-lead bold color-highlight')
const Button = tag('button', 'button bg-interact color-white p-medium r-large', {
  hover: 'bg-lightgray color-black',
  press: 'bg-highlight color-white',
})

const State = state({
  count: 1,
  get double() {
    return State.count * 2
  },
  increment: () => {
    State.count += 1
  },
})

const Counter = () => (
  <>
    <Text>Count: {State.count}</Text>
    <Button onClick={State.increment}>Increment</Button>
  </>
)

function App() {
  return (
    <>
      <Header>
        <Lead>EPIC App</Lead>
      </Header>
      <Content>
        <Counter />
      </Content>
    </>
  )
}

render(<App />)
