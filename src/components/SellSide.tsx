import { FunctionComponent, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'
import { fillTotals, mergeDelta, sortBids } from '../core'

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

  useEffect(() => {
    if (snapshot.bids) {
      sortBids(snapshot.bids)

      // Update totals
      const sizes = snapshot.bids.map((bidLine: any) => bidLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [snapshot.bids])

  useEffect(() => {
    if (delta.bids?.length > 0) {
      mergeDelta(snapshot.bids, delta, 'bids')

      // Update totals
      const sizes = snapshot.bids.map((bidLine: any) => bidLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [delta, snapshot.bids])

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
        {snapshot.bids ? (
          snapshot.bids.slice(0, 25).map((bidLine: number[], index: number) => (
            <tr key={`bid-${index}`}>
              <PrizeCell>{bidLine[0]}</PrizeCell>
              <StyledCell>{bidLine[1]}</StyledCell>
              <StyledCell>{totals[index]}</StyledCell>
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
