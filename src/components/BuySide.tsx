import { FunctionComponent, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'
import { fillTotals, mergeDelta, sortAsks } from '../core'

const { WebSocketContext } = contextWebSocket

const StyledTable = styled.table`
  border: 1px solid black;
  width: 400px;
`

const StyledCell = styled.td`
  width: 130px;
  border: 1px solid grey;
`

const PrizeCell = styled.td`
  width: 130px;
  border: 1px solid grey;
  color: green;
`

export const BuySide: FunctionComponent = () => {
  const { snapshot, delta } = useContext(WebSocketContext)
  const [totals, setTotals] = useState(Array(25).fill(0))

  useEffect(() => {
    if (snapshot.asks) {
      sortAsks(snapshot.asks)

      // Update totals
      const sizes = snapshot.asks.map((askLine: any) => askLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [snapshot.asks])

  useEffect(() => {
    if (delta.asks?.length > 0) {
      mergeDelta(snapshot.asks, delta, 'asks')

      // Update totals
      const sizes = snapshot.asks.map((askLine: any) => askLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [delta])

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Total</th>
          <th>Size</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {snapshot.asks ? (
          snapshot.asks.slice(0, 25).map((askLine: number[], index: number) => (
            <tr key={`ask-${index}`}>
              <StyledCell>{totals[index]}</StyledCell>
              <StyledCell>{askLine[1]}</StyledCell>
              <PrizeCell>{askLine[0]}</PrizeCell>
            </tr>
          ))
        ) : (
          <div>
            <h3>Loading...</h3>
          </div>
        )}
      </tbody>
    </StyledTable>
  )
}
