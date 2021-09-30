import { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { BuySide } from './BuySide'
import { SellSide } from './SellSide'
import contextWebSocket from '../websocketManager/createContext'

const { WebSocketContext } = contextWebSocket

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const Container: FunctionComponent = () => {
  const { connect, close } = useContext(WebSocketContext)
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connect}>Connect</button>
        <button onClick={close}>Close</button>
        <h2>Order book:</h2>
        <Wrapper>
          <BuySide />
          <SellSide />
        </Wrapper>
      </header>
    </div>
  )
}
