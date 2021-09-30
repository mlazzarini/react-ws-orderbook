import WebSocketContextProvider from './websocketManager/contextProvider'
import { Container } from './components/Container'

function App() {
  return (
    <WebSocketContextProvider>
      <Container />
    </WebSocketContextProvider>
  )
}

export default App
