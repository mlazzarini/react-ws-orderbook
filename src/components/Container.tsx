import { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { BuySide } from './BuySide'
import { SellSide } from './SellSide'
import contextWebSocket from '../websocketManager/createContext'

const { WebSocketContext } = contextWebSocket

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OrderBookWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`

export const Container: FunctionComponent = () => {
  const { connect, close, spread } = useContext(WebSocketContext)
  return (
    <MainWrapper>
      <button onClick={connect}>Connect</button>
      <button onClick={close}>Close</button>
      <h2>Order book:</h2>
      <span>Spread: {spread}</span>
      <OrderBookWrapper>
        <BuySide />
        <SellSide />
      </OrderBookWrapper>
    </MainWrapper>
  )
}
