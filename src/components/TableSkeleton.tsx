import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { BuySide } from './BuySide'
import { SellSide } from './SellSide'

interface TableSkeletonProps {
  side: 'buy' | 'sell'
}

const StyledTable = styled.div`
  border: 1px solid white;
  min-width: 300px;
`

const StyledHeadRow = styled.div`
  display: flex;
  flex-direction: row;
  font-variant: small-caps;
  font-weight: 900;
`

const StyledHeadCell = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.text}; ;
`

export const TableSkeleton: FunctionComponent<TableSkeletonProps> = ({
  side,
}) => {
  return (
    <StyledTable>
      <StyledHeadRow>
        {side === 'buy' ? (
          <>
            <StyledHeadCell>Total</StyledHeadCell>
            <StyledHeadCell>Size</StyledHeadCell>
            <StyledHeadCell>Price</StyledHeadCell>
          </>
        ) : (
          <>
            <StyledHeadCell>Price</StyledHeadCell>
            <StyledHeadCell>Size</StyledHeadCell>
            <StyledHeadCell>Total</StyledHeadCell>
          </>
        )}
      </StyledHeadRow>
      <div>{side === 'buy' ? <BuySide /> : <SellSide />}</div>
    </StyledTable>
  )
}
