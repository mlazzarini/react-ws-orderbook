import WebSocketContextProvider from './websocketManager/contextProvider'
import { Container } from './components/Container'
import { FocusHandler } from './components/FocusHandler'

function App() {
  return (
    <WebSocketContextProvider>
      <FocusHandler>
        <Container />
      </FocusHandler>
    </WebSocketContextProvider>
  )
}

export default App
