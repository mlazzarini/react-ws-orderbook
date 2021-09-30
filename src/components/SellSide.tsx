import { FunctionComponent, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'
import { fillTotals, mergeAsks } from '../core'
import { Bids } from '../core/types'

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
  color: red;
`

export const SellSide: FunctionComponent = () => {
  const { snapshot, delta } = useContext(WebSocketContext)
  const [totals, setTotals] = useState(Array(25).fill(0))
  const [bids, setBids] = useState<Bids>(Array(25).fill([0, 0]))

  useEffect(() => {
    if (snapshot.bids) {
      setBids(snapshot.bids)

      // Update totals
      const sizes = snapshot.bids.map((bidLine: any) => bidLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [snapshot])

  useEffect(() => {
    if (delta.bids?.length > 0) {
      const updatedBids = mergeAsks(bids, delta)
      setBids(updatedBids)

      // Update totals
      const sizes = updatedBids.map((bidLine: any) => bidLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [delta])

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Price</th>
          <th>Size</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {bids.slice(0, 25).map((bidLine, index) => (
          <tr key={`bid-${index}`}>
            <PrizeCell>{bidLine[0]}</PrizeCell>
            <StyledCell>{bidLine[1]}</StyledCell>
            <StyledCell>{totals[index]}</StyledCell>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}
