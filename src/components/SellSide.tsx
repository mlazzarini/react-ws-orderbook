import { FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import { snapshot } from '../mockData'
import { fillTotals } from '../core'

const StyledTable = styled.table`
  border: 1px solid black;
`

const StyledCell = styled.td`
  border: 1px solid grey;
`

const PrizeCell = styled.td`
  border: 1px solid grey;
  color: red;
`

export const SellSide: FunctionComponent = () => {
  const [totals, setTotals] = useState(Array(snapshot.numLevels).fill(0))

  useEffect(() => {
    const sizes = snapshot.bids.map((bidLine) => bidLine[1])
    const totals = fillTotals(sizes)
    setTotals(totals)
  }, [])

  return (
    <StyledTable style={{ width: 300 }}>
      <thead>
        <th>Price</th>
        <th>Size</th>
        <th>Total</th>
      </thead>
      <tbody>
        {snapshot.bids.map((askLine, index) => (
          <tr key={`bid-${index}`}>
            <PrizeCell>{askLine[0]}</PrizeCell>
            <StyledCell>{askLine[1]}</StyledCell>
            <StyledCell>{totals[index]}</StyledCell>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}
