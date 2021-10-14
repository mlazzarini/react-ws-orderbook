import { FunctionComponent, useState, useEffect, useContext } from 'react'
import styled, { css } from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'
import {
  fillTotals,
  mergeDelta,
  sortBids,
  computePercentageValue,
} from '../core'

const { WebSocketContext } = contextWebSocket

interface RowProps {
  percentageValue: number
}

const StyledRow = styled.tr<RowProps>`
  ${({
    percentageValue,
    theme: {
      colors: { darkRed, background },
    },
  }) => {
    return css`
      display: flex;
      flex-direction: row;
      background: linear-gradient(
        to right,
        ${darkRed} ${percentageValue}%,
        ${background} 0%
      );
    `
  }}
`

const StyledCell = styled.td`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.text};
`

const PrizeCell = styled.td`
  ${({
    theme: {
      colors: { lightRed, text },
    },
  }) => {
    return css`
      flex: 1;
      border: 1px solid ${text};
      color: ${lightRed};
    `
  }}
`

export const SellSide: FunctionComponent = () => {
  const { snapshot, delta } = useContext(WebSocketContext)
  const [totals, setTotals] = useState(Array(25).fill(0))

  useEffect(() => {
    if (snapshot?.bids) {
      sortBids(snapshot.bids)

      // Update totals
      const sizes = snapshot.bids.map((bidLine: any) => bidLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [snapshot?.bids])

  useEffect(() => {
    if (delta.bids?.length > 0) {
      mergeDelta(snapshot.bids, delta, 'bids')

      // Update totals
      const sizes = snapshot.bids.map((bidLine: any) => bidLine[1])
      const totals = fillTotals(sizes)
      setTotals(totals)
    }
  }, [delta, snapshot?.bids])

  return (
    <>
      {snapshot?.bids ? (
        snapshot.bids.slice(0, 25).map((bidLine: number[], index: number) => {
          const percentageValue = computePercentageValue(totals, index)
          return (
            <StyledRow percentageValue={percentageValue} key={`bid-${index}`}>
              <PrizeCell>{bidLine[0]}</PrizeCell>
              <StyledCell>{bidLine[1]}</StyledCell>
              <StyledCell>{totals[index]}</StyledCell>
            </StyledRow>
          )
        })
      ) : (
        <div>
          <h3>Loading...</h3>
        </div>
      )}
    </>
  )
}
