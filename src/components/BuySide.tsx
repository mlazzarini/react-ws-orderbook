import { FunctionComponent, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'
import { fillTotals, mergeAsks, sortAsks } from '../core'
import { Asks } from '../core/types'

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
  // TODO: move ordering of the snapshot to the websocket context provider
  const [orderedAsks, setOrderedAsks] = useState<Asks>(Array(25).fill([0, 0]))

  useEffect(() => {
    if (snapshot.asks) {
      const sorted = sortAsks(snapshot.asks)
      setOrderedAsks(sorted)

      // Update totals
      const sizes = sorted.map((askLine: any) => askLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [snapshot])

  useEffect(() => {
    if (delta.asks?.length > 0) {
      const updatedAsks = mergeAsks(orderedAsks, delta)
      setOrderedAsks(updatedAsks)

      // Update totals
      const sizes = updatedAsks.map((askLine: any) => askLine[1])
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
        {orderedAsks.slice(0, 25).map((askLine, index) => (
          <tr key={`ask-${index}`}>
            <StyledCell>{totals[index]}</StyledCell>
            <StyledCell>{askLine[1]}</StyledCell>
            <PrizeCell>{askLine[0]}</PrizeCell>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}
