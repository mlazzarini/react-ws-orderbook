import styled from 'styled-components'
import { connect, close } from './websocketManager'
import './App.css'
import { BuySide } from './components/BuySide'
import { SellSide } from './components/SellSide'

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connect}>Connect</button>
        <button onClick={close}>Close</button>
        <h2>Order book:</h2>
        <Container>
          <BuySide />
          <SellSide />
        </Container>
      </header>
    </div>
  )
}

export default App
