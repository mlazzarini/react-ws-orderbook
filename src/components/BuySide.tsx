import { FunctionComponent, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'
import { fillTotals, mergeAsks } from '../core'
import { Asks } from '../core/types'

const { WebSocketContext } = contextWebSocket

const StyledTable = styled.table`
  border: 1px solid black;
`

const StyledCell = styled.td`
  border: 1px solid grey;
`

const PrizeCell = styled.td`
  border: 1px solid grey;
  color: green;
`

export const BuySide: FunctionComponent = () => {
  const { snapshot, delta } = useContext(WebSocketContext)
  const [totals, setTotals] = useState(Array(25).fill(0))
  // TODO: move ordering of the snapshot to the websocket context provider
  const [orderedAsks, setOrderedAsks] = useState<Asks>(Array(25).fill([0, 0]))
  // TODO: trim the displayed orders list to 25 (but we need to keep them all in memory)

  useEffect(() => {
    if (snapshot.asks) {
      const sorted = snapshot.asks?.sort(
        (ask1: number[], ask2: number[]) => ask2[0] - ask1[0]
      )
      setOrderedAsks(sorted)

      // Update totals
      const sizes = sorted.map((askLine: any) => askLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [snapshot])

  useEffect(() => {
    console.log('Got a new delta', delta.bids)
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
    <StyledTable style={{ width: 300 }}>
      <thead>
        <th>Total</th>
        <th>Size</th>
        <th>Price</th>
      </thead>
      <tbody>
        {orderedAsks.map((askLine, index) => (
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
