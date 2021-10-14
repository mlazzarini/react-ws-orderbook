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

const StyledSpread = styled.div`
  font-variant: small-caps;
  line-height: 16px;
  margin: 8px;
`

const OrderBookWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`

export const Container: FunctionComponent = () => {
  const { spread, toggleFeed } = useContext(WebSocketContext)
  return (
    <MainWrapper>
      <h2>Order book</h2>
      <button onClick={toggleFeed}>Toggle Feed</button>
      <StyledSpread>Spread: {spread}</StyledSpread>
      <OrderBookWrapper>
        <BuySide />
        <SellSide />
      </OrderBookWrapper>
    </MainWrapper>
  )
}
