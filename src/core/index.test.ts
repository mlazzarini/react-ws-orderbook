import { fillTotals, removeOrder, addOrUpdateOrder } from './index'

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

describe('test addOrUpdateOrder', () => {
  it('level added at the end', () => {
    const orders = [
      [15, 5],
      [13, 1],
      [12, 1],
      [10, 2],
    ]
    addOrUpdateOrder(orders, [9, 1])
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
    addOrUpdateOrder(orders, [16, 2])
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
    addOrUpdateOrder(orders, [14, 2])
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
    addOrUpdateOrder(orders, [13, 7])
    expect(orders).toEqual([
      [15, 5],
      [13, 7],
      [12, 1],
      [10, 2],
    ])
  })
})
