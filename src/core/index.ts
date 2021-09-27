const fillTotals = (sizes: number[]) => {
  if (sizes.length === 0) return []
  const totals: number[] = [sizes[0]]
  sizes.reduce((acc, currentSize) => {
    const nextSize = acc + currentSize
    totals.push(nextSize)
    return nextSize
  })
  return totals
}

export { fillTotals }
