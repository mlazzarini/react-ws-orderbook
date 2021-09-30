import { FunctionComponent, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'
import { fillTotals } from '../core'
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
  const [orderedAsks, setOrderedAsks] = useState<Asks>(Array(25).fill([0, 0]))

  useEffect(() => {
    if (snapshot.asks) {
      setOrderedAsks(
        snapshot.asks?.sort(
          (ask1: number[], ask2: number[]) => ask2[0] - ask1[0]
        )
      )
      const sizes = snapshot?.asks?.map((bidLine: any) => bidLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [snapshot])

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
