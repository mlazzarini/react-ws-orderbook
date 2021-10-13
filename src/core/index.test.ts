import {
  fillTotals,
  removeOrder,
  addOrUpdateAsk,
  addOrUpdateBid,
  computePercentageValue,
} from './index'

describe('test fillTotals', () => {
  it('empty array', () => {
    const result = fillTotals([])
    expect(result).toEqual([])
  })
  it('sample array', () => {
    const sizes = [1, 2, 2, 4, 3]
    const result = fillTotals(sizes)
    expect(result).toEqual([1, 3, 5, 9, 12])
  })
})

describe('test removeOrder', () => {
  it('level is found', () => {
    const orders = [
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
    ]
    removeOrder(orders, 13)
    expect(orders).toEqual([
      [10, 2],
      [12, 1],
      [15, 5],
    ])
  })
  it('level is not found', () => {
    const orders = [
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
    ]
    removeOrder(orders, 14)
    expect(orders).toEqual([
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
    ])
  })
})

describe('test addOrUpdateAsk', () => {
  it('level added at the end', () => {
    const orders = [
      [15, 5],
      [13, 1],
      [12, 1],
      [10, 2],
    ]
    addOrUpdateAsk(orders, [9, 1])
    expect(orders).toEqual([
      [15, 5],
      [13, 1],
      [12, 1],
      [10, 2],
      [9, 1],
    ])
  })
  it('level added at the beginning', () => {
    const orders = [
      [15, 5],
      [13, 1],
      [12, 1],
      [10, 2],
    ]
    addOrUpdateAsk(orders, [16, 2])
    expect(orders).toEqual([
      [16, 2],
      [15, 5],
      [13, 1],
      [12, 1],
      [10, 2],
    ])
  })
  it('level added in the middle', () => {
    const orders = [
      [15, 5],
      [13, 1],
      [12, 1],
      [10, 2],
    ]
    addOrUpdateAsk(orders, [14, 2])
    expect(orders).toEqual([
      [15, 5],
      [14, 2],
      [13, 1],
      [12, 1],
      [10, 2],
    ])
  })
  it('level found and updated', () => {
    const orders = [
      [15, 5],
      [13, 1],
      [12, 1],
      [10, 2],
    ]
    addOrUpdateAsk(orders, [13, 7])
    expect(orders).toEqual([
      [15, 5],
      [13, 7],
      [12, 1],
      [10, 2],
    ])
  })
})

describe('test addOrUpdateBid', () => {
  it('level added at the beginning', () => {
    const orders = [
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
    ]
    addOrUpdateBid(orders, [9, 1])
    expect(orders).toEqual([
      [9, 1],
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
    ])
  })
  it('level added at the end', () => {
    const orders = [
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
    ]
    addOrUpdateBid(orders, [16, 2])
    expect(orders).toEqual([
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
      [16, 2],
    ])
  })
  it('level added in the middle', () => {
    const orders = [
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
    ]
    addOrUpdateBid(orders, [14, 2])
    expect(orders).toEqual([
      [10, 2],
      [12, 1],
      [13, 1],
      [14, 2],
      [15, 5],
    ])
  })
  it('level found and updated', () => {
    const orders = [
      [10, 2],
      [12, 1],
      [13, 1],
      [15, 5],
    ]
    addOrUpdateBid(orders, [13, 7])
    expect(orders).toEqual([
      [10, 2],
      [12, 1],
      [13, 7],
      [15, 5],
    ])
  })
})

describe('test computePercentageValue', () => {
  const someMidNumbers = Array(20).fill(600)
  const totals = [100, 500, ...someMidNumbers, 900, 910, 1000]
  it('output is 10%', () => {
    const result = computePercentageValue(totals, 0)
    expect(result).toEqual(10)
  })

  it('output is 50%', () => {
    const result = computePercentageValue(totals, 1)
    expect(result).toEqual(50)
  })

  it('output is 100%', () => {
    const result = computePercentageValue(totals, 24)
    expect(result).toEqual(100)
  })
})
