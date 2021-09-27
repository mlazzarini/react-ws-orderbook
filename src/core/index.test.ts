import { fillTotals } from './index'

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
