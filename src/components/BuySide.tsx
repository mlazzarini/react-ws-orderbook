import { FunctionComponent, useState, useEffect, useContext } from 'react'
import styled, { css } from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'
import {
  fillTotals,
  mergeDelta,
  sortAsks,
  computePercentageValue,
} from '../core'

const { WebSocketContext } = contextWebSocket

interface RowProps {
  percentageValue: number
}

const StyledTable = styled.table`
  border: 1px solid white;
  width: 400px;
`

const StyledRow = styled.tr<RowProps>`
  ${({
    percentageValue,
    theme: {
      colors: { darkGreen },
    },
  }) => {
    return css`
      background: linear-gradient(
        to left,
        ${darkGreen} ${percentageValue}%,
        black 0%
      );
    `
  }}
`

const StyledCell = styled.td`
  width: 130px;
  border: 1px solid white;
`

const PrizeCell = styled.td`
  ${({
    theme: {
      colors: { lightGreen },
    },
  }) => {
    return css`
      width: 130px;
      border: 1px solid white;
      color: ${lightGreen};
    `
  }}
`

export const BuySide: FunctionComponent = () => {
  const { snapshot, delta } = useContext(WebSocketContext)
  const [totals, setTotals] = useState(Array(25).fill(0))

  useEffect(() => {
    if (snapshot?.asks) {
      sortAsks(snapshot.asks)

      // Update totals
      const sizes = snapshot.asks.map((askLine: any) => askLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [snapshot?.asks])

  useEffect(() => {
    if (delta.asks?.length > 0) {
      mergeDelta(snapshot.asks, delta, 'asks')

      // Update totals
      const sizes = snapshot.asks.map((askLine: any) => askLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [delta, snapshot?.asks])

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
        {snapshot?.asks ? (
          snapshot.asks.slice(0, 25).map((askLine: number[], index: number) => {
            const percentageValue = computePercentageValue(totals, index)
            return (
              <StyledRow percentageValue={percentageValue} key={`ask-${index}`}>
                <StyledCell>{totals[index]}</StyledCell>
                <StyledCell>{askLine[1]}</StyledCell>
                <PrizeCell>{askLine[0]}</PrizeCell>
              </StyledRow>
            )
          })
        ) : (
          <div>
            <h3>Loading...</h3>
          </div>
        )}
      </tbody>
    </StyledTable>
  )
}
