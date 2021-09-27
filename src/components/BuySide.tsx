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
  color: green;
`

export const BuySide: FunctionComponent = () => {
  const [totals, setTotals] = useState(Array(snapshot.numLevels).fill(0))
  const orderedAsks = snapshot.asks.sort((ask1, ask2) => ask2[0] - ask1[0])

  useEffect(() => {
    const sizes = orderedAsks.map((bidLine) => bidLine[1])
    const totals = fillTotals(sizes)
    setTotals(totals)
  }, [])
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
