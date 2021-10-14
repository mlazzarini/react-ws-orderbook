import { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { TableSkeleton } from './TableSkeleton'
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
  text-align: center;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Container: FunctionComponent = () => {
  const { spread, toggleFeed } = useContext(WebSocketContext)
  return (
    <MainWrapper>
      <h2>Order book</h2>
      <button onClick={toggleFeed}>Toggle Feed</button>
      <StyledSpread>Spread: {spread}</StyledSpread>
      <OrderBookWrapper>
        <TableSkeleton side="buy" />
        <TableSkeleton side="sell" />
      </OrderBookWrapper>
    </MainWrapper>
  )
}
